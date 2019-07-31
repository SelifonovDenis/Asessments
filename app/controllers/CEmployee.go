package controllers

import (
	"Asessments/app/models/entity"
	"Asessments/app/models/providers"
	"github.com/revel/revel"
	"fmt"
)

type CEmployee struct {
	*revel.Controller
}

func (c *CEmployee) GetEmployees()revel.Result  {

	employees, err:=providers.GetEmployees()

	if err!=nil {
		fmt.Println(err)
		c.Response.Status = 500
		return c.RenderJSON(err)
	}

	return c.RenderJSON(employees)
}


func (c *CEmployee) GetEmployee(id int64)revel.Result  {

	employee := new(entity.Employee)
	employee.Id = int(id)
	candidate, err := providers.GetEmployee(employee)
	if err != nil {
		fmt.Println(err)
		c.Response.Status = 500
		return c.RenderJSON(err)
	}
	return c.RenderJSON(candidate)
}


func (c *CEmployee) AddEmployee()revel.Result  {
	employee := new(entity.Employee)
	err := c.Params.BindJSON(&employee)
	if err != nil {
		c.Response.Status = 500
		return c.RenderJSON(err)
	}

	employee, err = providers.AddEmployee(employee)
	if err != nil {
		fmt.Println(err)
		c.Response.Status = 500
		return c.RenderJSON(err)
	}

	return c.RenderJSON(employee)
}

func (c *CEmployee) UpdateEmployee()revel.Result  {

	employee := new(entity.Employee)
	err := c.Params.BindJSON(&employee)
	if err != nil {
		c.Response.Status = 500
		return c.RenderJSON(err)
	}

	fmt.Println(employee)

	employee, err = providers.UpdateEmployee(employee)
	if err != nil {
		fmt.Println()
		fmt.Println(err)
		fmt.Println()
		c.Response.Status = 500
		return c.RenderJSON(err)
	}

	return c.RenderJSON(employee)
}


func (c *CEmployee) RemoveEmployee(id int64)revel.Result  {

	employee := new(entity.Employee)
	employee.Id = int(id)
	candidate, err := providers.RemoveEmployee(employee)
	if err != nil {
		fmt.Println()
		fmt.Println(err)
		fmt.Println()
		c.Response.Status = 500
		return c.RenderJSON(err)
	}
	return c.RenderJSON(candidate)
}

