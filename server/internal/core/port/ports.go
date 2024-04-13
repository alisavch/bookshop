package port

import (
	"github.com/alisavch/bookshop/internal/core/domain"
)

type BookshelfRepository interface {
	GetBooks() ([]domain.Book, error)
	GetBooksByFilter(param domain.FilterParams) ([]domain.Book, error)
}
