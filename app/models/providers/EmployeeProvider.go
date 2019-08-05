package providers

import (
	"Asessments/app/models/connection"
	"Asessments/app/models/entity"
	"Asessments/app/models/mappers"
	s "strings"
	)

func GetEmployees() ([]*entity.Employee, error)  {

	db, err := connection.ConnectToDB()
	if err != nil {
		return []*entity.Employee{},err
	}
	defer db.Close()
	employees, err := mappers.GetEmployees(db)
	if err != nil {
		return employees,err
	}

	return employees,err

}

func GetEmployee(employee *entity.Employee) (*entity.Employee, error) {

	db, err := connection.ConnectToDB()
	if err!=nil {
		return employee,err
	}
	defer db.Close()

	employee, err = mappers.GetEmployee(db, employee)
	if err != nil {
		return employee,err
	}
	return employee,err
}

func AddEmployee(employee *entity.Employee)(*entity.Employee, error){
	db, err := connection.ConnectToDB()
	if err!=nil {
		return employee,err
	}
	defer db.Close()

	err = mappers.AddEmployee(db,employee)
	if err != nil {
		return employee, err
	}

	return employee, err
}

func UpdateEmployee(employee *entity.Employee)(*entity.Employee, error){
	db, err := connection.ConnectToDB()
	if err!=nil {
		return employee,err
	}
	defer db.Close()

	err = mappers.UpdateEmployee(db,employee)

	return employee, err
}


func GetArchiveEmployees() ([]*entity.Employee, error)  {

	db, err := connection.ConnectToDB()
	if err != nil {
		return []*entity.Employee{},err
	}
	defer db.Close()
	candidatesTable, err := mappers.GetArchiveEmployees(db)
	if err != nil {
		return candidatesTable,err
	}

	return candidatesTable,err
}

func GetAssessmentsEmployee(id int) ([]*entity.Employee, error) {

	db, err := connection.ConnectToDB()
	if err!=nil {
		return []*entity.Employee{},err
	}
	defer db.Close()

	employee, err := mappers.GetAssessmentsEmployee(db, id)
	if err != nil {
		return employee,err
	}
	return employee,err
}

func SearchEmployee(employee *entity.Employee) ([]*entity.Employee, error) {

	db, err := connection.ConnectToDB()
	if err != nil {
		return nil, err
	}
	defer db.Close()

	Employees, err := mappers.GetAllEmployees(db)

	if err != nil {
		return Employees, err
	}

	searchResult := []*entity.Employee{}

	for _, elem := range Employees {
		if s.HasPrefix(s.ToLower(elem.First_name), s.ToLower(employee.First_name)) &&
			s.HasPrefix(s.ToLower(elem.Last_name), s.ToLower(employee.Last_name)) &&
			s.HasPrefix(s.ToLower(elem.Middle_name), s.ToLower(employee.Middle_name)) &&
			s.HasPrefix(s.ToLower(elem.Phone), s.ToLower(employee.Phone)) &&
			s.HasPrefix(s.ToLower(elem.Email), s.ToLower(employee.Email)) &&
			s.HasPrefix(elem.Status, employee.Status) {
			searchResult = append(searchResult, elem)
		}
	}
	return searchResult, err
}