import { Agent } from 'https'
import { AxiosInstance, default as axios } from 'axios'
import Interceptors from './interceptors'

class ConfigAxios {
    private readonly _instance: AxiosInstance

    constructor() {
        // Base address configuration for backend service
        this._instance = axios.create({
            baseURL: process.env.CONNECTION_DATABASE,
            httpsAgent: new Agent({ rejectUnauthorized: false })
        })
    }

    /* Method for configuring the interceptors that acted on the request */
    private configRequestInterceptors(): void {
        this._instance
            .interceptors
            .request
            .use(Interceptors.injectAccessToken)
    }

    /* Method for configuring the interceptors that acted on the response */
    private configResponseInterceptors(): void {
        this._instance
            .interceptors
            .response
            .use(
                undefined,
                Interceptors.handlerError
            )
    }

    get instance(): AxiosInstance {
        return this._instance
    }
}

export default new ConfigAxios().instance