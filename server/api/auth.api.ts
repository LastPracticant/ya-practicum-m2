import {
    BaseAPI, HTTP, OptionsWithoutMethodType, SigninProps, SignupProps,
} from 'client/core/api';
import { Response } from 'node-fetch';

const ServerAuthAPI = new HTTP('/auth', 'accrosExpress');

export class AuthAPI extends BaseAPI {
    static signup(data: SignupProps): Promise<Response> {
        return ServerAuthAPI.post('/signup', { data });
    }

    static signin(data: SigninProps): Promise<Response> {
        return ServerAuthAPI.post('/signin', { data, responseFormat: 'text' });
    }

    static getCurrentUserInfo(options: OptionsWithoutMethodType): Promise<Response> {
        return ServerAuthAPI.get<Response>('/user', options);
    }

    static logout(): Promise<Response> {
        return ServerAuthAPI.post('/logout', { responseFormat: 'text' });
    }
}
