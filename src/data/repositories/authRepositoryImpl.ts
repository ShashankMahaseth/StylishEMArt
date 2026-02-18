import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { authLocalDataSource } from "../datasource/authLocalDataSource";
import { firebaseAuthDataSource } from "../datasource/firebaseAuthDataSource";


export class AuthRepositoryImpl implements AuthRepository {
    async login(email: string, password: string): Promise<boolean> {
        try {
            await firebaseAuthDataSource.login(email, password);
            await authLocalDataSource.saveLogin();
            return true;
        } catch (error: any) {
            throw new Error(error.message || "Firebase login failed");
        }
    }

    async signup(email: string, password: string): Promise<boolean> {
        try {
            await firebaseAuthDataSource.signup(email, password);
            await authLocalDataSource.saveLogin();
            return true;
        } catch (error: any) {
            throw new Error(error.message || "Firebase signup failed");
        }
    }
    async logout(): Promise<void> {
        try {
            await firebaseAuthDataSource.logout();
            await authLocalDataSource.logout();
        } catch {
            throw new Error("Firebase logout failed")
        }
    }

    async isLoggedIn(): Promise<boolean> {
        try {
            const user = firebaseAuthDataSource.getCurrentUser();
            return !!user;
        } catch {
            return false;
        }
    }
}
