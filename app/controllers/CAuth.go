package controllers

import (
	"Asessments/app/models/entity"
	"fmt"
	"github.com/revel/revel"
	"Asessments/app/models/providers"
)



func (c App) Login() revel.Result {
	return c.Render()
}

func (c App) Auth() revel.Result{

	login := "admin"
	password:= "admin"
	user, err := providers.Login(entity.User{0,login,password,"",0})
	if err != nil {
		fmt.Println("код ошибки 500")
		fmt.Println(err)
	}
	fmt.Println("код 200")
	fmt.Println(user)
	return c.Render()
}