package mappers

import (
	"Asessments/app/models/entity"
	"database/sql"
)

//GetCandidateTable получить данные о кандидате нужные только для таблицы
func GetCandidateTable(db *sql.DB) (Candidates []entity.Candidate, err error) {
	rows, err := db.Query(`SELECT id, first_name, last_name, middle_name, status, id_asessment FROM asessment.candidate`)
	if err != nil {
		return
	}
	defer rows.Close()

	Candidates = []entity.Candidate{}
	for rows.Next() {
		candidate := entity.Candidate{}
		err = rows.Scan(&candidate.Id, &candidate.First_name, &candidate.Last_name, &candidate.Middle_name, &candidate.Status, &candidate.Id_asessment)
		if err != nil {
			return
		}
		Candidates = append(Candidates,candidate)
	}
	return
}
//GetCandidate Прлучить кандидата по id
func GetCandidate(db *sql.DB, Candidate entity.Candidate) (candidate entity.Candidate, err error) {
	rows, err := db.Query(`
		SELECT * FROM asessment.candidate
		WHERE 
			id = $1
		`, Candidate.Id)
	if err != nil {
		return
	}
	defer rows.Close()

	for rows.Next() {
		candidate = entity.Candidate{}
		err = rows.Scan(&candidate.Id, &candidate.First_name, &candidate.Last_name, &candidate.Middle_name, &candidate.Status, &candidate.Id_asessment)
		if err != nil {
			return
		}
	}
	return
}

//AddCandidate Добавить кандидата
func AddCandidate(db *sql.DB, candidate entity.Candidate) (int, error){
	var id int
	err := db.QueryRow(`INSERT INTO asessments.candidate
		(first_name, last_name, middle_name, phone, email, status)
	values
		($1, $2, $3, $4, $5 ,$6)
	`,	candidate.First_name, candidate.Last_name, candidate.Middle_name, candidate.Phone, candidate.Email, candidate.Status).Scan(&id)

	if err != nil{
		return 0, err
	}
 	return id, nil
}

// UpdateIdAsessment Изменить дату собеседования
func UpdateIdAsessment(db *sql.DB, candidate entity.Candidate, asessment entity.Asessment) (int, error){
	result, err := db.Exec(`
		update asessments.candidate
		set 
			id_asessment = $1 
		where 
			id = $2
	`, asessment.Id, candidate.Id)

	if err != nil{
		return 0, err
	}

	id, err:=result.RowsAffected()
	if err != nil{
		return 0, err
	}

	return int(id), nil
}

// UpdateStatus изменить статус кандидата
func UpdateStatus(db *sql.DB, candidate entity.Candidate) (int, error){
	result, err := db.Exec(`
		update asessments.candidate
		set 
			status = $1 
		where 
			id = $2
	`, candidate.Status, candidate.Id)

	if err != nil{
		return 0, err
	}

	id, err:=result.RowsAffected()
	if err != nil{
		return 0, err
	}

	return int(id), nil
}

//DeleteCandidate удалить кандидата по id
func DeleteCandidate(db *sql.DB, candidate entity.Candidate) (int, error){

	result, err := db.Exec(`
	DELETE FROM Products 
	where 
		id = $1
	`, candidate.Id)

	if err != nil{
		return 0, err
	}

	id, err:=result.RowsAffected()
	if err != nil{
		return 0, err
	}

	return int(id), nil
}