import {
    ListItem, ListItemText, Typography,
} from '@material-ui/core';
import React, { MouseEvent } from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { Emoji } from 'emoji-mart';

import { LOCAL } from 'client/shared/consts';
import { FnActionProps, FnActionRequiredProps } from 'client/shared/types';
import { formatDate } from 'client/shared/utils';
import { ForumTopicCommentProps } from '../../../../Forum.types';
import { block } from '../../CommentsTree.config';

interface CommentProps {
    comment: ForumTopicCommentProps
    onAddComment: FnActionRequiredProps<number>
    onAddEmoji: FnActionProps
}

const formatCommentDescription = (description: string) => ` " — ${description}"`;

export const Comment: React.FC<CommentProps> = React.memo(({
    comment,
    onAddComment,
    onAddEmoji,
}) => {
    const handleAddComment = (parendId: number) => (
        e: MouseEvent,
    ) => {
        e.preventDefault();
        onAddComment(parendId);
    };

    const handleAddEmoji = (commentId: number) => (
        e: MouseEvent,
    ) => {
        e.preventDefault();
        console.log(commentId);
        onAddEmoji();
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
                            <a
                                onClick={handleAddComment(comment.id)}
                                href="#s"
                            >
                                {LOCAL.COMMON_PREFIXES.REPLY}
                            </a>
                            <a
                                onClick={handleAddEmoji(comment.id)}
                                href="#s"
                            >
                                <InsertEmoticonIcon />
                            </a>
                        </span>
                        <span className={block('emoji')}>
                            <Emoji
                                emoji="santa"
                                set="google"
                                size={16}
                                onClick={console.log}
                            />
                        </span>
                    </>
                )}
            />
        </ListItem>
    );
});
