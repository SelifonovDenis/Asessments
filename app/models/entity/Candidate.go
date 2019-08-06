package entity

type Candidate struct {
	Id           int
	First_name   string
	Last_name    string
	Middle_name  string
	Phone        string
	Email        string
	Status       string
	Archive		 int
	Asessment    Assessment
	Id_c_a		 int
}
