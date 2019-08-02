package mappers

import (
	"Asessments/app/models/entity"
	"database/sql"
)

//GetEmployees получить данные о сотрудниках
func GetEmployees(db *sql.DB) ([]*entity.Employee, error) {

	employees := []*entity.Employee{}

	rows, err := db.Query(`
	  	SELECT id, first_name, last_name, middle_name, phone, email, status
	  	FROM asessments.asessment.employee
	  	WHERE status != $1
		ORDER BY id
	  	`, "Архив")
	if err != nil {
		return employees, err
	}
	defer rows.Close()


	for rows.Next() {
		employee := entity.Employee{}
		err = rows.Scan(&employee.Id, &employee.First_name, &employee.Last_name, &employee.Middle_name, &employee.Phone, &employee.Email, &employee.Status)

		if err != nil {
			return employees, err
		}
		employees = append(employees,&employee)
	}
	return employees, err
}

//GetEmployee Прлучить сотрудника по id
func GetEmployee(db *sql.DB, employee *entity.Employee) (*entity.Employee, error) {
	rows, err := db.Query(`
		SELECT id, first_name, last_name, middle_name, phone, email
	  	FROM asessments.asessment.employee		
		WHERE id = $1	
		`, employee.Id)
	if err != nil {
		return employee,err
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&employee.Id, &employee.First_name, &employee.Last_name, &employee.Middle_name, &employee.Phone, &employee.Email)
		if err != nil {
			return employee,err
		}
	}
	return employee,err
}

//AddEmployee Добавить кандидата
func AddEmployee(db *sql.DB, employee *entity.Employee) (err error){

	_, err = db.Exec(`
	INSERT INTO asessments.asessment.employee
		(first_name, last_name, middle_name, phone, email)
	VALUES 
		($1, $2, $3, $4, $5)
	RETURNING id;
	`,	employee.First_name, employee.Last_name, employee.Middle_name, employee.Phone, employee.Email)

	if err != nil{
		return err
	}
	return nil
}

// UpdateEmployee изсенить данные о кандидате
func UpdateEmployee(db *sql.DB, employee *entity.Employee) (err error){
	_, err = db.Exec(`
		UPDATE asessments.asessment.employee
		SET 
			first_name = $1, 
		    last_name = $2,
		    middle_name = $3,
		    phone = $4,
			email = $5,
			status = $6
		WHERE 
			id = $7
	`, employee.First_name,  employee.Last_name,  employee.Middle_name,  employee.Phone,  employee.Email, employee.Status, employee.Id)

	if err != nil{
		return
	}

	return
}


func GetArchiveEmployees(db *sql.DB) ([]*entity.Employee, error) {

	employees := []*entity.Employee{}

	rows, err := db.Query(`
	  	SELECT id, first_name, last_name, middle_name, phone, email, status
	  	FROM asessments.asessment.employee
	  	WHERE status = $1
		ORDER BY id
	  	`, "Архив")
	if err != nil {
		return employees, err
	}
	defer rows.Close()


	for rows.Next() {
		employee := entity.Employee{}
		err = rows.Scan(&employee.Id, &employee.First_name, &employee.Last_name, &employee.Middle_name, &employee.Phone, &employee.Email, &employee.Status)

		if err != nil {
			return employees, err
		}
		employees = append(employees,&employee)
	}
	return employees, err
}

func GetAssessmentsEmployee(db *sql.DB, id int) ([]*entity.Employee, error) {

	var Employees []*entity.Employee

	rows, err := db.Query(`
	  	SELECT e.id, e.first_name, e.last_name, e.middle_name
	  	FROM asessments.asessment.employee e
		LEFT JOIN asessments.asessment.employee_assessment
		ON fk_employee = e.id 
	  	WHERE fk_assessment = $1
		ORDER BY e.id
	  	`, id)
	if err != nil {
		return Employees, err
	}
	defer rows.Close()

	for rows.Next() {
		employee := entity.Employee{}
		err = rows.Scan(&employee.Id, &employee.First_name, &employee.Last_name, &employee.Middle_name)
		if err != nil {
			return Employees, err
		}
		Employees = append(Employees,&employee)
	}
	return Employees, err
}