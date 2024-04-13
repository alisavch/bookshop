package main

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"

	"github.com/alisavch/bookshop/internal/core/service"
	"github.com/alisavch/bookshop/internal/handler"
	"github.com/alisavch/bookshop/internal/repository"
)

func main() {
	bookshelfRepo := repository.NewBookshelfGoogleBooksRepository()
	bookshopService := service.NewBookshopService(bookshelfRepo)

	handler := handler.NewHandler(bookshopService)

	router := mux.NewRouter()

	router.HandleFunc("/books", handler.GetBooksHandler).Methods("GET")

	logrus.Info("Server listening on port 8080...")
	http.ListenAndServe(":8080", router)
}
