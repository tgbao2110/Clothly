import api from '@/lib/api'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    isLoading: true,
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
            console.log(res)
            return res.data
        }
        catch (error) {
          return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)

// Check auth thunk (validate session)
const checkAuth = createAsyncThunk('/auth/check-auth',
    async(formData,thunkAPI) => {
        try {
            const res = await api.get('/auth/check-auth', {
                withCredentials: true,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                }
            })
            return res.data
        }
        catch (error)
        {
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
)


///// Slice /////
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
            state.user = action.payload.data;
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
        //
        // CheckAuth states
        builder.addCase(checkAuth.pending, state=>{
            state.isLoading = true;
        }).addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        }).addCase(checkAuth.rejected, state => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        })
    }
})

export const { setUser } = authSlice.actions;
export { registerUser, loginUser, checkAuth }
export default authSlice.reducer;