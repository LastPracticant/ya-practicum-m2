import React, { useCallback } from 'react';
import { PageComponentProps } from 'client/shared/types';
import { Paper } from 'client/shared/components';
import { ROUTES } from 'client/routing';
import { Meta, PageLayout } from 'client/core';
import { withCheckAuth } from 'client/core/HOCs';
import { FormControlLabel, Switch } from '@material-ui/core';
import { LOCAL } from 'client/shared/consts';
import { useDispatch, useSelector } from 'react-redux';
import {
    profileSelector, settingsSelector, setUserSettingsAction, updateUserSettingsThunk,
} from 'client/core/store';
import { ColorThemes } from './Settings.config';

const SettingsComponent: React.FC<PageComponentProps> = ({ title }) => {
    const dispatch = useDispatch();
    const userSettings = useSelector(settingsSelector);
    const profile = useSelector(profileSelector);

    const handleChangeColorTheme = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const settings = {
            colorTheme: event.target.checked ? ColorThemes.Dark : ColorThemes.Light,
        };

        dispatch(setUserSettingsAction(settings));
        dispatch(updateUserSettingsThunk({
            id: profile.id,
            settings: JSON.stringify(settings),
        }));
    }, []);

    return (
        <PageLayout goBackLink={ROUTES.HOME.path}>
            <Meta title={title} />
            <Paper title={title}>
                <FormControlLabel
                    control={(
                        <Switch
                            checked={userSettings.colorTheme !== ColorThemes.Light}
                            onChange={handleChangeColorTheme}
                            name="isColorThemeDark"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                      )}
                    label={LOCAL.SETTINGS_THEME}
                />
            </Paper>
        </PageLayout>
    );
};

export const Settings = withCheckAuth(SettingsComponent);
