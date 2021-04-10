import React, { useCallback, useEffect } from 'react';
import { PageComponentProps } from 'client/shared/types';
import { Paper } from 'client/shared/components';
import { ROUTES } from 'client/routing';
import { Meta, PageLayout } from 'client/core';
import { withCheckAuth } from 'client/core/HOCs';
import { FormControlLabel, Switch } from '@material-ui/core';
import { LOCAL } from 'client/shared/consts';

const SettingsComponent: React.FC<PageComponentProps> = ({ title }) => {
    const [settings, setSettings] = React.useState({
        isColorThemeDark: true,
    });

    const handleSettingsChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [event.target.name]: event.target.checked,
        }));
    }, []);

    useEffect(() => {
        // TODO: необходимо хранить в localStorage на первое время
        console.log(settings);
    }, [settings]);

    return (
        <PageLayout goBackLink={ROUTES.HOME.path}>
            <Meta title={title} />
            <Paper title={title}>
                <FormControlLabel
                    control={(
                        <Switch
                            checked={settings.isColorThemeDark}
                            onChange={handleSettingsChange}
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
