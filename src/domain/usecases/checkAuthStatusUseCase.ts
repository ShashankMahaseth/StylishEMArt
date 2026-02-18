import { AuthRepository } from "../repositories/AuthRepository";

export class CheckAuthUseCase{
    constructor(private repo:AuthRepository){}
    execute(){
        return this.repo.isLoggedIn();
    }
}