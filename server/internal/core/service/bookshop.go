package service

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/alisavch/bookshop/internal/core/domain"
	"github.com/alisavch/bookshop/internal/core/port"
	"github.com/alisavch/bookshop/internal/repository"
)

const (
	OpenLibraryURL = "https://openlibrary.org"
	MaturityFilter = "NOT_MATURE"
	ISBN10         = "ISBN_10"
	ISBN13         = "ISBN_13"
)

type BookshopService struct {
	bookshopRepo port.BookshelfRepository
}

var _ port.BookshelfRepository = (*repository.BookshelfGoogleBooksRepository)(nil)

func NewBookshopService(bookshelfRepo port.BookshelfRepository) *BookshopService {
	return &BookshopService{
		bookshopRepo: bookshelfRepo,
	}
}

func (s *BookshopService) GetBooks() ([]domain.DisplayedBook, error) {
	books, err := s.bookshopRepo.GetBooks()
	if err != nil {
		return nil, fmt.Errorf("failed to get books from the external API: %v", err)
	}

	var displayedBooks []domain.DisplayedBook

	for _, v := range books {
		if v.VolumeInfo.MaturityRating == MaturityFilter {
			book := domain.DisplayedBook{
				ID:          v.ID,
				Title:       v.VolumeInfo.Title,
				Image:       v.VolumeInfo.ImageLinks.SmallThumbnail,
				Description: v.VolumeInfo.Description,
				PageCount:   v.VolumeInfo.PageCount,
				SaleInfo:    v.SaleInfo,
			}

			revision, err := getRevisionNumber(v.VolumeInfo.IndustryIdentifiers)
			if err != nil {
				return nil, fmt.Errorf("error getting revision number: %v", err)
			}

			if revision != 0 {
				*book.Revision = revision
			}

			displayedBooks = append(displayedBooks, book)
		}
	}

	return displayedBooks, nil
}

type OpenLibraryBookInfo struct {
	Revision int `json:"revision"`
}

func getRevisionNumber(ids []domain.IndustryIdentifiers) (int, error) {
	var bookInfo OpenLibraryBookInfo
	var isbn string

	for _, v := range ids {
		if v.Type == ISBN10 || v.Type == ISBN13 {
			isbn = v.Identifier
		}
	}

	resp, err := http.Get(fmt.Sprintf("%s/isbn/%s.json", OpenLibraryURL, isbn))
	if err != nil {
		return 0, fmt.Errorf("error fetching book info: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusNotFound {
		return 0, nil
	}

	if err := json.NewDecoder(resp.Body).Decode(&bookInfo); err != nil {
		return 0, fmt.Errorf("error decoding book info: %v", err)
	}

	if bookInfo.Revision <= 1 {
		return 0, nil
	}

	return bookInfo.Revision, nil
}
