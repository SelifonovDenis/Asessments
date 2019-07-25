package controllers

import (
	"Asessments/app/models/entity"
	"Asessments/app/models/providers"
	"fmt"
	"github.com/revel/revel"
)

type CAssessment struct {
	*revel.Controller
}

//GetPage открытие страницы "Собеседования"
func (c *CAssessment) GetAssessments() revel.Result {
	assessments, err:=providers.GetAssessments()

	if err!=nil {
		fmt.Println(err)
		c.Response.Status = 500
		return c.RenderJSON(err)
	}

	return c.RenderJSON(assessments)
}

func (c *CAssessment) GetAssessment(id int64)revel.Result  {

	assessment := new(entity.Asessment)
	assessment.Id = int(id)
	assessment, err := providers.GetAssessment(assessment)
	if err != nil {
		fmt.Println(err)
		c.Response.Status = 500
		return c.RenderJSON(err)
	}
	return c.RenderJSON(assessment)
}

func (c *CAssessment) AddAssessment()revel.Result  {
	assessment := new(entity.Asessment)
	err := c.Params.BindJSON(&assessment)
	if err != nil {
		c.Response.Status = 500
		return c.RenderJSON(err)
	}

	assessment, err = providers.AddAssessment(assessment)
	if err != nil {
		fmt.Println(err)
		c.Response.Status = 500
		return c.RenderJSON(err)
	}

	return c.RenderJSON(assessment)
}

func (c *CAssessment) UpdateAssessment()revel.Result  {

	assessment := new(entity.Asessment)
	err := c.Params.BindJSON(&assessment)
	if err != nil {
		c.Response.Status = 500
		return c.RenderJSON(err)
	}

	assessment, err = providers.UpdateAssessment(assessment)
	if err != nil {
		c.Response.Status = 500
		return c.RenderJSON(err)
	}

	return c.RenderJSON(assessment)
}
