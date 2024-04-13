package domain

type DisplayedBook struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Image       string   `json:"image"`
	Description string   `json:"description"`
	PageCount   int      `json:"pageCount"`
	SaleInfo    SaleInfo `json:"saleInfo"`
	Revision    *int     `json:"revision"`
}

type Bookshelf struct {
	Books []Book `json:"items"`
}

type Book struct {
	ID         string     `json:"id"`
	VolumeInfo VolumeInfo `json:"volumeInfo,omitempty"`
	SaleInfo   SaleInfo   `json:"saleInfo,omitempty"`
}

type IndustryIdentifiers struct {
	Type       string `json:"type"`
	Identifier string `json:"identifier"`
}

type VolumeInfo struct {
	Title          string `json:"title"`
	Description    string `json:"description"`
	PageCount      int    `json:"pageCount"`
	MaturityRating string `json:"maturityRating"`
	ImageLinks     struct {
		SmallThumbnail string `json:"smallThumbnail"`
	} `json:"imageLinks"`
	IndustryIdentifiers []IndustryIdentifiers `json:"industryIdentifiers"`
}

type SaleInfo struct {
	ListPrice struct {
		Amount       float64 `json:"amount"`
		CurrencyCode string  `json:"currencyCode"`
	} `json:"listPrice"`
}
