package mappers

import (
	"Asessments/app/models/entity"
	"database/sql"
)

//GetAsessments получить данные о кандидате нужные только для таблицы
func GetAssessments(db *sql.DB) ([]*entity.Asessment, error) {

	Assessments := []*entity.Asessment{}

	rows, err := db.Query(`
	  	SELECT id, "date", cabinet 
	  	FROM asessments.asessment.asessment
	  	`)
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

//GetAssessment Прлучить сотрудника по id
func GetAssessment(db *sql.DB, asessment *entity.Asessment) (*entity.Asessment, error) {
	rows, err := db.Query(`
		SELECT id, date, cabinet
	  	FROM asessments.asessment.asessment		
		WHERE id = $1	
		`, asessment.Id)
	if err != nil {
		return asessment,err
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&asessment.Id, &asessment.Date, &asessment.Cabinet)
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
		    cabinet = $2
		WHERE 
			id = $3
	`, asessment.Date,  asessment.Cabinet, asessment.Id)

	if err != nil{
		return
	}
	return
}
