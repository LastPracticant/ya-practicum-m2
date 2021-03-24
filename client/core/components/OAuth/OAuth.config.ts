export function getOAuthUrl(clientId?: number, redirectUrl = `http://${window.location.host}`) {
    if (!clientId) return;

    return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}`;
}
