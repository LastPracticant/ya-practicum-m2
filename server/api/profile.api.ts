import {
    BaseAPI,
    ChangePasswordProps, ChangeProfileProps, CurrentUserInfoProps,
} from 'client/core/api';
import { Response } from 'node-fetch';
import { ExpressHTTP } from './api';

const ServerProfileAPI = new ExpressHTTP('/user');

export class ExpressProfileAPI extends BaseAPI {
    static change(data: ChangeProfileProps) {
        return ServerProfileAPI.put<ChangeProfileProps, Response>('/profile', { data });
    }

    static changeAvatar(data: FormData) {
        return ServerProfileAPI.put<CurrentUserInfoProps, Response>('/profile/avatar', { data });
    }

    static changePassword(data: ChangePasswordProps) {
        return ServerProfileAPI.put<ChangePasswordProps, Response>('/password', { data, responseFormat: 'text' });
    }
}
