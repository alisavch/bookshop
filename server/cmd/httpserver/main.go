package main

import (
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"

	"github.com/alisavch/bookshop/internal/core/service"
	"github.com/alisavch/bookshop/internal/handler"
	"github.com/alisavch/bookshop/internal/repository"
)

func main() {
	if err := godotenv.Load(); err != nil {
		logrus.Fatalf("Error loading .env file: %v", err)
	}

	booksAPIURL := os.Getenv("GOOGLE_BOOKS_API_URL")

	bookshelfRepo := repository.NewBookshelfRepository(booksAPIURL)
	bookshopService := service.NewBookshopService(bookshelfRepo)

	handler := handler.NewHandler(bookshopService)

	router := mux.NewRouter()

	router.HandleFunc("/books", handler.GetBooksHandler).Methods("GET")

	logrus.Info("Server listening on port 8080...")
	http.ListenAndServe(":8080", router)
}
