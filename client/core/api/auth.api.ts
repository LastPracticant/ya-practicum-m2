import { HTTP, API_EXPRESS_HOST } from './api';
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

const ExpressAuthAPI = new HTTP('/auth', 'accrosExpress', API_EXPRESS_HOST);

export class AuthAPI extends BaseAPI {
    static signup(data: SignupProps): Promise<Response> {
        return ExpressAuthAPI.post('/signup', { data });
    }

    static signin(data: SigninProps): Promise<Response> {
        return ExpressAuthAPI.post('/signin', { data, responseFormat: 'text' });
    }

    static getCurrentUserInfo(): Promise<CurrentUserInfoProps> {
        return ExpressAuthAPI.get<CurrentUserInfoProps>('/user');
    }

    static logout(): Promise<Response> {
        return ExpressAuthAPI.post('/logout', { responseFormat: 'text' });
    }
}
