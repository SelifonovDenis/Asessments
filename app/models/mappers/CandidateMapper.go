package mappers

import (
	"Asessments/app/models/entity"
	"database/sql"
)

//GetCandidateTable получить данные о кандидате нужные только для таблицы
func GetCandidateTable(db *sql.DB) ([]*entity.Candidate, error) {

	Candidates := []*entity.Candidate{}

	rows, err := db.Query(`
	  	SELECT candidate.id, first_name, last_name, middle_name, status, id_asessment, date
	  	FROM asessments.asessment.candidate
		LEFT JOIN asessments.asessment.asessment
		ON id_asessment = asessment.id
		WHERE status != $1 
		ORDER BY candidate.id
	  	`, "Архив")
	if err != nil {
		return Candidates, err
	}
	defer rows.Close()


	for rows.Next() {
		candidate := entity.Candidate{}
		date := sql.NullString{}
		err = rows.Scan(&candidate.Id, &candidate.First_name, &candidate.Last_name, &candidate.Middle_name, &candidate.Status, &candidate.Asessment.Id, &date)

		if err != nil {
			return Candidates, err
		}
		if date.Valid{
			candidate.Asessment.Date = date.String
		}

		Candidates = append(Candidates,&candidate)
	}
	return Candidates, err
}



//GetCandidate Прлучить кандидата по id
func GetCandidate(db *sql.DB, candidate *entity.Candidate) (*entity.Candidate, error) {
	rows, err := db.Query(`
		SELECT candidate.id, first_name, last_name, middle_name, phone, email, status, id_asessment, date
	  	FROM asessments.asessment.candidate		
		LEFT JOIN asessments.asessment.asessment
		ON id_asessment = asessment.id
		WHERE candidate.id = $1	
		`, candidate.Id)
	if err != nil {
		return candidate,err
	}
	defer rows.Close()

	for rows.Next() {
		date := sql.NullString{}
		err = rows.Scan(&candidate.Id, &candidate.First_name, &candidate.Last_name, &candidate.Middle_name, &candidate.Phone, &candidate.Email, &candidate.Status, &candidate.Asessment.Id, &date)
		if err != nil {
			return candidate,err
		}
		if date.Valid{
			candidate.Asessment.Date = date.String
		}
	}
	return candidate,err
}

//AddCandidate Добавить кандидата
func AddCandidate(db *sql.DB, candidate entity.Candidate) (err error){

	_, err = db.Exec(`
	INSERT INTO asessments.asessment.candidate
		(first_name, last_name, middle_name, phone, email, status, id_asessment)
	VALUES 
		($1, $2, $3, $4, $5 ,$6, $7)
	RETURNING id;
	`,	candidate.First_name, candidate.Last_name, candidate.Middle_name, candidate.Phone, candidate.Email, candidate.Status, candidate.Asessment.Id)

	if err != nil{
		return err
	}
 	return nil
}

// UpdateCandidate изсенить данные о кандидате
func UpdateCandidate(db *sql.DB, candidate *entity.Candidate) (err error){
	_, err = db.Exec(`
		UPDATE asessments.asessment.candidate
		SET 
			first_name = $1, 
		    last_name = $2,
		    middle_name = $3,
		    phone = $4,
			email = $5,
		    status = $6,
		    id_asessment = $7
		WHERE 
			id = $8
	`,candidate.First_name, candidate.Last_name, candidate.Middle_name, candidate.Phone, candidate.Email, candidate.Status, candidate.Asessment.Id, candidate.Id)

	if err != nil{
		return
	}
	return
}


func GetArchiveCandidate(db *sql.DB) ([]*entity.Candidate, error) {

	Candidates := []*entity.Candidate{}

	rows, err := db.Query(`
	  	SELECT candidate.id, first_name, last_name, middle_name, status, id_asessment, date
	  	FROM asessments.asessment.candidate
		LEFT JOIN asessments.asessment.asessment
		ON id_asessment = asessment.id 
	  	WHERE status = $1 
		ORDER BY candidate.id
	  	`,"Архив")
	if err != nil {
		return Candidates, err
	}
	defer rows.Close()


	for rows.Next() {
		candidate := entity.Candidate{}
		date := sql.NullString{}
		err = rows.Scan(&candidate.Id, &candidate.First_name, &candidate.Last_name, &candidate.Middle_name, &candidate.Status, &candidate.Asessment.Id, &date)

		if err != nil {
			return Candidates, err
		}
		if date.Valid{
			candidate.Asessment.Date = date.String
		}

		Candidates = append(Candidates,&candidate)
	}
	return Candidates, err
}

func GetCandidates(db *sql.DB, candidate *entity.Candidate) ([]*entity.Candidate, error) {
	Candidates := []*entity.Candidate{}

	rows, err := db.Query(`
		SELECT id, first_name, last_name, middle_name, phone, email, status
	  	FROM asessments.asessment.candidate		
		WHERE id_asessment = $1	
		`, candidate.Asessment.Id)
	if err != nil {
		return Candidates,err
	}
	defer rows.Close()

	for rows.Next() {
		candidate := entity.Candidate{}
		err = rows.Scan(&candidate.Id, &candidate.First_name, &candidate.Last_name, &candidate.Middle_name, &candidate.Phone, &candidate.Email, &candidate.Status)
		if err != nil {
			return Candidates,err
		}
		Candidates = append(Candidates, &candidate)
	}
	return Candidates,err
}