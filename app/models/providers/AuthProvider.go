package providers

import (
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

	result, err := db.Exec("SELECT * FROM asessment")
	if err != nil{
		panic(err)
	}

	fmt.Println(result.LastInsertId())  // не поддерживается
	fmt.Println(result.RowsAffected())  // количество добавленных строк
}