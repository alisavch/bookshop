package repository

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/alisavch/bookshop/internal/core/domain"
)

type BookshelfRepository struct {
	baseURL string
}

func NewBookshelfRepository(baseURL string) *BookshelfRepository {
	return &BookshelfRepository{baseURL: baseURL}
}

func (r *BookshelfRepository) GetBooks() ([]domain.Book, error) {
	url := fmt.Sprintf("%s?q=nosql", r.baseURL)

	response, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("unable to make HTTP request: %v", err)
	}
	defer response.Body.Close()

	var bookshelf *domain.Bookshelf
	err = json.NewDecoder(response.Body).Decode(&bookshelf)
	if err != nil {
		return nil, fmt.Errorf("error decoding response body: %v", err)
	}

	return bookshelf.Books, nil
}

func (r *BookshelfRepository) GetBooksByFilter(param domain.FilterParams) ([]domain.Book, error) {
	return nil, nil
}
