import axiosInstance from './config.axios'
import { AxiosResponse } from 'axios'
import { IPaginator } from '../store/ducks/root.types'
import Game from '../store/application/models/game.model'

class GameService {

    public update(game: Game) {
        return axiosInstance.patch(`/game/${game.id}/update`, game.toJSON())
    }

    public gameByPeriod(period: string, paginator: IPaginator) {
        const params = new URLSearchParams()

        if (paginator) {
            if (paginator.page) {
                params.append('page', String(paginator.page + 1))
            }

            if (paginator.rows) {
                params.append('limit', String(paginator.rows))
            }
        }

        return axiosInstance.get(`/game/period/${period}`, { params })
            .then((response: AxiosResponse) => {
                return { data: response.data.data, headers: response.headers }
            })
    }

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