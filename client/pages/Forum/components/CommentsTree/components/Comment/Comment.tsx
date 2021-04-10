import {
    Link,
    ListItem, ListItemText, Typography,
} from '@material-ui/core';
import React, { MouseEvent } from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import { LOCAL } from 'client/shared/consts';
import { FnActionRequiredProps } from 'client/shared/types';
import { formatDate } from 'client/shared/utils';
import { ForumTopicCommentProps } from '../../../../Forum.types';
import { block } from '../../CommentsTree.config';
import { formatCommentDescription } from './Comment.utils';
import { Emojis } from '../Emojis';

interface CommentProps {
    comment: ForumTopicCommentProps
    onAddComment: FnActionRequiredProps<number>
    onSetEmoji: FnActionRequiredProps<number>
}

export const Comment: React.FC<CommentProps> = React.memo(({
    comment,
    onAddComment,
    onSetEmoji,
}) => {
    const handleAddComment = (e: MouseEvent) => {
        e.preventDefault();
        onAddComment(comment.id);
    };

    const handleSetEmoji = (e: MouseEvent) => {
        e.preventDefault();
        onSetEmoji(comment.id);
    };

    return (
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
                            <Link
                                onClick={handleAddComment}
                                href="#s"
                            >
                                {LOCAL.COMMON_PREFIXES.REPLY}
                            </Link>
                            <Link
                                onClick={handleSetEmoji}
                                href="#s"
                            >
                                <InsertEmoticonIcon />
                            </Link>
                        </span>
                        <Emojis comment={comment} />
                    </>
                )}
            />
        </ListItem>
    );
});
