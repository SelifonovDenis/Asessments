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

	Assessments := []*entity.Asessment{}

	for i:=0;i< len(assessments); i++  {
		Assessments = append(Assessments, assessments[i])
		step :=0

		for j := i+1; j < len(assessments); j++ {

			if assessments[i].Id == assessments[j].Id {
				Assessments[len(Assessments)-1].Fio = Assessments[len(Assessments)-1].Fio +", " + assessments[j].Fio
				step = step + 1
			} else {

				break
			}
		}
		i =  i + step
	}

	return Assessments,err
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

func GetEmployeeAssessments(id int) ([]*entity.Asessment, error)  {

	db, err := connection.ConnectToDB()
	if err != nil {
		return []*entity.Asessment{},err
	}
	defer db.Close()

	assessments, err := mappers.GetEmployeeAssessments(db, id)
	if err != nil {
		return assessments,err
	}
	return assessments,err
}

func RemoveEmployeeAssessment(assessment *entity.Asessment,employee *entity.Employee) error{
	db, err := connection.ConnectToDB()
	if err!=nil {
		return err
	}
	defer db.Close()

	err = mappers.RemoveEmployeeAssessment(db,assessment, employee)

	return err
}

func AddEmployeeAssessment(assessment *entity.Asessment,employee *entity.Employee) error{
	db, err := connection.ConnectToDB()
	if err!=nil {
		return err
	}
	defer db.Close()
	fkass, fkem,err := mappers.CheckEmployeeAssessment(db, assessment, employee)
	if err!=nil {
		return err
	}
	if fkem.Valid && fkass.Valid {
		return err
	}


	err = mappers.AddEmployeeAssessment(db,assessment, employee)

	return err
}

func GetArchiveAssessments() ([]*entity.Asessment, error)  {

	db, err := connection.ConnectToDB()
	if err != nil {
		return []*entity.Asessment{},err
	}
	defer db.Close()
	assessments, err := mappers.GetArchiveAssessments(db)
	if err != nil {
		return assessments,err
	}

	Assessments := []*entity.Asessment{}

	for i:=0;i< len(assessments); i++  {
		Assessments = append(Assessments, assessments[i])
		step :=0;
		for j := i+1; j < len(assessments); j++ {
			if assessments[i].Id == assessments[j].Id {
				Assessments[len(Assessments)-1].Fio = Assessments[len(Assessments)-1].Fio +", " + assessments[j].Fio
				step++
			} else {
				i =  i + step
				break
			}
		}
	}

	return Assessments,err
}