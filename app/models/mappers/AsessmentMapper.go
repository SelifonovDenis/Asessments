package mappers

import (
	"Asessments/app/models/entity"
	"database/sql"
)

//GetCandidateTable получить данные о кандидате нужные только для таблицы
func GetAsessments(db *sql.DB) (*[]entity.Asessment, error) {

	Assessments := []entity.Asessment{}

	rows, err := db.Query(`
	  	SELECT id, "date", cabinet 
	  	FROM asessments.asessment.asessment
	  	`)
	if err != nil {
		return &Assessments, err
	}
	defer rows.Close()


	for rows.Next() {
		assessment := entity.Asessment{}
		err = rows.Scan(&assessment.Id, &assessment.Date, &assessment.Cabinet)
		if err != nil {
			return &Assessments, err
		}
		Assessments = append(Assessments,assessment)
	}
	return &Assessments, err
}
