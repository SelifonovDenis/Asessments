package mappers

import (
	"Asessments/app/models/entity"
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
)


func Get(db *sql.DB, user entity.User) (entity.User, error){
	rows, err := db.Query("select * from asessments.Logins WHERE login = $1 AND password = $2", user.Login, user.Password)
	if err != nil {
		return user,err
	}
	defer rows.Close()
	u:=entity.User{}
	for rows.Next(){
		err := rows.Scan(&u.Id, &u.Login, &u.Password, &u.Role, &u.Id_employ)
		if err != nil{
			fmt.Println(err)
			continue
		}
	}
	return u,err
}