import httpClient from './config.axios'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import User, { UserTypes } from '../store/application/models/user/user'
import { IPaginator } from '../store/ducks/root.types'

const headers = {
    Authorization: localStorage.getItem('Authorization')
} as AxiosRequestConfig

class UserService {

    constructor(private apiUrl: string = '') {

    }

    public create(newUser: User) {
        return axios.post(`http://localhost:3001/ead/user`, newUser)
    }

    public remove(userId: string) {
        return axios.delete(`${this.apiUrl}/app/user/${userId}`)
    }

    public update(user: User) {
        return axios.patch(`${this.apiUrl}/app/user/${user.id}`, user)
    }

    public getById(userId: string) {
        return axios.get(`http://localhost:3001/ead/user/${userId}/profile`, { headers })
            .then((response: AxiosResponse) => response)
    }

    public getAll(type: UserTypes, paginator?: IPaginator) {
        const params = new URLSearchParams()

        if (paginator) {
            if (paginator.page) {
                params.append('page', String(paginator.page + 1))
            }

            if (paginator.rows) {
                params.append('limit', String(paginator.rows))
            }

            /* if (paginator.search) {
                params.append('?name', '*' + paginator.search + '*')
            } */
        }

        return httpClient.get(`http://localhost:3001/ead/user/type/${type}`, { params })
            .then((response: AxiosResponse) => {
                return { data: response.data, headers: response.headers }
            })
    }

}

export default new UserService()