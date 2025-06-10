import api from '@/lib/api'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null
}

// Register thunk
const registerUser = createAsyncThunk('/auth/register',
    async(formData, thunkAPI) => {
        try {
          const res = await api.post("/auth/register", formData, {
            withCredentials: true,
          });
          return res.data;
        } 
        catch (error) {
          return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)

// Login thunk
const loginUser = createAsyncThunk('/auth/login',
    async(formData, thunkAPI) => {
        try {
            const res = await api.post('/auth/login', formData, {
            withCredentials: true
            })
            return res.data
        }
        catch (error) {
          return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {

        }
    },
    extraReducers: builder => {
        //
        // Register states
        builder.addCase(registerUser.pending, state=>{
            state.isLoading = true;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        }).addCase(registerUser.rejected, state => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        })
        //
        // Login states
        builder.addCase(loginUser.pending, state=>{
            state.isLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        }).addCase(loginUser.rejected, state => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        })
    }
})

export const { setUser } = authSlice.actions;
export { registerUser, loginUser }
export default authSlice.reducer;