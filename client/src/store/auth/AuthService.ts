import {$api} from "../../http";
import {AuthResponse} from "../../models/response/AuthResponse";

export class AuthService {
    static async login(email: string, password: string) {
        return $api.post<AuthResponse>('/login', {email, password});
    }

    static async registration(email: string, password: string) {
        return $api.post<AuthResponse>('/registration', {email, password});
    }

    static async logout() {
        return $api.post<AuthResponse>('/logout');
    }
}