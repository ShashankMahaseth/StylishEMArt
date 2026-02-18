import { clearLoginStatus, getLoginStatus, saveLoginStatus } from "../../core/storage/AsyncStorage";

export const authLocalDataSource ={
    saveLogin:()=>saveLoginStatus(true),
    logout:()=> clearLoginStatus(),
    isLoggedIn:()=>getLoginStatus(),
};

