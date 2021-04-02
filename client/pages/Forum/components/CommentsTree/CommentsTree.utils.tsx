import {
    List, ListItem, ListItemText, Typography,
} from '@material-ui/core';
import { FnActionRequiredProps } from 'client/shared/types';
import React, { MouseEvent } from 'react';
import { ForumTopicCommentProps } from '../../Forum.types';
import { block } from './CommentsTree.config';

export const mapCommentsToTree = (
    comments: ForumTopicCommentProps[],
    onAddComment: FnActionRequiredProps<number>,
) => {
    const handleAddComment = (parendId: number) => (
        e: MouseEvent,
    ) => {
        e.preventDefault();
        onAddComment(parendId);
    };

    const commentsMapped = comments.map((comment) => (
        <React.Fragment key={comment.id}>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary={comment.date}
                    secondary={(
                        <>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                            >
                                {comment.author}
                            </Typography>
                            {` " — ${comment.description}"`}
                            <div className={block('reply')}>
                                <a
                                    onClick={handleAddComment(comment.id)}
                                    href="#s"
                                >
                                    Ответить
                                </a>
                            </div>
                        </>
                    )}
                />

            </ListItem>

            {comment.children && (
                <ListItem alignItems="flex-start">
                    {mapCommentsToTree(comment.children, onAddComment)}
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
