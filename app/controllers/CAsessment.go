package controllers

import "github.com/revel/revel"

type Asessment struct {
	*revel.Controller
}

//GetPage открытие страницы "Собеседования"
func (c Asessment) GetPage() revel.Result {
	return c.RenderTemplate("App/asessments.html")
}