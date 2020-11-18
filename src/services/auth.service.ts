import axiosInstance from './config.axios.service'
import jwtDecode from 'jwt-decode'
import AccessToken from '../store/application/models/user/access.token'
import { IAuth } from '../store/ducks/auth/types'

export class AuthService {

    public login(body: IAuth): Promise<any> {
        return axiosInstance.post(`/auth/signin`, body)
            .then(response => {
                const { Authorization } = response.data
                localStorage.setItem('Authorization', Authorization)
                return Authorization
            })
    }

    public decodeToken(): AccessToken {
        const token = localStorage.getItem('Authorization')
        return this.decodeJWTToken(token ? token : '')
    }

    public typeUser() {
        const token = localStorage.getItem('Authorization')
        const type = this.decodeJWTToken(token ? token : '')
        return type.type
    }

    public period() {
        const token = localStorage.getItem('Authorization')
        const period = this.decodeJWTToken(token ? token : '')
        return period.period
    }

    public UserId() {
        const token = localStorage.getItem('Authorization')
        const userId = this.decodeJWTToken(token ? token : '')
        return userId.id
    }

    public isAuthenticated(): boolean {
        try {
            const localToken = localStorage.getItem('Authorization')
            return !!localToken
        } catch (e) {
            return false
        }
    }

    public logout(): void {
        localStorage.clear()
    }

    public decodeJWTToken(token: string): any {
        return jwtDecode(token)
    }

}

export default new AuthService()