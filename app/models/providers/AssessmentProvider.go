package providers

import (
	"Asessments/app/models/connection"
	"Asessments/app/models/entity"
	"Asessments/app/models/mappers"
	s "strings"
)

func GetAssessments() ([]*entity.Assessment, error)  {

	db, err := connection.ConnectToDB()
	if err != nil {
		return []*entity.Assessment{},err
	}
	defer db.Close()
	assessments, err := mappers.GetAssessments(db)
	if err != nil {
		return assessments,err
	}

	Assessments := []*entity.Assessment{}

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

func GetAssessment(assessment *entity.Assessment) (*entity.Assessment, error) {

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

func AddAssessment(assessment *entity.Assessment)(*entity.Assessment, error){
	db, err := connection.ConnectToDB()
	if err!=nil {
		return assessment,err
	}
	defer db.Close()

	err = mappers.AddAssessment(db,assessment)
	if err != nil {
		return assessment, err
	}

	return assessment, err
}

func UpdateAssessment(assessment *entity.Assessment)(*entity.Assessment, error){
	db, err := connection.ConnectToDB()
	if err!=nil {
		return assessment,err
	}
	defer db.Close()

	err = mappers.UpdateAssessment(db,assessment)

	return assessment, err
}

func GetEmployeeAssessments(id int) ([]*entity.Assessment, error)  {

	db, err := connection.ConnectToDB()
	if err != nil {
		return []*entity.Assessment{},err
	}
	defer db.Close()

	assessments, err := mappers.GetEmployeeAssessments(db, id)
	if err != nil {
		return assessments,err
	}
	return assessments,err
}

func RemoveEmployeeAssessment(assessment *entity.Assessment,employee *entity.Employee) error{
	db, err := connection.ConnectToDB()
	if err!=nil {
		return err
	}
	defer db.Close()

	err = mappers.RemoveEmployeeAssessment(db,assessment, employee)

	return err
}

func AddEmployeeAssessment(assessment *entity.Assessment,employee *entity.Employee) error{
	db, err := connection.ConnectToDB()
	if err!=nil {
		return err
	}
	defer db.Close()


	err = mappers.AddEmployeeAssessment(db,assessment, employee)

	return err
}

func GetArchiveAssessments() ([]*entity.Assessment, error)  {

	db, err := connection.ConnectToDB()
	if err != nil {
		return []*entity.Assessment{},err
	}
	defer db.Close()
	assessments, err := mappers.GetArchiveAssessments(db)
	if err != nil {
		return assessments,err
	}

	Assessments := []*entity.Assessment{}

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

func SearchAssessments(assessment *entity.Assessment) ([]*entity.Assessment, error)  {

	db, err := connection.ConnectToDB()
	if err != nil {
		return []*entity.Assessment{},err
	}
	defer db.Close()
	assessments, err := mappers.SearchAssessments(db)
	if err != nil {
		return assessments,err
	}

	searchResult := []*entity.Assessment{}

	for _, elem := range assessments {
		if s.HasPrefix(s.ToLower(elem.Date), s.ToLower(assessment.Date)) && s.HasPrefix(s.ToLower(elem.Cabinet), s.ToLower(assessment.Cabinet)) && s.HasPrefix(s.ToLower(elem.Status), s.ToLower(assessment.Status)) {
			searchResult = append(searchResult, elem)
		}
	}

	Assessments := []*entity.Assessment{}

	for i:=0;i< len(searchResult); i++  {
		Assessments = append(Assessments, searchResult[i])
		step :=0

		for j := i+1; j < len(searchResult); j++ {

			if searchResult[i].Id == searchResult[j].Id {
				Assessments[len(Assessments)-1].Fio = Assessments[len(Assessments)-1].Fio +", " + searchResult[j].Fio
				step = step + 1
			} else {
				break
			}
		}
		i =  i + step
	}

	return Assessments,err
}