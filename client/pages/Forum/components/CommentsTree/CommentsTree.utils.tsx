import {
    List, ListItem, ListItemText, Typography,
} from '@material-ui/core';
import React from 'react';
import { ForumTopicCommentProps } from '../../Forum.types';
import { block } from './CommentsTree.config';

export const mapCommentsToTree = (
    comments: ForumTopicCommentProps[],
) => {
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
                                <a href="#s">Ответить</a>
                            </div>
                        </>
                    )}
                />

            </ListItem>

            {comment.children && (
                <ListItem alignItems="flex-start">
                    {mapCommentsToTree(comment.children)}
                </ListItem>
            )}
        </React.Fragment>
    ));

    return (
        <List>
            {commentsMapped}
        </List>
    );
};
