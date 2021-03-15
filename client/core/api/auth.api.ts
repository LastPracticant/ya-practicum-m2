import { HTTP, NODE_API_HOST } from './api';
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

export class AuthAPIBase extends BaseAPI {
    _apiInstance: HTTP;

    constructor(host?: string) {
        super();
        this._apiInstance = new HTTP('/auth', host);
    }

    signup(data: SignupProps): Promise<XMLHttpRequest> {
        return this._apiInstance.post('/signup', { data });
    }

    signin(data: SigninProps): Promise<XMLHttpRequest> {
        return this._apiInstance.post('/signin', { data, responseFormat: 'text' });
    }

    getCurrentUserInfo(): Promise<CurrentUserInfoProps> {
        return this._apiInstance.get<CurrentUserInfoProps>('/user');
    }

    logout(): Promise<XMLHttpRequest> {
        return this._apiInstance.post('/logout', { responseFormat: 'text' });
    }
}

export const AuthAPI = new AuthAPIBase();
