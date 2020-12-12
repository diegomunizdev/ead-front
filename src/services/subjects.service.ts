import axiosInstance from './config.axios.service'
import { AxiosResponse } from 'axios'
import { IPaginator } from '../store/ducks/root.types'
import Subjects from '../store/application/models/subjects.model'

class SubjectsService {
    public create(subject: Subjects) {
        return axiosInstance.post(`/subject`, subject.toJSON())
    }

    public getById(subjectId: string) {
        return axiosInstance.get(`/subjects/${subjectId}/subject`)
            .then(response => {
                return response
            })
    }

    public getAll(paginator: IPaginator) {
        const params = new URLSearchParams()

        if (paginator) {
            if (paginator.page) {
                params.append('page', String(paginator.page + 1))
            }

            if (paginator.rows) {
                params.append('limit', String(paginator.rows))
            }
        }

        return axiosInstance.get('/subjects', { params })
            .then((response: AxiosResponse) => {
                return { data: response.data.data, headers: response.headers }
            })
    }

    public getByTeacher(teacherId: string) {
        return axiosInstance.get(`/subjects/${teacherId}/teacher`)
            .then((response: AxiosResponse) => {
                return { data: response.data, headers: response.headers }
            })
    }
}

export default new SubjectsService()

