export interface AuthRepository{
    login(email:string,password:string) : Promise<boolean>;
      signup(email: string, password: string): Promise<boolean>;
    logout():Promise<void>
    isLoggedIn():Promise<boolean>;
}

/*
Promise is Equivalent to suspend function like in Android Coroutines scope 
helps in API calls ,AsyncStorage etc all are are asynchronous.
*/


/*
login(email: string, password: string): Promise<boolean>
is Equivalent to =>
suspend fun login(email: String, password: String): Boolean

*/