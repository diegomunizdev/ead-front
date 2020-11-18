import { Agent } from 'https'
import { AxiosInstance, default as axios } from 'axios'
import Interceptors from './interceptors.service'

class ConfigAxios {
    private readonly _instance: AxiosInstance

    constructor() {
        // Base address configuration for backend service
        this._instance = axios.create({
            // TODO: URL_BASE
            baseURL: 'http://localhost:3001/ead',
            httpsAgent: new Agent({ rejectUnauthorized: false })
        })

        this.configRequestInterceptors()
        this.configResponseInterceptors()
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