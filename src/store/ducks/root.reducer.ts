import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import user from './user/reducer'
import layout from './layout/reducer'
import auth from './auth/reducer'


const createRootReducer = (history: History) => combineReducers({
    user,
    layout,
    auth,
    router: connectRouter(history),

})

export default createRootReducer