package controllers

import (
	"Asessments/app/models/entity"
	"Asessments/app/models/providers"
	"github.com/revel/revel"
)

type CCandidate struct {
	*revel.Controller
}

func (c *CCandidate) GetCandidateTable()revel.Result  {

	candidatesTable, err:=providers.GetCandidateTable()

	if err!=nil {
		return c.RenderError(err)
	}

	return c.RenderJSON(candidatesTable)
}

func (c *CCandidate) GetCandidate(id int64)revel.Result  {

	candidate, err := providers.GetCandidate(&entity.Candidate{
		Id: int(id),
	})
	if err != nil {
		return c.RenderError(err)
	}
	return c.RenderJSON(candidate)
}

func (c *CCandidate) AddCandidate()revel.Result  {
	candidate := new(entity.Candidate)
	err := c.Params.BindJSON(&candidate)
	if err != nil {
		return c.RenderError(err)
	}

	candidate, err = providers.AddCandidate(candidate)
	if err != nil {
		return c.RenderError(err)
	}

	return c.RenderJSON(candidate)
}

func (c *CCandidate) UpdateCandidate()revel.Result  {

	candidate := new(entity.Candidate)
	err := c.Params.BindJSON(&candidate)
	if err != nil {
		return c.RenderError(err)
	}

	candidate, err = providers.UpdateCandidate(candidate)
	if err != nil {
		return c.RenderError(err)
	}

	return c.RenderJSON(candidate)
}


func (c *CCandidate) GetCandidates(id int64)revel.Result  {

	Candidates, err:=providers.GetCandidates(&entity.Candidate{
		Asessment: entity.Assessment{Id:int(id)},
	})


	if err!=nil {
		return c.RenderError(err)
	}

	return c.RenderJSON(Candidates)
}

func (c *CCandidate) GetFreeCandidates()revel.Result  {

	candidatesTable, err:=providers.GetFreeCandidates()

	if err!=nil {
		return c.RenderError(err)
	}

	return c.RenderJSON(candidatesTable)
}

func (c *CCandidate) SearchCandidate()revel.Result  {

	candidate := new(entity.Candidate)
	err := c.Params.BindJSON(&candidate)

	searchResult, err:=providers.SearchCandidate(candidate)

	if err!=nil {
		return c.RenderError(err)
	}

	return c.RenderJSON(searchResult)
}

