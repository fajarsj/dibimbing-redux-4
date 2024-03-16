import { createStore, combineReducers } from 'redux'
import accountReducer from './features/account/accountSlice'
import customerReducer from './features/customer/customerSlice'
import { composeWithDevTools } from '@redux-devtools/extension'

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
})

const store = createStore(rootReducer, composeWithDevTools())

export default store
