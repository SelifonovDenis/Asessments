package mappers

import (
	"Asessments/app/models/entity"
	"database/sql"
)

//GetAsessments получить данные о кандидате нужные только для таблицы
func GetAssessments(db *sql.DB) ([]*entity.Assessment, error) {

	Assessments := []*entity.Assessment{}

	rows, err := db.Query(`
		SELECT assessment.id, date, cabinet, first_name, last_name, middle_name, assessment.status 
		FROM asessments.asessment.assessment 
  		LEFT JOIN asessments.asessment.employee_assessment 
   		ON fk_assessment = assessment.id 
  		LEFT JOIN asessments.asessment.employee 
    	ON fk_employee = employee.id 
		WHERE assessment.status != $1
		ORDER BY assessment.id
`, "Архив")
	if err != nil {
		return Assessments, err
	}
	defer rows.Close()

	for rows.Next() {
		assessment := entity.Assessment{}
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
			assessment.Fio = assessment.Fio + " "+string([]rune(lastName.String)[0]) + "."
		}
		if middleName.Valid{
			assessment.Fio = assessment.Fio + " " +string([]rune(middleName.String)[0]) + "."
		}

		Assessments = append(Assessments,&assessment)
	}
	return Assessments, err
}


func GetAssessment(db *sql.DB, assessment *entity.Assessment) (*entity.Assessment, error) {
	rows, err := db.Query(`
		SELECT id, date, cabinet, status
	  	FROM asessments.asessment.assessment		
		WHERE id = $1	
		`, assessment.Id)
	if err != nil {
		return assessment,err
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&assessment.Id, &assessment.Date, &assessment.Cabinet, &assessment.Status)
		if err != nil {
			return assessment,err
		}
	}
	return assessment,err
}

//AddAssessment Добавить кандидата
func AddAssessment(db *sql.DB, assessment *entity.Assessment) (err error){

	_, err = db.Exec(`
	INSERT INTO asessments.asessment.assessment
		(date,cabinet)
	VALUES 
		($1,$2)
	`,	assessment.Date, assessment.Cabinet)

	if err != nil{
		return err
	}
	return nil
}

// UpdateAssessment изсенить данные о кандидате
func UpdateAssessment(db *sql.DB, assessment *entity.Assessment) (err error){
	_, err = db.Exec(`
		UPDATE asessments.asessment.assessment
		SET 
			date = $1, 
		    cabinet = $2,
			status = $3
		WHERE 
			id = $4
	`, assessment.Date,  assessment.Cabinet,assessment.Status, assessment.Id)

	if err != nil{
		return
	}
	return
}


func GetEmployeeAssessments(db *sql.DB, id int) ([]*entity.Assessment, error) {

	var Assessments []*entity.Assessment

	rows, err := db.Query(`
	  	SELECT a.id, a.date, a.cabinet
	  	FROM asessments.asessment.assessment a
		LEFT JOIN asessments.asessment.employee_assessment
		ON fk_assessment = a.id 
	  	WHERE fk_employee = $1 
		ORDER BY a.id
	  	`, id)
	if err != nil {
		return Assessments, err
	}
	defer rows.Close()

	for rows.Next() {
		assessment := entity.Assessment{}
		err = rows.Scan(&assessment.Id, &assessment.Date, &assessment.Cabinet)
		if err != nil {
			return Assessments, err
		}
		Assessments = append(Assessments,&assessment)
	}
	return Assessments, err
}

func RemoveEmployeeAssessment(db *sql.DB, assessment *entity.Assessment, employee *entity.Employee) (err error){
	_, err = db.Exec(`
		DELETE FROM asessments.asessment.employee_assessment		
		WHERE fk_employee = $1 AND fk_assessment = $2
	`, employee.Id, assessment.Id)

	if err != nil{
		return
	}
	return
}

func AddEmployeeAssessment(db *sql.DB, assessment *entity.Assessment, employee *entity.Employee) (err error){
	_, err = db.Exec(`
		INSERT INTO asessments.asessment.employee_assessment (fk_assessment, fk_employee) 
		SELECT $1, $2 
		WHERE NOT EXISTS (
		  SELECT * FROM asessments.asessment.employee_assessment 
		  WHERE fk_assessment = $1 AND fk_employee = $2
		  )
	`, assessment.Id,employee.Id)

	if err != nil{
		return
	}
	return
}


func GetArchiveAssessments(db *sql.DB) ([]*entity.Assessment, error) {

	Assessments := []*entity.Assessment{}

	rows, err := db.Query(`
		SELECT assessment.id, date, cabinet, first_name, last_name, middle_name, assessment.status 
		FROM asessments.asessment.assessment 
  		LEFT JOIN asessments.asessment.employee_assessment 
   		ON fk_assessment = assessment.id 
  		LEFT JOIN asessments.asessment.employee 
    	ON fk_employee = employee.id 
		WHERE assessment.status = $1
		ORDER BY assessment.id
`, "Архив")
	if err != nil {
		return Assessments, err
	}
	defer rows.Close()

	for rows.Next() {
		assessment := entity.Assessment{}
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

func SearchAssessments(db *sql.DB) ([]*entity.Assessment, error) {

	Assessments := []*entity.Assessment{}

	rows, err := db.Query(`
		SELECT assessment.id, date, cabinet, first_name, last_name, middle_name, assessment.status 
		FROM asessments.asessment.assessment 
  		LEFT JOIN asessments.asessment.employee_assessment 
   		ON fk_assessment = assessment.id 
  		LEFT JOIN asessments.asessment.employee 
    	ON fk_employee = employee.id 
		ORDER BY assessment.id
`, )
	if err != nil {
		return Assessments, err
	}
	defer rows.Close()

	for rows.Next() {
		assessment := entity.Assessment{}
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
			assessment.Fio = assessment.Fio + " "+string([]rune(lastName.String)[0]) + "."
		}
		if middleName.Valid{
			assessment.Fio = assessment.Fio + " " +string([]rune(middleName.String)[0]) + "."
		}

		Assessments = append(Assessments,&assessment)
	}
	return Assessments, err
}