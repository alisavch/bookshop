package repository

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/alisavch/bookshop/internal/core/domain"
)

const GoogleBooksAPI = "https://www.googleapis.com/books/v1/volumes?q=nosql"

type BookshelfGoogleBooksRepository struct {
	baseURL string
}

func NewBookshelfGoogleBooksRepository() *BookshelfGoogleBooksRepository {
	return &BookshelfGoogleBooksRepository{baseURL: GoogleBooksAPI}
}

func (r *BookshelfGoogleBooksRepository) GetBooks() ([]domain.Book, error) {
	response, err := http.Get(r.baseURL)
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
