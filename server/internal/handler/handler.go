package handler

import (
	"encoding/json"
	"net/http"

	"github.com/sirupsen/logrus"

	"github.com/alisavch/bookshop/internal/core/service"
)

type Handler struct {
	bookshopService *service.BookshopService
}

func NewHandler(bookshopService *service.BookshopService) *Handler {
	return &Handler{
		bookshopService: bookshopService,
	}
}

func (h *Handler) GetBooksHandler(w http.ResponseWriter, r *http.Request) {
	books, err := h.bookshopService.GetBooks()
	if err != nil {
		logrus.Errorf("Error getting books: %v", err)
	}

	jsonData, err := json.Marshal(books)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logrus.Errorf("Error encoding books: %v", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	_, err = w.Write(jsonData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logrus.Errorf("Error writing encoded data: %v", err)
		return
	}
}
