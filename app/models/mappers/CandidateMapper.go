package mappers

import (
	"Asessments/app/models/entity"
	"database/sql"
)

//GetCandidateTable получить данные о кандидате нужные только для таблицы
func GetCandidateTable(db *sql.DB) (*[]entity.CandidateTable, error) {

	Candidates := []entity.CandidateTable{}

	rows, err := db.Query(`
	  	SELECT candidate.id, first_name, last_name, middle_name, status, date 
	  	FROM asessments.asessment.candidate
		LEFT JOIN asessments.asessment.asessment
		ON id_asessment = asessment.id
		ORDER BY candidate.id
	  	`)
	if err != nil {
		return &Candidates, err
	}
	defer rows.Close()


	for rows.Next() {
		candidate := entity.CandidateTable{}
		date :=sql.NullString{}
		err = rows.Scan(&candidate.Id, &candidate.First_name, &candidate.Last_name, &candidate.Middle_name, &candidate.Status, &date)
		if err != nil {
			return &Candidates, err
		}
		if date.Valid{
			candidate.Date = date.String
		}
		Candidates = append(Candidates,candidate)
	}
	return &Candidates, err
}



//GetCandidate Прлучить кандидата по id
func GetCandidate(db *sql.DB, candidate *entity.Candidate) (*entity.Candidate, error) {
	rows, err := db.Query(`
		SELECT * FROM asessments.asessment.candidate
		WHERE 
			id = $1
		`, candidate.Id)
	if err != nil {
		return candidate,err
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&candidate.Id, &candidate.First_name, &candidate.Last_name, &candidate.Middle_name, &candidate.Phone, &candidate.Email, &candidate.Status, &candidate.Id_asessment)
		if err != nil {
			return candidate,err
		}
	}
	return candidate,err
}

//AddCandidate Добавить кандидата
func AddCandidate(db *sql.DB, candidate entity.Candidate) (int, error){
	var id int

	err := db.QueryRow(`
	INSERT INTO asessments.asessment.candidate
		(first_name, last_name, middle_name, phone, email, status)
	VALUES 
		($1, $2, $3, $4, $5 ,$6)
	RETURNING id;
	`,	candidate.First_name, candidate.Last_name, candidate.Middle_name, candidate.Phone, candidate.Email, candidate.Status).Scan(&id)

	if err != nil{
		return 0, err
	}

 	return id, nil
}

// UpdateCandidate изсенить данные о кандидате
func UpdateCandidate(db *sql.DB, column, result string, id int ) (err error){
	_, err = db.Exec(`
		update asessments.asessments.candidate
		set 
			`+column+` = $1 
		where 
			id = $2
	`, result, id)

	if err != nil{
		return
	}
	return
}

// UpdateCandidate изсенить данные о кандидате
func UpdateIdAssessmentCandidate(db *sql.DB, column string, result int, id int ) (err error){
	_, err = db.Exec(`
		update asessments.asessments.candidate
		set 
			`+column+` = $1 
		where 
			id = $2
	`, result, id)

	if err != nil{
		return
	}
	return
}