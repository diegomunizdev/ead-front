import { AxiosRequestConfig } from 'axios'
import { Toast } from './toast'
import { history } from '../store'

const toast = Toast.getInstance()

export default class Interceptors {

    public static injectAccessToken(request: AxiosRequestConfig): AxiosRequestConfig {
        const token = localStorage.getItem('Authorization')
        if (token) {
            request.headers.Authorization = token ? token : ''
        }
        return request
    }

    public static handlerError(error: any): Promise<Error> {
        let title = ''
        let message = ''
        switch (error?.response?.status) {
            case 400:
                title = 'DADOS INCORRETOS'
                message = 'Verifique os dados informados e tente novamente.'
                break
            case 401:
                title = 'NÃO AUTENTICADO'
                message = 'Usuário não está devidamente autenticado.'
                history.push('/ead/auth/signin')
                break
            case 403:
                title = 'NÃO AUTORIZADO'
                message = 'Usuário não possui permissão para acessar o recurso solicitado.'
                break
            case 404:
                title = 'NÃO ENCONTRADO'
                message = 'Recurso solicitado encontra-se indisponível ou inexistente.'
                break
            case 409:
                title = 'DADOS DUPLICADOS'
                message = 'Ocorreram conflitos com dados que não pode ser duplicados.'
                break
            case 429:
                title = 'TENTATIVAS EXCEDIDAS'
                message = 'Aguarde o tempo de 1 hora e tente novamente.'
                break
            case 500:
                title = 'ERRO INTERNO DO SERVIDOR'
                message = 'Ocorreu um erro durante a operação, tente novamente.'
                break
            case 502:
                title = 'SERVIÇO INDISPONÍVEL'
                message = 'Serviço solicitado encontra-se indisponível, contate o administrador.'
                break
            default:
                title = 'FALHA DURANTE A OPERAÇÃO'
                message = 'Um erro não esperado ocorreu durante a operação, tente novamente.'
                if (error?.message === 'Network Error') {
                    title = 'FALHA NA CONEXÃO'
                    message = 'Verifique sua conexão e tente novamente.'
                }
                break
        }
        toast.show('error', title, message)
        return Promise.reject(error)
    }

}