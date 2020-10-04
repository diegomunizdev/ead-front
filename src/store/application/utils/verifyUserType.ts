import authService from '../../../services/auth'

export class VerifyUserType {

    public static verifyType(userType?: string[]): boolean {
        if (userType) {
            try {
                if (userType.length === 0) return true
                const type = authService.typeUser()
                return userType.every(types => userType.includes(type))
            } catch (error) {
                return false
            }
        }

        return true
    }
}