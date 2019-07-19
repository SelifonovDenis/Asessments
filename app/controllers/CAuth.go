package controllers

import (
	"Asessments/app/models/entity"
	"Asessments/app/models/providers"
	"github.com/revel/revel"
)

func (c App) Login() revel.Result {
	return c.Render()
}

func (c App) Auth() revel.Result {
	user := entity.User{}
	err := c.Params.BindJSON(&user) //уточнить
	if err != nil {
		c.Response.Status = 500
		return c.RenderJSON(err)
	}

	user, err = providers.Login(user)
	if err != nil {
		c.Response.Status = 500
		return c.RenderJSON(err)
	}

	return c.RenderJSON(user)
}
