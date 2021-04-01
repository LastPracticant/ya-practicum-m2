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
import { LOCAL } from 'client/shared/consts';
import { TOPICS } from './Forum.mock';
import { columns, block } from './Forum.config';
import { AddTopicForm } from './components';

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
                        {LOCAL.FORUM_COLUMN_TOPIC}
                    </Button>
                    <Popup
                        isVisible={elementVisible}
                        onChangeVisible={handleChangeElementVisible}
                        title={LOCAL.FORUM_COLUMN_TOPIC}
                    >
                        <AddTopicForm />
                    </Popup>
                </ButtonsToolbar>
                <DataGrid
                    rows={TOPICS}
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
