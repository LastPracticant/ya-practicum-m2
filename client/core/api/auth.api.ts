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

const ExpressAuthAPI = new HTTP('/auth');

export class AuthAPI extends BaseAPI {
    static signup(data: SignupProps) {
        return ExpressAuthAPI.post<SignupProps, Response>('/signup', { data });
    }

    static signin(data: SigninProps) {
        return ExpressAuthAPI.post<SigninProps, Response>('/signin', { data, responseFormat: 'text' });
    }

    static getCurrentUserInfo() {
        return ExpressAuthAPI.get<{}, CurrentUserInfoProps>('/user');
    }

    static logout() {
        return ExpressAuthAPI.post<{}, Response>('/logout', { responseFormat: 'text' });
    }
}
