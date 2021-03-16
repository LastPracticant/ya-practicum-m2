import {
    BaseAPI, HTTP, OptionsWithoutMethodType, SigninProps, SignupProps,
} from 'client/core/api';
import { Response } from 'node-fetch';

const ServerAuthAPI = new HTTP('/auth', 'accrosExpress');

export class ExpressAuthAPI extends BaseAPI {
    static signup(data: SignupProps) {
        return ServerAuthAPI.post<SignupProps, Response>('/signup', { data });
    }

    static signin(data: SigninProps) {
        return ServerAuthAPI.post<SigninProps, Response>('/signin', { data, responseFormat: 'text' });
    }

    static getCurrentUserInfo(options: OptionsWithoutMethodType) {
        return ServerAuthAPI.get<{}, Response>('/user', options);
    }

    static logout(options: OptionsWithoutMethodType) {
        return ServerAuthAPI.post<{}, Response>('/logout', { ...options, responseFormat: 'text' });
    }
}
