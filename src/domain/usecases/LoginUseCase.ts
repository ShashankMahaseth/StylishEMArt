import { AuthRepository } from "../repositories/AuthRepository";

export class LoginUseCase{
    constructor(private repo:AuthRepository){}

    execute(email:string,password:string){
        return this.repo.login(email,password)
    }
}


/*
What is constructor?
👉 Constructor is a special function inside a class.

It runs automatically when object is created.

What is execute()?
execute(email: string, password: string) {
    return this.repo.login(email, password)
}

👉 execute is a normal method (function inside class).

It:

Takes email & password

Calls repository login

Returns result
*/


/*
typeScript

export class LoginUseCase{
    constructor(private repo:AuthRepository){}

    execute(email:string,password:string){
        return this.repo.login(email,password)
    }
}

.........................................................
kotlin

class LoginUseCase(
    private val repo: AuthRepository
) {
    suspend fun execute(email: String, password: String): Boolean {
        return repo.login(email, password)
    }
}
 
 */