package mappers

import (
	"Asessments/app/models/entity"
	"database/sql"
	_ "github.com/lib/pq"
)

//Get Проверка логина и пароля по БД
func Get(db *sql.DB, user entity.User) (u entity.User, err error) {
	u = entity.User{}
	rows, err := db.Query(`
		SELECT * FROM asessment.login
		WHERE 
		      login = $1 
		  AND 
		      password = $2
	`, user.Login, user.Password)

	if err != nil {
		return
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&u.Id, &u.Login, &u.Password, &u.Role, &u.Id_employee)
		if err != nil {
			return
		}

	}
	return
}
