import { SET_USER_SETTINGS } from '../actions';
import { ActionProps } from '../actions/actions.types';
import { UserSettingsProps } from '../store.types';

const initialStateProfile = {} as UserSettingsProps;

export const settingsReducers = (
    state: UserSettingsProps = initialStateProfile,
    action: Required<ActionProps<UserSettingsProps>>,
) => {
    switch (action.type) {
    case SET_USER_SETTINGS:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
};
