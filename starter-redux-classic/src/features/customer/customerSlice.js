const initialStateCustomer = {
  fullName: '',
  nationalId: '',
  createdAt: '',
  isLoading: false,
}

const customerReducer = (state = initialStateCustomer, action) => {
  switch (action.type) {
    case 'customer/create':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
        isLoading: false,
      }
    case 'customer/updateName':
      return { ...state, fullName: action.payload.fullName }
    case 'customer/fetchingCustomer':
      return { ...state, isLoading: true }
    default:
      return { ...state }
  }
}

export const fetchCustomer = () => {
  return async (dispatch, getState) => {
    dispatch({ type: 'customer/fetchingCustomer' })

    const res = await fetch('https://dummyjson.com/users/1')
    const data = await res.json()
    const customerData = {
      fullName: `${data.firstName} ${data.lastName}`,
      nationalId: data.id,
      createdAt: new Date().toISOString(),
    }

    dispatch({ type: 'customer/create', payload: customerData })
  }
}

export const createCustomer = (fullName, nationalId) => {
  return {
    type: 'customer/create',
    payload: {
      fullName,
      nationalId,
      createdAt: new Date().toISOString(),
    },
  }
}

export const updateName = (fullName) => {
  return { type: 'account/updateName', payload: fullName }
}

export default customerReducer
