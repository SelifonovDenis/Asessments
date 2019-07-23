package controllers

import (
	"Asessments/app/models/entity"
	"Asessments/app/models/providers"
	"fmt"
	"github.com/revel/revel"
)

type CCandidate struct {
	*revel.Controller
}

func (c CCandidate) GetCandidateTable()revel.Result  {

	candidatesTable, err:=providers.GetCandidateTable()

	if err!=nil {
		fmt.Println(err)
		c.Response.Status = 500
		return c.RenderJSON(err)
	}

	return c.RenderJSON(candidatesTable)
}

func (c CCandidate) GetCandidate()revel.Result  {
	var id int
	c.Params.Bind(&id, "id")

	candidate := new(entity.Candidate)
	candidate.Id = id

	candidate, err := providers.GetCandidate(candidate)
	if err != nil {
		fmt.Println(err)
		c.Response.Status = 500
		return c.RenderJSON(err)
	}
	return c.RenderJSON(candidate)
}

func (c CCandidate) AddCandidate()revel.Result  {
	candidate := new(entity.Candidate)
	err := c.Params.BindJSON(&candidate)
	if err != nil {
		c.Response.Status = 500
		return c.RenderJSON(err)
	}

	fmt.Println()
	fmt.Println(candidate)
	fmt.Println()

	candidate, err = providers.AddCandidate(candidate)
	if err != nil {
		fmt.Println()
		fmt.Println(err)
		fmt.Println()
		c.Response.Status = 500
		return c.RenderJSON(err)
	}

	return c.RenderJSON(candidate)
}