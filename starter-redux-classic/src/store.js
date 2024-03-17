import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import accountReducer from './features/account/accountSlice'
import customerReducer from './features/customer/customerSlice'
import { composeWithDevTools } from '@redux-devtools/extension'

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
