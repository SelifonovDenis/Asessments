package providers

import (
	"Asessments/app/models/connection"
	"Asessments/app/models/entity"
	"Asessments/app/models/mappers"
)


func GetCandidateTable() ([]*entity.Candidate, error)  {

	db, err := connection.ConnectToDB()
	if err != nil {
		return []*entity.Candidate{},err
	}
	defer db.Close()
	candidatesTable, err := mappers.GetCandidateTable(db)
	if err != nil {
		return candidatesTable,err
	}

	return candidatesTable,err

}

func GetCandidate(candidate *entity.Candidate) (*entity.Candidate, error) {

	db, err := connection.ConnectToDB()
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
	db, err := connection.ConnectToDB()
	if err!=nil {
		return candidate,err
	}
	defer db.Close()

	err = mappers.AddCandidate(db,*candidate)
	if err != nil {
		return candidate, err
	}

	return candidate, err
}

func UpdateCandidate(candidate *entity.Candidate)(*entity.Candidate, error){
	db, err := connection.ConnectToDB()
	if err!=nil {
		return candidate,err
	}
	defer db.Close()

	err = mappers.UpdateCandidate(db,candidate)
	return candidate, err
}

func GetArchiveCandidate() ([]*entity.Candidate, error)  {

	db, err := connection.ConnectToDB()
	if err != nil {
		return []*entity.Candidate{},err
	}
	defer db.Close()
	candidatesTable, err := mappers.GetArchiveCandidate(db)
	if err != nil {
		return candidatesTable,err
	}

	return candidatesTable,err

}