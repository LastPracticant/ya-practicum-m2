export function getOAuthUrl(clientId: string | number, redirectUrl = 'http://localhost:5000') {
    return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}`;
}
