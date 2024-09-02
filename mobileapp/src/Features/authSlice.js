import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {loginApi} from '../Utils/Apis';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const LoginApp = createAsyncThunk(
  'auth/login',
  async (state, thunkAPI) => {
    try {
      const response = await loginApi({
        username: state.username,
        password: state.password,
      });

      return {status: response?.status, data: response?.data};
    } catch (error) {
      return thunkAPI.rejectWithValue({
        data: error.response.data,
        status: error.response.status,
      });
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: state => initialState,
  },
  extraReducers: builder => {
    builder.addCase(LoginApp.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(LoginApp.fulfilled, state => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(LoginApp.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {resetAuth} = authSlice.actions;
export default authSlice.reducer;
