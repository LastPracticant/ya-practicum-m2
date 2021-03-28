import './Forum.css';

import React from 'react';
import { PageComponentProps, UrlCommonProps } from 'client/shared/types';
import { Meta, PageLayout } from 'client/core';
import { ROUTES } from 'client/routing';
import { Paper } from 'client/shared/components';
import { useParams } from 'react-router-dom';
import { withCheckAuth } from 'client/core/HOCs';
import { block } from './Forum.config';

export const ForumTopicComponent: React.FC<PageComponentProps> = ({ title }) => {
    const params = useParams<UrlCommonProps>();

    return (
        <PageLayout goBackLink={ROUTES.FORUM.children?.BOARD.path} className={block()}>
            <Meta title={title} />
            <Paper title={title}>
                {`topic ${params.id}`}
            </Paper>
        </PageLayout>
    );
};

export const ForumTopic = withCheckAuth(ForumTopicComponent);
