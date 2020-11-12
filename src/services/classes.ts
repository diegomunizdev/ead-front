import Classes from '../store/application/models/classes.model'
import axiosInstance from './config.axios'

class ClassesService {
  public create(classe: Classes) {
    return axiosInstance.post(`/classes`, classe.toJSON())
  }

  public getBySubject(subjectId: string) {
    return axiosInstance.get(`/subject/${subjectId}/classes`)
      .then(response => {
        return response
      })
  }
}

export default new ClassesService()