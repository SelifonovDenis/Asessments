package connection

import (
	"database/sql"
)

func ConnectToDB()(*sql.DB, error)  {
	connStr := "user=admin password=zxcvqwer dbname=asessments sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return db, err
	}

	return db, err
}