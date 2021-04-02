import './Forum.css';

import React, { useCallback, useState } from 'react';
import { PageComponentProps, UrlCommonProps } from 'client/shared/types';
import { Meta, PageLayout } from 'client/core';
import { ROUTES } from 'client/routing';
import { Paper, Popup } from 'client/shared/components';
import { useParams } from 'react-router-dom';
import { withCheckAuth } from 'client/core/HOCs';
import { useElementVisible } from 'client/core/hooks';
import { LOCAL } from 'client/shared/consts';
import { Button } from '@material-ui/core';
import { AddIcon } from '@material-ui/data-grid';
import { block } from './Forum.config';
import { COMMENTS_TREE } from './Forum.mock';
import { AddCommentForm, CommentsTree } from './components';

export const ForumTopicComponent: React.FC<PageComponentProps> = React.memo(({ title }) => {
    const params = useParams<UrlCommonProps>();

    const {
        elementVisible,
        handleChangeElementVisible,
    } = useElementVisible();

    const [commentParentId, setCommentParentId] = useState(0);

    const handleAddComment = useCallback((parendId: number) => {
        setCommentParentId(parendId);
        handleChangeElementVisible();
    }, []);

    const handleStartConversation = useCallback(() => {
        handleAddComment(0);
    }, []);

    return (
        <PageLayout goBackLink={ROUTES.FORUM.children?.BOARD.path} className={block()}>
            <Meta title={title} />
            <Paper title={title}>
                {`topic ${params.id}`}
                <hr className={block('comments-divider')} />
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={handleStartConversation}
                >
                    {LOCAL.COMMON_PREFIXES.ADD} {LOCAL.FORUM_COLUMN_COMMENT}
                </Button>
                <Popup
                    isVisible={elementVisible}
                    onChangeVisible={handleChangeElementVisible}
                    title={LOCAL.FORUM_COLUMN_COMMENT}
                >
                    <AddCommentForm parentId={commentParentId} />
                </Popup>
                <CommentsTree
                    comments={COMMENTS_TREE}
                    onAddComment={handleAddComment}
                />
            </Paper>
        </PageLayout>
    );
});

export const ForumTopic = withCheckAuth(ForumTopicComponent);
