import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState, AppThunk } from '@/store'
import common from '@/utils/common'

export interface CounterState {
  userInfo: any
  collapse: boolean
  tagsList: {
    name: string
    title: string
    path: string
  }[]
}

const initialState: CounterState = { userInfo: common.getStoreData('userinfo') || {}, collapse: false, tagsList: [] }

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const loginAsync = createAsyncThunk('dashboard/fetchCount', async (amount: number) => {
//   const response = await fetchCount(amount)
//   // The value we return becomes the `fulfilled` action payload
//   return response.data
// })

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      common.clearStoreData()
      common.setStoreData('token', action.payload.Authorization)
      common.setStoreData('userinfo', action.payload)
      state.userInfo = action.payload
      // return { ...state, ...action.payload }
    },
    changeCollapse: (state, action: PayloadAction<any>) => {
      state.collapse = action.payload
    },
    setTagsItem: (state, action: PayloadAction<any>) => {
      state.tagsList.push(action.payload)
    },
    delTagsItem: (state, action: PayloadAction<any>) => {
      state.tagsList.splice(action.payload.index, 1)
    },
    clearTags: (state) => {
      state.tagsList = []
    },
    closeTagsOther: (state, action: PayloadAction<any>) => {
      state.tagsList = action.payload
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(incrementAsync.pending, (state) => {
  //         state.status = 'loading'
  //       })
  //       .addCase(incrementAsync.fulfilled, (state, action) => {
  //         state.status = 'idle'
  //         state.value += action.payload
  //       })
  //       .addCase(incrementAsync.rejected, (state) => {
  //         state.status = 'failed'
  //       })
  //   },
})

export const { login, changeCollapse, setTagsItem, delTagsItem, clearTags, closeTagsOther } = dashboardSlice.actions

export const getUserInfo = (state: AppState) => state.dashboard.userInfo

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState) => state.counter.value

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState())
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount))
//     }
//   }

export default dashboardSlice.reducer
