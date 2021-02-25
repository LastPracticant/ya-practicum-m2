import { StoreProps } from '../store.types';

export const profileSelector = (store: StoreProps) => {
    if (store.profile) {
        return { ...store.profile };
    }
    return store.profile;
};
