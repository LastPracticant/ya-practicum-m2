import {
    List, ListItem,
} from '@material-ui/core';
import React from 'react';

import { FnActionProps, FnActionRequiredProps } from 'client/shared/types';
import { ForumTopicCommentProps } from '../../Forum.types';
import { Comment } from './components';

export const mapCommentsToTree = (
    comments: ForumTopicCommentProps[],
    onAddComment: FnActionRequiredProps<number>,
    onSetEmoji: FnActionProps,
) => {
    const commentsMapped = comments.map((comment) => (
        <React.Fragment key={comment.id}>
            <Comment
                comment={comment}
                onAddComment={onAddComment}
                onSetEmoji={onSetEmoji}
            />

            {comment.children && (
                <ListItem alignItems="flex-start">
                    {mapCommentsToTree(comment.children, onAddComment, onSetEmoji)}
                </ListItem>
            )}
        </React.Fragment>
    ));

    return commentsMapped.length && (
        <List>
            {commentsMapped}
        </List>
    );
};
