import httpClient from './config.axios'
import { AxiosResponse } from 'axios'
import User, { UserTypes } from '../store/application/models/user/user'
import AccessToken from '../store/application/models/user/access.token'
import authService from './auth'
import { IPaginator } from '../store/ducks/root.types'

const VERSION = 'https://localhost:4000'

class UserService {

    public create(newUser: User) {
        return httpClient.post(`${VERSION}/app/user`, newUser)
    }

    public remove(userId: string) {
        return httpClient.delete(`${VERSION}/app/user/${userId}`)
    }

    public update(user: User) {
        return httpClient.patch(`${VERSION}/app/user/${user.id}`, user)
    }

    public getById(userId: string) {
        return httpClient.get(`${VERSION}/app/user/${userId}`)
            .then((response: AxiosResponse) => response.data)
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

            if (paginator.search) {
                params.append('?name', '*' + paginator.search + '*')
            }
        }

        return httpClient.get(`${VERSION}/app/user`, { params })
            .then((response: AxiosResponse) => {
                return { data: response.data, headers: response.headers }
            })
    }

    public async getUserName(): Promise<string> {
        const localUserString = localStorage.getItem('user')
        if (localUserString) {
            const localUserObject: User = JSON.parse(localUserString)
            return localUserObject.name ? localUserObject.name : ''
        }
        const localToken: AccessToken = authService.decodeToken()
        if (localToken && localToken.type) {
            const userLogged = await this.getById(localToken.type)
            localStorage.setItem('user', JSON.stringify(userLogged))
            return userLogged.name
        }
        throw Error('Não foi possivel buscar nome do usuário!')
    }

}

export default new UserService()