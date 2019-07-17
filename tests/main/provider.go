package main

import (
	"Asessments/tests/types"
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
)

func main() {

	connStr := "user=admin password=zxcvqwer dbname=asessments sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	profile:=types.Get(1,"loh","lohan","admin",2)
	fmt.Println(profile)

}
