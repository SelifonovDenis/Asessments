package providers

import (
	"Asessments/app/models/connection"
	"Asessments/app/models/entity"
	"Asessments/app/models/mappers"
)

func GetAssessments() ([]*entity.Asessment, error)  {

	db, err := connection.ConnectToDB()
	if err != nil {
		return []*entity.Asessment{},err
	}
	defer db.Close()
	assessments, err := mappers.GetAssessments(db)
	if err != nil {
		return assessments,err
	}
	return assessments,err
}

func GetAssessment(assessment *entity.Asessment) (*entity.Asessment, error) {

	db, err := connection.ConnectToDB()
	if err!=nil {
		return assessment,err
	}
	defer db.Close()

	assessment, err = mappers.GetAssessment(db, assessment)
	if err != nil {
		return assessment,err
	}
	return assessment,err
}

func AddAssessment(assessment *entity.Asessment)(*entity.Asessment, error){
	db, err := connection.ConnectToDB()
	if err!=nil {
		return assessment,err
	}
	defer db.Close()

	err = mappers.AddAssessment(db,*assessment)
	if err != nil {
		return assessment, err
	}

	return assessment, err
}

func UpdateAssessment(assessment *entity.Asessment)(*entity.Asessment, error){
	db, err := connection.ConnectToDB()
	if err!=nil {
		return assessment,err
	}
	defer db.Close()

	err = mappers.UpdateAssessment(db,assessment)

	return assessment, err
}