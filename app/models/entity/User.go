package entity

type User struct {
	Id        int
	Login     string `json:"login"`
	Password  string `json:"password"`
	Role      string
	Id_employee int
}

