import {
    BaseAPI, OptionsWithoutMethodType, SigninProps, SignupProps,
} from 'client/core/api';
import { ExpressHTTP } from './api';

const ServerAuthAPI = new ExpressHTTP('/auth');

export class ExpressAuthAPI extends BaseAPI {
    static signup(data: SignupProps) {
        return ServerAuthAPI.post<SignupProps>('/signup', { data });
    }

    static signin(data: SigninProps) {
        return ServerAuthAPI.post<SigninProps>('/signin', { data, responseFormat: 'text' });
    }

    static getCurrentUserInfo(options: OptionsWithoutMethodType) {
        return ServerAuthAPI.get('/user', options);
    }

    static logout(options: OptionsWithoutMethodType) {
        return ServerAuthAPI.post('/logout', { ...options, responseFormat: 'text' });
    }
}
