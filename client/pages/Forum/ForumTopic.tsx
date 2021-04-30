import './Forum.css';

import React, { useCallback, useEffect, useState } from 'react';
import { PageComponentProps, UrlCommonProps } from 'client/shared/types';
import { Meta, PageLayout } from 'client/core';
import { ROUTES } from 'client/routing';
import { Paper, Popup } from 'client/shared/components';
import { useParams } from 'react-router-dom';
import { withCheckAuth } from 'client/core/HOCs';
import { useElementVisible } from 'client/core/hooks';
import { LOCAL } from 'client/shared/consts';
import { Button, Divider } from '@material-ui/core';
import { AddIcon } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import {
    commentsSelector, currentTopicSelector, getCommentsThunk, getTopicByIdThunk,
} from 'client/core/store';
import { block } from './Forum.config';
import { AddCommentForm, AddEmojiForm, CommentsTree } from './components';
import { composeCommentsArrayTree } from './Forum.utils';

export const ForumTopicComponent: React.FC<PageComponentProps> = React.memo(({ title }) => {
    const params = useParams<UrlCommonProps>();
    const comments = useSelector(commentsSelector);
    const currentTopic = useSelector(currentTopicSelector);
    const dispatch = useDispatch();

    const {
        elementVisible: commentFormVisible,
        handleChangeElementVisible: handleSetCommentFormVisible,
    } = useElementVisible();

    const {
        elementVisible: emojiFormVisible,
        handleChangeElementVisible: handleSetEmojiFormVisible,
    } = useElementVisible();

    const [commentParentId, setCommentParentId] = useState(0);

    const handleAddComment = useCallback((parendId: number) => {
        setCommentParentId(parendId);
        handleSetCommentFormVisible();
    }, []);

    const handleSetEmoji = useCallback((commentId: number) => {
        setCommentParentId(commentId);
        handleSetEmojiFormVisible();
    }, []);

    const handleStartConversation = useCallback(() => {
        handleAddComment(0);
    }, []);

    useEffect(() => {
        const topicId = Number(params.id);

        if (!topicId) return;

        dispatch(getTopicByIdThunk(topicId));
        dispatch(getCommentsThunk(topicId));
    }, [params.id]);

    return (
        <PageLayout goBackLink={ROUTES.FORUM.children?.BOARD.path} className={block()}>
            <Meta title={title} />
            <Paper title={currentTopic?.name}>
                <div>{currentTopic?.description}</div>
                <div className={block('comments-divider')}>
                    <Divider />
                </div>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={handleStartConversation}
                >
                    {LOCAL.COMMON_PREFIXES.ADD} {LOCAL.FORUM_COLUMN_COMMENT}
                </Button>
                <Popup
                    isVisible={commentFormVisible}
                    onChangeVisible={handleSetCommentFormVisible}
                    title={LOCAL.FORUM_COLUMN_COMMENT}
                >
                    <AddCommentForm
                        closeModal={handleSetCommentFormVisible}
                        topicId={params.id}
                        parentId={commentParentId}
                    />
                </Popup>
                <Popup
                    isVisible={emojiFormVisible}
                    onChangeVisible={handleSetEmojiFormVisible}
                    title={`${LOCAL.COMMON_PREFIXES.ADD} emoji`}
                >
                    <AddEmojiForm
                        closeModal={handleSetEmojiFormVisible}
                        topicId={params.id}
                        parentId={commentParentId}
                    />
                </Popup>
                <CommentsTree
                    comments={composeCommentsArrayTree(comments)}
                    onAddComment={handleAddComment}
                    onSetEmoji={handleSetEmoji}
                />
            </Paper>
        </PageLayout>
    );
});

export const ForumTopic = withCheckAuth(ForumTopicComponent);
