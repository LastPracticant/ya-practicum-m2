import { StoreProps } from '../../core/store/store.types';

declare global {
    interface Window {
        __INITIAL_STATE__: StoreProps;
    }
}
