import {
    BaseAPI,
    ChangePasswordProps, ChangeProfileProps, CurrentUserInfoProps,
} from 'client/core/api';
import { ExpressHTTP } from './api';

const ServerProfileAPI = new ExpressHTTP('/user');

export class ExpressProfileAPI extends BaseAPI {
    static change(data: ChangeProfileProps) {
        return ServerProfileAPI.put<ChangeProfileProps>('/profile', { data });
    }

    static changeAvatar(data: FormData) {
        return ServerProfileAPI.put<CurrentUserInfoProps>('/profile/avatar', { data });
    }

    static changePassword(data: ChangePasswordProps) {
        return ServerProfileAPI.put<ChangePasswordProps>('/password', { data, responseFormat: 'text' });
    }
}
