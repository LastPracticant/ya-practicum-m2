import { MESSAGES, METHOD } from './api.consts';

type HeadersType = {
    [key: string]: string
};

type OptionsType = {
    method: METHOD
    data?: any
    headers?: HeadersType
    responseFormat?: 'json' | 'text'
};

type OptionsWithoutMethodType = Omit<OptionsType, 'method'>;

export interface ResponseProps<T> extends Omit<XMLHttpRequest, 'response'> {
    response: T
}

export const API_HOST = 'yhttps://a-praktikum.tech';
export const API_BASE_PATH = `${API_HOST}/api/v2`;

export function queryStringify<T extends object>(data: T): string {
    if (!data) return '';

    const queryArr = Object.entries(data).map(([key, value]) => `${key}=${value}`);

    return `?${queryArr.join('&')}`;
}

export class HTTP {
    _path: string = API_BASE_PATH;

    constructor(path = '') {
        this._path += path;
    }

    get<T>(url: string, options: OptionsWithoutMethodType = {}): Promise<ResponseProps<T>> {
        return this.request<T>(url, { ...options, method: METHOD.GET });
    }

    post<T>(url: string, options: OptionsWithoutMethodType = {}): Promise<ResponseProps<T>> {
        return this.request<T>(url, { ...options, method: METHOD.POST });
    }

    put<T>(url: string, options: OptionsWithoutMethodType = {}): Promise<ResponseProps<T>> {
        return this.request<T>(url, { ...options, method: METHOD.PUT });
    }

    delete<T>(url: string, options: OptionsWithoutMethodType = {}): Promise<ResponseProps<T>> {
        return this.request<T>(url, { ...options, method: METHOD.DELETE });
    }

    request<T>(
        url: string,
        options: OptionsType = { method: METHOD.GET },
    ): Promise<ResponseProps<T>> {
        const { method, data, responseFormat = 'json' } = options;

        const defaultReject = (response: Response) => {
            if (response.status >= 500) {
                alert(MESSAGES.FAIL_MESSAGE_500_DEFAULT);
            } else {
                alert(MESSAGES.FAIL_MESSAGE_DEFAULT);
            }
        };

        const basePath = `${this._path}${url}`;
        const path = method === METHOD.GET
            ? `${basePath}${queryStringify(data)}`
            : basePath;

        const isGetMethodOrFormData = method === METHOD.GET || data instanceof FormData;
        return fetch(path, {
            method,
            mode: 'cors',
            credentials: 'include',
            body: isGetMethodOrFormData ? data : JSON.stringify(data),
            headers: !isGetMethodOrFormData ? {
                'Content-Type': 'application/json',
            } : undefined,
        })
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(response);
                }

                return response[responseFormat]();
            })
            .then((resData) => resData)
            .catch(defaultReject);
    }
}
