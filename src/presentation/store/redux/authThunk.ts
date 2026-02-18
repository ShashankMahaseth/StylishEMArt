import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthRepositoryImpl } from "../../../data/repositories/authRepositoryImpl";
import { CheckAuthUseCase } from "../../../domain/usecases/checkAuthStatusUseCase";
import { LoginUseCase } from "../../../domain/usecases/LoginUseCase";
import { SignUpUseCase } from "../../../domain/usecases/signupUseCase";

const repo =new AuthRepositoryImpl();
const loginUseCase = new LoginUseCase(repo);
const signUpUseCase = new SignUpUseCase(repo);
const checkAuthUseCase = new CheckAuthUseCase(repo);

const getErrorMessage  =(err:unknown) =>{
    if(err instanceof Error) return err.message;
    if(typeof err === "string") return err;
    return "Unknown Error"
};

export const loginThunk = createAsyncThunk<
  boolean,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    return await loginUseCase.execute(email, password);
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const signupThunk =  createAsyncThunk<
boolean,
{email:string;password:string},
{rejectValue:string}
>("auth/signup",async({email,password},{rejectWithValue}) =>{
 try {
    return await signUpUseCase.execute(email, password);
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const logoutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await repo.logout();
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});


export const checkAuthThunk = createAsyncThunk<
  boolean,
  void,
  { rejectValue: string }
>("auth/check", async (_, { rejectWithValue }) => {
  try {
    return await checkAuthUseCase.execute();
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});
