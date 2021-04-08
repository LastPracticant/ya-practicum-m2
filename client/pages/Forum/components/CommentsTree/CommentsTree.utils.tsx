import {
    List, ListItem, ListItemText, Typography,
} from '@material-ui/core';
import { LOCAL } from 'client/shared/consts';
import { FnActionRequiredProps } from 'client/shared/types';
import { formatDate } from 'client/shared/utils';
import React, { MouseEvent } from 'react';
import { ForumTopicCommentProps } from '../../Forum.types';
import { block } from './CommentsTree.config';

const formatCommentDescription = (description: string) => ` " — ${description}"`;

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
                    primary={formatDate(comment.createdAt)}
                    secondary={(
                        <>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                            >
                                {comment.user.name}
                            </Typography>
                            {formatCommentDescription(comment.description)}
                            <span className={block('reply')}>
                                <a
                                    onClick={handleAddComment(comment.id)}
                                    href="#s"
                                >
                                    {LOCAL.COMMON_PREFIXES.REPLY}
                                </a>
                            </span>
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
