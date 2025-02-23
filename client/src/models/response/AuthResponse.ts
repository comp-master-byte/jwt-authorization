import {User} from "../User";

export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
    user: User;
}