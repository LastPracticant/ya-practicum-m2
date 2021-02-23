import { HTTP, ResponseProps } from './api';
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

const authAPIInstance = new HTTP('/auth');

export class AuthAPI extends BaseAPI {
    static signup(data: SignupProps): Promise<XMLHttpRequest> {
        return authAPIInstance.post('/signup', { data });
    }

    static signin(data: SigninProps): Promise<XMLHttpRequest> {
        return authAPIInstance.post('/signin', { data, responseFormat: 'text' });
    }

    static getCurrentUserInfo(): Promise<ResponseProps<string>> {
        return authAPIInstance.get<string>('/user');
    }

    static logout(): Promise<XMLHttpRequest> {
        return authAPIInstance.post('/logout');
    }
}
