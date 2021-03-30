import './Forum.css';

import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import AddIcon from '@material-ui/icons/Add';
import { DataGrid } from '@material-ui/data-grid';
import { Meta, PageLayout } from 'client/core';
import { ROUTES } from 'client/routing';
import { ButtonsToolbar, Paper, Popup } from 'client/shared/components';
import { Button } from '@material-ui/core';
import { withCheckAuth } from 'client/core/HOCs';
import { useElementVisible } from 'client/core/hooks';
import { rows } from './Forum.mock';
import { columns, block } from './Forum.config';
import { AddTopikForm } from './components';

export const ForumBoardComponent: React.FC<PageComponentProps> = React.memo(({ title }) => {
    const {
        elementVisible,
        handleChangeElementVisible,
    } = useElementVisible();

    return (
        <PageLayout goBackLink={ROUTES.HOME.path} className={block()}>
            <Meta title={title} />
            <Paper title={title}>
                <ButtonsToolbar justify="flex-end">
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<AddIcon />}
                        onClick={handleChangeElementVisible}
                    >
                        Добавить тему
                    </Button>
                    <Popup
                        isVisible={elementVisible}
                        onChangeVisible={handleChangeElementVisible}
                    >
                        <AddTopikForm />
                    </Popup>
                </ButtonsToolbar>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    autoHeight
                    disableColumnMenu
                    disableColumnReorder
                />
            </Paper>
        </PageLayout>
    );
});

export const ForumBoard = withCheckAuth(ForumBoardComponent);
