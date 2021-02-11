import { ComponentCommonProps } from 'client/shared/types';

export interface ErrorPageProps extends ComponentCommonProps {
    errorCode: '403' | '404'
}
