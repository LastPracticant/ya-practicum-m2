import { METHOD } from 'client/core/api';

export interface ApiRouteProps {
    path: string
    method: METHOD
}

export const ROUTES = {
    user: {
        path: '/api/user',
        method: METHOD.GET,
    },
};
