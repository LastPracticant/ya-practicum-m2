import { BaseAPI, OAuthSigninProps } from 'client/core/api';
import { APP_DEV_URL, APP_PROD_URL, IS_DEV } from '../../env';
import { ExpressHTTP } from './api';

const ServerOAuthAPI = new ExpressHTTP('/oauth/yandex');

export class ExpressOAuthAPI extends BaseAPI {
    static signinWithYandex(data: OAuthSigninProps) {
        return ServerOAuthAPI.post<OAuthSigninProps>('', { data });
    }

    static getServiceId() {
        return ServerOAuthAPI.get(`/service-id?redirect_uri=${IS_DEV ? APP_DEV_URL : APP_PROD_URL}`);
    }
}
