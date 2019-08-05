package controllers

import (
	"Asessments/app/models/entity"
	"Asessments/app/models/providers"
	"github.com/revel/revel"
)

type Login struct {
	*revel.Controller
}

//Auth Проверка логина и пароля
func (c *Login) Auth() revel.Result {
	user := entity.User{}
	err := c.Params.BindJSON(&user)
	if err != nil {
		return c.RenderError(err)
	}

	user, err = providers.Login(user)
	if err != nil {
		return c.RenderError(err)
	}

	if user.Id != 0 {
		c.Session["userId"] = user.Id
	}

	return c.RenderJSON(user)
}


func (c *Login) Logout() revel.Result {
	for k := range c.Session {
		delete(c.Session, k)
	}
	return c.Redirect("/")
}

