import { ComponentCommonProps } from 'shared/types';

export interface ErrorPageProps extends ComponentCommonProps {
    errorCode: '403' | '404'
}
