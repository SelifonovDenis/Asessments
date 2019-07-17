package types

type user struct {
	id        int
	login     string
	password  string
	role      string
	id_employ int
}

func Get(id int, login, password, role string, id_employ int) user {
	User := user{id, login, password, role, id_employ}
	return User
}
