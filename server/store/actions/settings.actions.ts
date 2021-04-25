import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
    setUserSettingsAction,
    StoreProps,
} from 'client/core/store';
import {
    fetchUserSettings,
} from 'server/controllers/controllers.utils';

export const getUserSettingsThunk = (userId: number): ThunkAction<void, StoreProps, unknown, Action<string>> => async (
    dispatch,
) => {
    await fetchUserSettings(userId).then((user) => {
        if (!user?.settings) return;

        dispatch(
            setUserSettingsAction(JSON.parse(user.settings)),
        );
    }).catch(console.error);
};
