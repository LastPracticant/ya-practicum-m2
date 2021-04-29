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
    profileSelector, settingsSelector, updateUserSettingsThunk, UserSettingsProps,
} from 'client/core/store';

const SettingsComponent: React.FC<PageComponentProps> = ({ title }) => {
    const dispatch = useDispatch();
    const userSettings = useSelector(settingsSelector);
    const profile = useSelector(profileSelector);

    const updateSettings = useCallback((settings: UserSettingsProps) => {
        dispatch(updateUserSettingsThunk(profile.id, settings));
    }, []);

    const handleSettingsChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        updateSettings({
            ...userSettings,
            [event.target.name]: event.target.checked,
        });
    }, [userSettings]);

    return (
        <PageLayout goBackLink={ROUTES.HOME.path}>
            <Meta title={title} />
            <Paper title={title}>
                <FormControlLabel
                    control={(
                        <Switch
                            checked={userSettings.isColorThemeLight}
                            onChange={handleSettingsChange}
                            name="isColorThemeLight"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                      )}
                    label={LOCAL.SETTINGS_THEME}
                />

                <FormControlLabel
                    control={(
                        <Switch
                            checked={userSettings.isMusicEnabled}
                            onChange={handleSettingsChange}
                            name="isMusicEnabled"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                      )}
                    label={LOCAL.MUSIC}
                />
            </Paper>
        </PageLayout>
    );
};

export const Settings = withCheckAuth(SettingsComponent);
