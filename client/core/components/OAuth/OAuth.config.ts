import { APP_DEV_URL, APP_PROD_URL, IS_DEV } from '../../../../env';

export function getOAuthUrl(clientId: number | null) {
    if (!clientId) return;

    const redirectUrl = IS_DEV ? APP_DEV_URL : APP_PROD_URL;

    return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}`;
}
