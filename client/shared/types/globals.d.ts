import { StoreProps } from '../../core/store/store.types';

declare global {
    interface Window {
        __INITIAL_STATE__: StoreProps;
    }
}

declare module '*.png' {
    const content: any;
    export default content;
}

declare module '*.gif' {
    const content: any;
    export default content;
}
