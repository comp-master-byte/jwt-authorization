import {$api} from "../../http";
import {User} from "../User";

export class UserService {
    static fetchUsers() {
        return $api.get<User[]>('/users')
    }
}