import { BaseAPI, OAuthSigninProps } from 'client/core/api';
import { ExpressHTTP } from './api';

const ServerOAuthAPI = new ExpressHTTP('/oauth/yandex');

export class ExpressOAuthAPI extends BaseAPI {
    static signinWithYandex(data: OAuthSigninProps) {
        return ServerOAuthAPI.post<OAuthSigninProps>('', { data });
    }

    static getServiceId() {
        return ServerOAuthAPI.get('/service-id');
    }
}
