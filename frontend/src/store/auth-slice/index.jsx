import api from '@/lib/api'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null
}

const registerUser = createAsyncThunk('/auth/register',
    async(formData) => {
        const res = await api.post('/auth/register', formData, {
            withCredentials: true
        })
        return res.data
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
        builder.addCase(registerUser.pending, state=>{
            state.isLoading = true;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = action.payload;
        }).addCase(registerUser.rejected, state => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        })
    }
})

export const { setUser } = authSlice.actions;
export { registerUser }
export default authSlice.reducer;