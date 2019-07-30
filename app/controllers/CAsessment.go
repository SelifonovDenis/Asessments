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
		fmt.Println()
		fmt.Println(err)
		fmt.Println()
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

func (c *CAssessment) GetEmployeeAssessments(id int64)revel.Result  {

	assessments, err := providers.GetEmployeeAssessments(int(id))
	if err != nil {
		fmt.Println(err)
		c.Response.Status = 500
		return c.RenderJSON(err)
	}
	return c.RenderJSON(assessments)
}

func (c *CAssessment) RemoveEmployeeAssessment(idEmployee, idAssessment int64)revel.Result  {

	assessment := new(entity.Asessment)
	assessment.Id = int(idAssessment)
	employee := new(entity.Employee)
	employee.Id = int(idEmployee)

	err := providers.RemoveEmployeeAssessment(assessment, employee)

	if err != nil {
		fmt.Println(err)
		c.Response.Status = 500
		return c.RenderJSON(err)
	}
	return c.RenderJSON(employee)
}

func (c *CAssessment) AddEmployeeAssessment(idEmployee, idAssessment int64)revel.Result  {

	assessment := new(entity.Asessment)
	assessment.Id = int(idAssessment)
	employee := new(entity.Employee)
	employee.Id = int(idEmployee)

	err := providers.AddEmployeeAssessment(assessment, employee)

	if err != nil {
		fmt.Println(err)
		c.Response.Status = 500
		return c.RenderJSON(err)
	}
	return c.RenderJSON(employee)
}
