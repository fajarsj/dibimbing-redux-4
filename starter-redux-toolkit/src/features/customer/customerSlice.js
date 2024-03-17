import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  fullName: '',
  nationalId: '',
  createdAt: '',
  isLoading: '',
}

export const fetchCustomer = createAsyncThunk(
  'customer/fetchCustomer',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {
      // https://dummyjson.com/docs/users
      const res = await fetch('https://dummyjson.com/users/1')
      const data = await res.json()
      // await new Promise((resolve) => setTimeout(resolve, 10000))
      const customerData = {
        fullName: `${data.firstName} ${data.lastName}`,
        nationalId: data.id,
        createdAt: new Date().toISOString(),
      }

      return customerData
    } catch (error) {
      return rejectWithValue('something went wrong')
    }
  }
)

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalId) {
        return { payload: { fullName, nationalId } }
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName
        state.nationalId = action.payload.nationalId
        state.createdAt = new Date().toISOString()
      },
    },
    updateName(state, action) {
      state.fullName = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomer.fulfilled, (state, action) => {
      state.isLoading = false
      state.fullName = action.payload.fullName
      state.nationalId = action.payload.nationalId
      state.createdAt = action.payload.createdAt
    })
    builder.addCase(fetchCustomer.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchCustomer.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export const { createCustomer, updateName } = customerSlice.actions

export default customerSlice.reducer
