package controllers

import (
	"github.com/revel/revel"
)

type App struct {
	*revel.Controller
}

func (c *App) Index() revel.Result {


	return c.RenderTemplate("App/index.html")

}

func (c *App) Login() revel.Result {
	return c.RenderTemplate("App/login.html")
}

func (c *App) Worker() revel.Result {
	return c.RenderTemplate("App/workers.html")
}
func (c *App) Assessment() revel.Result {
	return c.RenderTemplate("App/assessment.html")
}


