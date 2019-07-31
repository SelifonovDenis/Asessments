package mappers

import (
	"Asessments/app/models/entity"
	"database/sql"
)

//GetAsessments получить данные о кандидате нужные только для таблицы
func GetAssessments(db *sql.DB) ([]*entity.Asessment, error) {

	Assessments := []*entity.Asessment{}

	rows, err := db.Query(`
		SELECT asessment.id, date, cabinet, first_name, last_name, middle_name, status 
		FROM asessments.asessment.asessment 
  		LEFT JOIN asessments.asessment.employee_asessment 
   		ON fk_asessment = asessment.id 
  		LEFT JOIN asessments.asessment.employee 
    	ON fk_employee = employee.id 
		WHERE status != $1
		ORDER BY asessment.id
`, "Архив")
	if err != nil {
		return Assessments, err
	}
	defer rows.Close()

	for rows.Next() {
		assessment := entity.Asessment{}
		firstName := sql.NullString{}
		lastName := sql.NullString{}
		middleName := sql.NullString{}
		err = rows.Scan(&assessment.Id, &assessment.Date, &assessment.Cabinet, &firstName, &lastName, &middleName, &assessment.Status )
		if err != nil {
			return Assessments, err
		}
		if firstName.Valid{
			assessment.Fio = assessment.Fio + firstName.String
		}
		if lastName.Valid{
			assessment.Fio = assessment.Fio + " "+lastName.String
		}
		if middleName.Valid{
			assessment.Fio = assessment.Fio + " "+middleName.String
		}

		Assessments = append(Assessments,&assessment)
	}
	return Assessments, err
}

//GetAssessment Прлучить сотрудника по id
func GetAssessment(db *sql.DB, asessment *entity.Asessment) (*entity.Asessment, error) {
	rows, err := db.Query(`
		SELECT id, date, cabinet, status
	  	FROM asessments.asessment.asessment		
		WHERE id = $1	
		`, asessment.Id)
	if err != nil {
		return asessment,err
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&asessment.Id, &asessment.Date, &asessment.Cabinet, &asessment.Status)
		if err != nil {
			return asessment,err
		}
	}
	return asessment,err
}

//AddAssessment Добавить кандидата
func AddAssessment(db *sql.DB, asessment entity.Asessment) (err error){

	_, err = db.Exec(`
	INSERT INTO asessments.asessment.asessment
		(date,cabinet)
	VALUES 
		($1,$2)
	`,	asessment.Date, asessment.Cabinet)

	if err != nil{
		return err
	}
	return nil
}

// UpdateAssessment изсенить данные о кандидате
func UpdateAssessment(db *sql.DB, asessment *entity.Asessment) (err error){
	_, err = db.Exec(`
		UPDATE asessments.asessment.asessment
		SET 
			date = $1, 
		    cabinet = $2,
			status = $3
		WHERE 
			id = $4
	`, asessment.Date,  asessment.Cabinet,asessment.Status, asessment.Id)

	if err != nil{
		return
	}
	return
}


func GetEmployeeAssessments(db *sql.DB, id int) ([]*entity.Asessment, error) {

	var Assessments []*entity.Asessment

	rows, err := db.Query(`
	  	SELECT a.id, a.date, a.cabinet
	  	FROM asessments.asessment.employee_asessment
		LEFT JOIN asessments.asessment.asessment a
		ON fk_asessment = asessment.id 
	  	WHERE fk_employee = $1 
		ORDER BY asessment.id
	  	`, id)
	if err != nil {
		return Assessments, err
	}
	defer rows.Close()

	for rows.Next() {
		assessment := entity.Asessment{}
		err = rows.Scan(&assessment.Id, &assessment.Date, &assessment.Cabinet)
		if err != nil {
			return Assessments, err
		}
		Assessments = append(Assessments,&assessment)
	}
	return Assessments, err
}

func RemoveEmployeeAssessment(db *sql.DB, asessment *entity.Asessment, employee *entity.Employee) (err error){
	_, err = db.Exec(`
		DELETE FROM asessments.asessment.employee_asessment		
		WHERE fk_employee = $1 AND fk_asessment = $2
	`, employee.Id, asessment.Id)

	if err != nil{
		return
	}
	return
}

func AddEmployeeAssessment(db *sql.DB, asessment *entity.Asessment, employee *entity.Employee) (err error){
	_, err = db.Exec(`
		INSERT INTO asessments.asessment.employee_asessment
		(fk_asessment,fk_employee)
	VALUES 
		($1,$2)
	`, asessment.Id,employee.Id)

	if err != nil{
		return
	}
	return
}


func GetArchiveAssessments(db *sql.DB) ([]*entity.Asessment, error) {

	Assessments := []*entity.Asessment{}

	rows, err := db.Query(`
		SELECT asessment.id, date, cabinet, first_name, last_name, middle_name 
		FROM asessments.asessment.asessment 
  		LEFT JOIN asessments.asessment.employee_asessment 
   		ON fk_asessment = asessment.id 
  		LEFT JOIN asessments.asessment.employee 
    	ON fk_employee = employee.id 
		WHERE status = $1
		ORDER BY asessment.id
`, "Архив")
	if err != nil {
		return Assessments, err
	}
	defer rows.Close()

	for rows.Next() {
		assessment := entity.Asessment{}
		firstName := sql.NullString{}
		lastName := sql.NullString{}
		middleName := sql.NullString{}
		err = rows.Scan(&assessment.Id, &assessment.Date, &assessment.Cabinet, &firstName, &lastName, &middleName )
		if err != nil {
			return Assessments, err
		}
		if firstName.Valid{
			assessment.Fio = assessment.Fio + firstName.String
		}
		if lastName.Valid{
			assessment.Fio = assessment.Fio + " "+lastName.String
		}
		if middleName.Valid{
			assessment.Fio = assessment.Fio + " "+middleName.String
		}

		Assessments = append(Assessments,&assessment)
	}
	return Assessments, err
}

func CheckEmployeeAssessment(db *sql.DB, asessment *entity.Asessment, employee *entity.Employee) (fkass, fkem sql.NullString,err error){
	rows, err := db.Query(`
		SELECT fk_asessment, fk_employee FROM asessments.asessment.employee_asessment
		WHERE fk_asessment = $1 AND fk_employee = $2
		`, asessment.Id,employee.Id)

	if err != nil{
		return
	}
	for rows.Next() {
		fkass = sql.NullString{}
		fkem = sql.NullString{}
		err = rows.Scan(&fkass, &fkem)
		if err != nil {
			return
		}
	}
	return
}

