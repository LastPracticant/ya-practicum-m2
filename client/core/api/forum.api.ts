import { HTTP } from './api';
import { BaseAPI } from './base.api';

export interface SignupProps {
    first_name: string
    second_name: string
    login: string
    email: string
    password: string
    password_confirm: string
    phone: string
}

export interface SigninProps {
    login: string
    password: string
}

export interface CurrentUserInfoProps {
    id: number
    first_name: string
    second_name: string
    display_name: string
    login: string
    email: string
    phone: string
    avatar: string
}

const ExpressForumAPI = new HTTP('/internal/forum');

export class AuthAPI extends BaseAPI {
    static getAll() {
        // TODO: описать контракт ответа
        return ExpressForumAPI.get<{}, any>('/topic');
    }
}
