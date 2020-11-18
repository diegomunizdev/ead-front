import { AxiosResponse } from 'axios'
import axiosInstance from './config.axios.service'
import Exercise from '../store/application/models/exercise.model'
import { IPaginator } from '../store/ducks/root.types'

class ExerciseService {
  public create(newExercise: Exercise) {
    return axiosInstance.post(``, newExercise.toJSON())
  }

  public getBySubjectId(subjectId: string) {
    return axiosInstance.get(``)
      .then((response: AxiosResponse) => response)
  }

  public getAll(subjectId: string, paginator?: IPaginator) {
    const params = new URLSearchParams()

    if (paginator) {
      if (paginator.page === 0) {
        params.append('page', String(paginator.page + 1))
      }

      if (paginator.rows) {
        params.append('limit', String(paginator.rows))
      }
    }

    return axiosInstance.get(``, { params })
      .then((response: AxiosResponse) => {
        return { data: response.data, headers: response.headers }
      })
  }

  public update(exercise: Exercise) {
    return axiosInstance.post(``, exercise.toJSON())
  }

  public remove(exerciseId: string) {
    return axiosInstance.delete(``)
  }
}

export default new ExerciseService()