import axiosInstance from './config.axios'
import jwtDecode from 'jwt-decode'
import AccessToken from '../store/application/models/user/access.token'
import { IAuth } from '../store/ducks/auth/types'

const url_base = 'http://localhost:4000'

export class AuthService {
    public login(body: IAuth): Promise<any> {
        return axiosInstance.post(`${url_base}/app/auth/signin`, body)
            .then(response => {
                const { Authorization } = response.data
                localStorage.setItem('Authorization', Authorization)
                return Authorization
            })
    }

    public forgot(email: any) {
        return axiosInstance.post(`${url_base}/auth/forgot`, { email })
    }

    public changePassword(body: { email: string, old_password?: string, new_password: string }) {
        if (!body.old_password) {
            return axiosInstance.patch(`${url_base}/auth/change_password`, body)
        }
        return axiosInstance.patch(`${url_base}/auth/change_password`, body)
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