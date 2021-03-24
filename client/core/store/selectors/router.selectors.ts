import { StoreProps } from '../store.types';

export const routerSelector = (store: StoreProps) => ({
    router: store.router,
});
