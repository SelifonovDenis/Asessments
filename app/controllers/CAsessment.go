package controllers

import "github.com/revel/revel"

type Asessment struct {
	*revel.Controller
}

func (c Asessment) GetPage() revel.Result {
	return c.RenderTemplate("App/asessments.html")
}