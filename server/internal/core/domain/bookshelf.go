package domain

type DisplayedBook struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Image       string   `json:"image"`
	Description string   `json:"description"`
	PageCount   int      `json:"pageCount"`
	SaleInfo    SaleInfo `json:"saleInfo"`
	PreviewLink string   `json:"previewLink"`
	Revision    *int     `json:"revision"`
}

type Bookshelf struct {
	Kind       string `json:"kind"`
	TotalItems int    `json:"totalItems"`
	Books      []Book `json:"items"`
}

type Book struct {
	Kind       string     `json:"kind"`
	ID         string     `json:"id"`
	Etag       string     `json:"etag"`
	SelfLink   string     `json:"selfLink"`
	VolumeInfo VolumeInfo `json:"volumeInfo,omitempty"`
	SaleInfo   SaleInfo   `json:"saleInfo,omitempty"`
	AccessInfo AccessInfo `json:"accessInfo"`
	SearchInfo struct {
		TextSnippet string `json:"textSnippet"`
	} `json:"searchInfo"`
}

type IndustryIdentifiers struct {
	Type       string `json:"type"`
	Identifier string `json:"identifier"`
}

type VolumeInfo struct {
	Title               string                `json:"title"`
	Subtitle            string                `json:"subtitle"`
	Authors             []string              `json:"authors"`
	Publisher           string                `json:"publisher"`
	PublishedDate       string                `json:"publishedDate"`
	Description         string                `json:"description"`
	IndustryIdentifiers []IndustryIdentifiers `json:"industryIdentifiers"`
	ReadingModes        struct {
		Text  bool `json:"text"`
		Image bool `json:"image"`
	} `json:"readingModes"`
	PageCount           int      `json:"pageCount"`
	PrintType           string   `json:"printType"`
	Categories          []string `json:"categories"`
	MaturityRating      string   `json:"maturityRating"`
	AllowAnonLogging    bool     `json:"allowAnonLogging"`
	ContentVersion      string   `json:"contentVersion"`
	PanelizationSummary struct {
		ContainsEpubBubbles  bool `json:"containsEpubBubbles"`
		ContainsImageBubbles bool `json:"containsImageBubbles"`
	} `json:"panelizationSummary"`
	ImageLinks struct {
		SmallThumbnail string `json:"smallThumbnail"`
		Thumbnail      string `json:"thumbnail"`
	} `json:"imageLinks"`
	Language            string `json:"language"`
	PreviewLink         string `json:"previewLink"`
	InfoLink            string `json:"infoLink"`
	CanonicalVolumeLink string `json:"canonicalVolumeLink"`
}

type SaleInfo struct {
	Country     string `json:"country"`
	Saleability string `json:"saleability"`
	IsEbook     bool   `json:"isEbook"`
	ListPrice   struct {
		Amount       float64 `json:"amount"`
		CurrencyCode string  `json:"currencyCode"`
	} `json:"listPrice"`
	RetailPrice struct {
		Amount       float64 `json:"amount"`
		CurrencyCode string  `json:"currencyCode"`
	} `json:"retailPrice"`
	BuyLink string `json:"buyLink"`
	Offers  []struct {
		FinskyOfferType int `json:"finskyOfferType"`
		ListPrice       struct {
			AmountInMicros int    `json:"amountInMicros"`
			CurrencyCode   string `json:"currencyCode"`
		} `json:"listPrice"`
		RetailPrice struct {
			AmountInMicros int    `json:"amountInMicros"`
			CurrencyCode   string `json:"currencyCode"`
		} `json:"retailPrice"`
	} `json:"offers"`
}

type AccessInfo struct {
	Country                string `json:"country"`
	Viewability            string `json:"viewability"`
	Embeddable             bool   `json:"embeddable"`
	PublicDomain           bool   `json:"publicDomain"`
	TextToSpeechPermission string `json:"textToSpeechPermission"`
	Epub                   struct {
		IsAvailable  bool   `json:"isAvailable"`
		AcsTokenLink string `json:"acsTokenLink"`
	} `json:"epub"`
	Pdf struct {
		IsAvailable  bool   `json:"isAvailable"`
		AcsTokenLink string `json:"acsTokenLink"`
	} `json:"pdf"`
	WebReaderLink       string `json:"webReaderLink"`
	AccessViewStatus    string `json:"accessViewStatus"`
	QuoteSharingAllowed bool   `json:"quoteSharingAllowed"`
}
