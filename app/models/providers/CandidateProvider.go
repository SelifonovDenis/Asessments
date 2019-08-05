package providers

import (
	"Asessments/app/models/connection"
	"Asessments/app/models/entity"
	"Asessments/app/models/mappers"
	s "strings"
)

func GetCandidateTable() ([]*entity.Candidate, error) {

	db, err := connection.ConnectToDB()
	if err != nil {
		return []*entity.Candidate{}, err
	}
	defer db.Close()
	candidatesTable, err := mappers.GetCandidateTable(db)
	if err != nil {
		return candidatesTable, err
	}

	return candidatesTable, err

}

func GetCandidate(candidate *entity.Candidate) (*entity.Candidate, error) {

	db, err := connection.ConnectToDB()
	if err != nil {
		return candidate, err
	}
	defer db.Close()

	candidate, err = mappers.GetCandidate(db, candidate)
	if err != nil {
		return candidate, err
	}
	return candidate, err
}

func AddCandidate(candidate *entity.Candidate) (*entity.Candidate, error) {
	db, err := connection.ConnectToDB()
	if err != nil {
		return candidate, err
	}
	defer db.Close()

	err = mappers.AddCandidate(db, candidate)
	if err != nil {
		return candidate, err
	}

	return candidate, err
}

func UpdateCandidate(candidate *entity.Candidate) (*entity.Candidate, error) {
	db, err := connection.ConnectToDB()
	if err != nil {
		return candidate, err
	}
	defer db.Close()

	err = mappers.UpdateCandidate(db, candidate)
	return candidate, err
}



func GetCandidates(candidate *entity.Candidate) ([]*entity.Candidate, error) {

	db, err := connection.ConnectToDB()
	if err != nil {
		return []*entity.Candidate{}, err
	}
	defer db.Close()

	Candidates, err := mappers.GetCandidates(db, candidate)
	if err != nil {
		return Candidates, err
	}
	return Candidates, err
}

func GetFreeCandidates() ([]*entity.Candidate, error) {

	db, err := connection.ConnectToDB()
	if err != nil {
		return []*entity.Candidate{}, err
	}
	defer db.Close()
	candidatesTable, err := mappers.GetFreeCandidates(db)
	if err != nil {
		return candidatesTable, err
	}

	return candidatesTable, err

}

func SearchCandidate(candidate *entity.Candidate) ([]*entity.Candidate, error) {

	db, err := connection.ConnectToDB()
	if err != nil {
		return nil, err
	}
	defer db.Close()

	candidatesTable, err := mappers.GetAllCandidates(db)

	if err != nil {
		return candidatesTable, err
	}

	searchResult := []*entity.Candidate{}

	for _, elem := range candidatesTable {
		if s.HasPrefix(s.ToLower(elem.First_name), s.ToLower(candidate.First_name)) &&
			s.HasPrefix(s.ToLower(elem.Last_name), s.ToLower(candidate.Last_name)) &&
			s.HasPrefix(s.ToLower(elem.Middle_name), s.ToLower(candidate.Middle_name)) &&
			s.HasPrefix(s.ToLower(elem.Phone), s.ToLower(candidate.Phone)) &&
			s.HasPrefix(s.ToLower(elem.Email), s.ToLower(candidate.Email)) &&
			s.HasPrefix(elem.Status, candidate.Status) &&
			s.HasPrefix(elem.Asessment.Date, candidate.Asessment.Date) &&
			elem.Archive == candidate.Archive{
			searchResult = append(searchResult, elem)
		}
	}
	return searchResult, err
}
