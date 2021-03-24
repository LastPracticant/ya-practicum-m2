import { StoreProps } from '../store.types';

export const oauthSelector = (store: StoreProps) => ({
    oauth: store.oauth,
});
