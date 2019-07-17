package controllers

import "github.com/revel/revel"



func (c App) Login() revel.Result {
	return c.Render()
}