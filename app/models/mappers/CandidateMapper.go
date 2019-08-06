package mappers

import (
	"Asessments/app/models/entity"
	"database/sql"
)

//GetCandidateTable получить данные о кандидате нужные только для таблицы
func GetCandidateTable(db *sql.DB) ([]*entity.Candidate, error) {

	Candidates := []*entity.Candidate{}

	rows, err := db.Query(`
	  	SELECT c.id, c.first_name, c.last_name, c.middle_name, c.status, c.archive, a.id, a.date, ca.id 
	  	FROM asessments.asessment.candidate c
		LEFT JOIN asessments.asessment.candidate_assessment ca
		ON fk_candidate = c.id
	  	LEFT JOIN asessments.asessment.assessment a
	  	ON fk_assessment = a.id
		WHERE c.archive = $1 
		ORDER BY c.id
	  	`, 0)
	if err != nil {
		return Candidates, err
	}
	defer rows.Close()


	for rows.Next() {
		candidate := entity.Candidate{}
		date := sql.NullString{}
		asesId :=sql.NullInt64{}
		caId :=sql.NullInt64{}
		err = rows.Scan(&candidate.Id, &candidate.First_name, &candidate.Last_name, &candidate.Middle_name, &candidate.Status, &candidate.Archive, &asesId, &date, &caId )

		if err != nil {
			return Candidates, err
		}
		if date.Valid{
			candidate.Asessment.Date = date.String
		}
		if asesId.Valid {
			candidate.Asessment.Id = int(asesId.Int64)
		}
		if caId.Valid {
			candidate.Id_c_a = int(caId.Int64)
		}

		Candidates = append(Candidates,&candidate)
	}
	return Candidates, err
}



//GetCandidate Прлучить кандидата по id
func GetCandidate(db *sql.DB, candidate *entity.Candidate) (*entity.Candidate, error) {
	rows, err := db.Query(`
		SELECT c.id, c.first_name, c.last_name, c.middle_name, c.phone, c.email, c.status,c.archive
	  	FROM asessments.asessment.candidate	c	
		WHERE c.id = $1	
		`, candidate.Id)
	if err != nil {
		return candidate,err
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&candidate.Id, &candidate.First_name, &candidate.Last_name, &candidate.Middle_name, &candidate.Phone, &candidate.Email, &candidate.Status, &candidate.Archive)
		if err != nil {
			return candidate,err
		}
	}
	return candidate,err
}

//AddCandidate Добавить кандидата
func AddCandidate(db *sql.DB, candidate *entity.Candidate) (err error){

	_, err = db.Exec(`
	INSERT INTO asessments.asessment.candidate
		(first_name, last_name, middle_name, phone, email, status)
	VALUES 
		($1, $2, $3, $4, $5 ,$6)
	RETURNING id;
	`,	candidate.First_name, candidate.Last_name, candidate.Middle_name, candidate.Phone, candidate.Email, candidate.Status)

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
		    archive = $7
		WHERE 
			id = $8
	`,candidate.First_name, candidate.Last_name, candidate.Middle_name, candidate.Phone, candidate.Email, candidate.Status,candidate.Archive, candidate.Id)

	if err != nil{
		return
	}
	return
}

// GetCandidates получить кандидатов назначенных на собеседование с id
func GetCandidates(db *sql.DB, candidate *entity.Candidate) ([]*entity.Candidate, error) {
	Candidates := []*entity.Candidate{}

	rows, err := db.Query(`
		SELECT c.id, c.first_name, c.last_name, c.middle_name, c.phone, c.email, c.status
	  	FROM asessments.asessment.candidate	c	
		LEFT JOIN asessments.asessment.candidate_assessment
		ON fk_candidate = c.id
		WHERE fk_assessment = $1	
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

func GetFreeCandidates(db *sql.DB) ([]*entity.Candidate, error) {

	Candidates := []*entity.Candidate{}

	rows, err := db.Query(`
	  	SELECT id, first_name, last_name, middle_name, phone, email, status, archive
	  	FROM asessments.asessment.candidate 
		WHERE archive = $1
		ORDER BY id
	  	`, 0)
	if err != nil {
		return Candidates, err
	}
	defer rows.Close()


	for rows.Next() {
		candidate := entity.Candidate{}
		err = rows.Scan(&candidate.Id, &candidate.First_name, &candidate.Last_name, &candidate.Middle_name, &candidate.Phone, &candidate.Email, &candidate.Status,  &candidate.Archive)

		if err != nil {
			return Candidates, err
		}

		Candidates = append(Candidates,&candidate)
	}
	return Candidates, err
}

func GetAllCandidates(db *sql.DB) ([]*entity.Candidate, error) {

	Candidates := []*entity.Candidate{}

	rows, err := db.Query(`
	  	SELECT c.id, c.first_name, c.last_name, c.middle_name, c.status, c.archive, a.id, a.date
	  	FROM asessments.asessment.candidate c
		LEFT JOIN asessments.asessment.candidate_assessment
		ON fk_candidate = c.id
	  	LEFT JOIN asessments.asessment.assessment a
	  	ON fk_assessment = a.id
		ORDER BY c.id
	  	`, )
	if err != nil {
		return Candidates, err
	}
	defer rows.Close()


	for rows.Next() {
		candidate := entity.Candidate{}
		date := sql.NullString{}
		Id :=sql.NullInt64{}
		err = rows.Scan(&candidate.Id, &candidate.First_name, &candidate.Last_name, &candidate.Middle_name, &candidate.Status, &candidate.Archive, &Id, &date)

		if err != nil {
			return Candidates, err
		}
		if date.Valid{
			candidate.Asessment.Date = date.String
		}
		if Id.Valid {
			candidate.Asessment.Id = int(Id.Int64)
		}

		Candidates = append(Candidates,&candidate)
	}
	return Candidates, err
}
