import {
    BaseAPI,
    ChangePasswordProps, ChangeProfileProps, CurrentUserInfoProps, HTTP,
} from 'client/core/api';
import { Response } from 'node-fetch';

const ServerProfileAPI = new HTTP('/user', 'accrosExpress');

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
