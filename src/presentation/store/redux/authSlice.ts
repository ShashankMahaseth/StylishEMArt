import { createSlice } from "@reduxjs/toolkit";
import { checkAuthThunk, loginThunk, logoutThunk, signupThunk } from "./authThunk";

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated" | "error";

interface AuthState{
    status:AuthStatus;
    isLoggedIn:boolean;
    error:string | null;
}
const initialState: AuthState = {
  status: "idle",
  isLoggedIn: false,
  error: null,
};
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        clearAuthError(state){
            state.error =null;
        },
    },

    extraReducers:(builder)=>{
        builder.addCase(loginThunk.pending,(state)=>{
            state.status="loading";
            state.error =null;
        })
        .addCase(loginThunk.fulfilled,(state,action)=>{
            state.isLoggedIn =action.payload;
            state.status = action.payload?"authenticated" :"unauthenticated"
        })
        .addCase(loginThunk.rejected,(state,action)=>{
            state.status ="error";
            state.error = action.payload ?? "Login failed"
        })
        .addCase(signupThunk.pending,(state)=>{
            state.status ="loading";
            state.error =null;
        })
        .addCase(signupThunk.fulfilled,(state,action)=>{
            state.isLoggedIn =  action.payload;
         state.status = action.payload?"authenticated" :"unauthenticated"
        })
        .addCase(signupThunk.rejected,(state,action)=>{
            state.status="error";
            state.error = action.payload ?? "Signup failed";
        })
        .addCase(logoutThunk.pending,(state)=>{
            state.status ="loading";
            state.error =null
        })
        .addCase(logoutThunk.fulfilled,(state)=>{
            state.isLoggedIn = false;
            state.status ="unauthenticated";
        })
        .addCase(logoutThunk.rejected,(state,action)=>{
            state.status = "error";
            state.error = action.payload ?? "Logout Failed";
            
        })
         .addCase(checkAuthThunk.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
        state.status = action.payload ? "authenticated" : "unauthenticated";
      })
      .addCase(checkAuthThunk.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? "Auth check failed";
      });
    },

});

export const{clearAuthError} = authSlice.actions;

export default authSlice.reducer