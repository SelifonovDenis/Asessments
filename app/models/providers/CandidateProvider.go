package providers

import (
	"Asessments/app/models/entity"
	"Asessments/app/models/mappers"
	"database/sql"
	"strconv"
)


func GetCandidateTable() (*[]entity.CandidateTable, error)  {

	connStr := "user=admin password=zxcvqwer dbname=asessments sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return &[]entity.CandidateTable{},err
	}
	defer db.Close()


	candidatesTable, err := mappers.GetCandidateTable(db)
	if err != nil {
		return candidatesTable,err
	}

	return candidatesTable,err

}

func GetCandidate(candidate *entity.Candidate) (*entity.Candidate, error) {

	connStr := "user=admin password=zxcvqwer dbname=asessments sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err!=nil {
		return candidate,err
	}
	defer db.Close()

	candidate, err = mappers.GetCandidate(db, candidate)
	if err != nil {
		return candidate,err
	}
	return candidate,err
}

func AddCandidate(candidate *entity.Candidate)(*entity.Candidate, error){
	connStr := "user=admin password=zxcvqwer dbname=asessments sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err!=nil {
		return candidate,err
	}
	defer db.Close()

	id, err := mappers.AddCandidate(db,*candidate)
	if err != nil {
		return candidate, err
	}

	if candidate.Id_asessment!=0 {
		err = mappers.UpdateCandidate(db,"id_asessment", strconv.Itoa(candidate.Id_asessment), id)
		if err!=nil {
			return candidate,err
		}
	}
	return candidate, err
}

func UpdateCandidate(candidate *entity.Candidate)(*entity.Candidate, error){
	connStr := "user=admin password=zxcvqwer dbname=asessments sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err!=nil {
		return candidate,err
	}
	defer db.Close()

	if candidate.First_name != "" {
		err = mappers.UpdateCandidate(db,"first_name", candidate.First_name, candidate.Id)
		if err != nil {
			return candidate, err
		}
	}

	if candidate.Last_name != "" {
		err = mappers.UpdateCandidate(db,"last_name", candidate.Last_name, candidate.Id)
		if err != nil {
			return candidate, err
		}
	}

	if candidate.Middle_name != "" {
		err = mappers.UpdateCandidate(db,"middle_name", candidate.Middle_name, candidate.Id)
		if err != nil {
			return candidate, err
		}
	}

	if candidate.Phone != "" {
		err = mappers.UpdateCandidate(db,"phone", candidate.Phone, candidate.Id)
		if err != nil {
			return candidate, err
		}
	}

	if candidate.Email != "" {
		err = mappers.UpdateCandidate(db,"email", candidate.Email, candidate.Id)
		if err != nil {
			return candidate, err
		}
	}

	if candidate.Status != "" {
		err = mappers.UpdateCandidate(db,"status", candidate.Status, candidate.Id)
		if err != nil {
			return candidate, err
		}
	}

	if candidate.Id_asessment != 0 {
		err = mappers.UpdateIdAssessmentCandidate(db,"id_asessment", candidate.Id_asessment, candidate.Id)
		if err != nil {
			return candidate, err
		}
	}
	return candidate, err
}
