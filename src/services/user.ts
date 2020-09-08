import axiosInstance from './config.axios'
import { AxiosResponse } from 'axios'
import User, { UserTypes } from '../store/application/models/user/user'
import { IPaginator } from '../store/ducks/root.types'

class UserService {

    public create(newUser: User) {
        return axiosInstance.post(`/user`, newUser.toJSON())
    }

    public remove(userId: string) {
        return axiosInstance.delete(`/user/${userId}`)
    }

    public update(user: User) {
        return axiosInstance.patch(`/user/${user.id}`, user.toJSON())
    }

    public getById(userId: string) {
        return axiosInstance.get(`/user/${userId}/profile`)
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

        return axiosInstance.get(`/user/type/${type}`, { params })
            .then((response: AxiosResponse) => {
                return { data: response.data, headers: response.headers }
            })
    }

}

export default new UserService()