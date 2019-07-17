package providers

import (
	"Asessments/app/models/entity"
	"Asessments/app/models/mappers"
	"database/sql"
	_ "github.com/lib/pq"
)

func Login(user entity.User) (entity.User,error) {

	connStr := "user=admin password=zxcvqwer dbname=asessments sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	user, err = mappers.Get(db, user)
	if err != nil {
		return user,err
	}
	return user,nil
}