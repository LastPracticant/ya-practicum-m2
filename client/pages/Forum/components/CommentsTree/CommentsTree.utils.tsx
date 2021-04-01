import {
    List, ListItem, ListItemText, Typography,
} from '@material-ui/core';
import React from 'react';
import { ForumTopicCommentProps } from '../../Forum.types';

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
