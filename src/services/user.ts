import httpClient from './config.axios'
import { AxiosResponse, AxiosRequestConfig } from 'axios'
import User, { UserTypes } from '../store/application/models/user/user'
import AccessToken from '../store/application/models/user/access.token'
import authService, { urlBase } from './auth'
import { IPaginator } from '../store/ducks/root.types'

class UserService {

    constructor(private apiUrl: string = urlBase) {

    }

    public create(newUser: User) {
        return httpClient.post(`http://localhost:3001/ead/user`, newUser)
    }

    public remove(userId: string) {
        return httpClient.delete(`${this.apiUrl}/app/user/${userId}`)
    }

    public update(user: User) {
        return httpClient.patch(`${this.apiUrl}/app/user/${user.id}`, user)
    }

    public getById(userId: string) {
        return httpClient.get(`http://localhost:3001/ead/user/${userId}/profile`)
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