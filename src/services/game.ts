import axiosInstance from './config.axios'
import { AxiosResponse } from 'axios'
import { IPaginator } from '../store/ducks/root.types'

class GameService {

    public getAll(paginator: IPaginator) {
        const params = new URLSearchParams()

        if (paginator) {
            if (paginator.page) {
                params.append('page', String(paginator.page + 1))
            }

            if (paginator.rows) {
                params.append('limit', String(paginator.rows))
            }
        }

        return axiosInstance.get('/games', { params })
            .then((response: AxiosResponse) => {
                return { data: response.data.data, headers: response.headers }
            })

    }
}

export default new GameService()