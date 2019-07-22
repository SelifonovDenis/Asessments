package providers

import (
	"Asessments/app/models/entity"
	"Asessments/app/models/mappers"
	"database/sql"
	_ "github.com/lib/pq"
)

//Login - создание подключения к безе данных для проверки логина и пароля
func Login(user entity.User) (u entity.User, err error) {

	connStr := "user=admin password=zxcvqwer dbname=asessments sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return
	}
	defer db.Close()

	u, err = mappers.Get(db, user)
	if err != nil {
		return
	}
	return
}
