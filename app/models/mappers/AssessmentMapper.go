package mappers

import (
	"Asessments/app/models/entity"
	"database/sql"
	"fmt"
)

//GetAssessments получить собеседования
func GetAssessments(db *sql.DB) ([]*entity.Assessment, error) {

	Assessments := []*entity.Assessment{}

	rows, err := db.Query(`
		SELECT a.id, a.date, a.cabinet, e.first_name, e.last_name, e.middle_name, a.status, a.archive
		FROM asessments.asessment.assessment a
  		LEFT JOIN asessments.asessment.employee_assessment 
   		ON fk_assessment = a.id 
  		LEFT JOIN asessments.asessment.employee e
    	ON fk_employee = e.id 
		WHERE a.archive = $1
		ORDER BY a.id
`, 0)
	if err != nil {
		return Assessments, err
	}
	defer rows.Close()

	for rows.Next() {
		assessment := entity.Assessment{}
		firstName := sql.NullString{}
		lastName := sql.NullString{}
		middleName := sql.NullString{}
		err = rows.Scan(&assessment.Id, &assessment.Date, &assessment.Cabinet, &firstName, &lastName, &middleName, &assessment.Status, &assessment.Archive )
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

//GetAssessment получить собеседование по id
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

//AddAssessment добавить собеседование
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

// UpdateAssessment изменить данные о собеседовании
func UpdateAssessment(db *sql.DB, assessment *entity.Assessment) (err error){
	_, err = db.Exec(`
		UPDATE asessments.asessment.assessment
		SET 
			date = $1, 
		    cabinet = $2,
			status = $3,
			archive = $4
		WHERE 
			id = $5
	`, assessment.Date,  assessment.Cabinet,assessment.Status,assessment.Archive, assessment.Id)

	if err != nil{
		return
	}
	return
}

//GetEmployeeAssessments получить актуальные собеседования на которые назначен сотрудник с id
func GetEmployeeAssessments(db *sql.DB, id int) ([]*entity.Assessment, error) {

	var Assessments []*entity.Assessment

	rows, err := db.Query(`
	  	SELECT a.id, a.date, a.cabinet, a.archive
	  	FROM asessments.asessment.assessment a
		LEFT JOIN asessments.asessment.employee_assessment
		ON fk_assessment = a.id 
	  	WHERE fk_employee = $1 AND a.archive = $2
		ORDER BY a.id
	  	`, id, 0)
	if err != nil {
		return Assessments, err
	}
	defer rows.Close()

	for rows.Next() {
		assessment := entity.Assessment{}
		err = rows.Scan(&assessment.Id, &assessment.Date, &assessment.Cabinet,&assessment.Archive)
		if err != nil {
			return Assessments, err
		}
		Assessments = append(Assessments,&assessment)
	}
	return Assessments, err
}
//RemoveEmployeeAssessment снять сотрудника с собеседования
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
//AddEmployeeAssessment назначить сотрудника на собеседование
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

//SearchAssessments получение всех собеседования для поиска
func SearchAssessments(db *sql.DB) ([]*entity.Assessment, error) {

	Assessments := []*entity.Assessment{}

	rows, err := db.Query(`
		SELECT a.id, a.date, a.cabinet, e.first_name, e.last_name, e.middle_name, a.status, a.archive 
		FROM asessments.asessment.assessment a
  		LEFT JOIN asessments.asessment.employee_assessment 
   		ON fk_assessment = a.id 
  		LEFT JOIN asessments.asessment.employee e
    	ON fk_employee = e.id 
		ORDER BY a.id
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
		err = rows.Scan(&assessment.Id, &assessment.Date, &assessment.Cabinet, &firstName, &lastName, &middleName, &assessment.Status, &assessment.Archive )
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

//RemoveCandidateAssessment снять кандидата с собеседования
func RemoveCandidateAssessment(db *sql.DB, candidate *entity.Candidate , assessment *entity.Assessment) (err error){
	_, err = db.Exec(`
		DELETE FROM asessments.asessment.candidate_assessment		
		WHERE fk_candidate = $1 AND fk_assessment = $2
	`, candidate.Id, assessment.Id)
	fmt.Println()
	fmt.Println(candidate.Id)
	fmt.Println(assessment.Id)
	fmt.Println()
	if err != nil{
		return
	}
	return
}

//AddCandidateAssessment назначить кандидата на собеседование
func AddCandidateAssessment(db *sql.DB,candidate *entity.Candidate , assessment *entity.Assessment) (err error){
	_, err = db.Exec(`
		INSERT INTO asessments.asessment.candidate_assessment (fk_candidate, fk_assessment)  
		SELECT $1, $2 
		WHERE NOT EXISTS (
		  SELECT * FROM asessments.asessment.candidate_assessment
		  WHERE fk_candidate = $1 AND fk_assessment = $2
		  )
	`, candidate.Id, assessment.Id)

	if err != nil{
		return
	}
	return
}

//GetEmployeeAssessments получить актуальные собеседования на которые назначен сотрудник с id
func GetCandidateAssessments(db *sql.DB, id int) ([]*entity.Assessment, error) {

	var Assessments []*entity.Assessment

	rows, err := db.Query(`
	  	SELECT a.id, a.date, a.cabinet,a.status, a.archive
	  	FROM asessments.asessment.assessment a
		LEFT JOIN asessments.asessment.candidate_assessment
		ON fk_assessment = a.id 
	  	WHERE fk_candidate = $1
		ORDER BY a.id
	  	`, id)
	if err != nil {
		return Assessments, err
	}
	defer rows.Close()

	for rows.Next() {
		assessment := entity.Assessment{}
		err = rows.Scan(&assessment.Id, &assessment.Date, &assessment.Cabinet,&assessment.Status,&assessment.Archive)
		if err != nil {
			return Assessments, err
		}
		Assessments = append(Assessments,&assessment)
	}
	return Assessments, err
}
