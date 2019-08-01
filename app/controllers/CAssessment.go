package controllers

import (
	"Asessments/app/models/entity"
	"Asessments/app/models/providers"
	"github.com/revel/revel"
)

type CAssessment struct {
	*revel.Controller
}

//GetPage открытие страницы "Собеседования"
func (c *CAssessment) GetAssessments() revel.Result {
	assessments, err := providers.GetAssessments()

	if err != nil {
		return c.RenderError(err)
	}

	return c.RenderJSON(assessments)
}

func (c *CAssessment) GetAssessment(id int64) revel.Result {
	assessment, err := providers.GetAssessment(&entity.Assessment{
		Id: int(id),
	})
	if err != nil {
		return c.RenderError(err)
	}
	return c.RenderJSON(assessment)
}

func (c *CAssessment) AddAssessment() revel.Result {
	assessment := new(entity.Assessment)
	err := c.Params.BindJSON(&assessment)
	if err != nil {
		return c.RenderError(err)
	}

	assessment, err = providers.AddAssessment(assessment)
	if err != nil {
		return c.RenderError(err)
	}

	return c.RenderJSON(assessment)
}

func (c *CAssessment) UpdateAssessment() revel.Result {

	assessment := new(entity.Assessment)
	err := c.Params.BindJSON(&assessment)
	if err != nil {
		return c.RenderError(err)
	}

	assessment, err = providers.UpdateAssessment(assessment)
	if err != nil {
		return c.RenderError(err)
	}

	return c.RenderJSON(assessment)
}

func (c *CAssessment) GetEmployeeAssessments(id int64) revel.Result {

	assessments, err := providers.GetEmployeeAssessments(int(id))
	if err != nil {
		return c.RenderError(err)
	}
	return c.RenderJSON(assessments)
}

func (c *CAssessment) RemoveEmployeeAssessment(idEmployee, idAssessment int64) revel.Result {

	err := providers.RemoveEmployeeAssessment(&entity.Assessment{
		Id: int(idAssessment),
	}, &entity.Employee{
		Id: int(idEmployee),
	})

	if err != nil {
		return c.RenderError(err)
	}
	return c.RenderJSON(err)
}

func (c *CAssessment) AddEmployeeAssessment(idEmployee, idAssessment int64) revel.Result {

	err := providers.AddEmployeeAssessment(&entity.Assessment{
		Id: int(idAssessment),
	}, &entity.Employee{
		Id: int(idEmployee),
	})

	if err != nil {
		return c.RenderError(err)
	}
	return c.RenderJSON(err)
}

func (c *CAssessment) GetArchiveAssessments() revel.Result {
	assessments, err := providers.GetArchiveAssessments()

	if err != nil {
		return c.RenderError(err)
	}

	return c.RenderJSON(assessments)
}
