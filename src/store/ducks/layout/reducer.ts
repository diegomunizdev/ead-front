import { Reducer } from 'redux'
import { ILayoutState, LayoutTypes } from './types'

const INITIAL_STATE: ILayoutState = {
    username: ''
}


const reducer: Reducer<ILayoutState> = (state: ILayoutState = INITIAL_STATE, action: any) => {
    switch (action.type) {

        case LayoutTypes.CHANGE_USERNAME:
            const { username } = action.payload
            return { ...state, username }

        default:
            return state
    }
}

export default reducer