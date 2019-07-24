package providers

import (
	"Asessments/app/models/connection"
	"Asessments/app/models/entity"
	"Asessments/app/models/mappers"
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

	err = mappers.AddEmployee(db,*employee)
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