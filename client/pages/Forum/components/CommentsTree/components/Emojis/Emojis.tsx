import React, { useCallback, useMemo } from 'react';
import { Emoji, EmojiData } from 'emoji-mart';
import { useParams } from 'react-router-dom';
import { UrlCommonProps } from 'client/shared/types';
import { useDispatch, useSelector } from 'react-redux';
import { commentsSelector, profileSelector, updateCommentThunk } from 'client/core/store';
import { parseEmoji } from './Emojis.utils';
import { block } from '../../CommentsTree.config';
import { ForumTopicCommentProps } from '../../../../Forum.types';
import { composeEmojisToSend } from '../../../AddEmojiForm/AddEmojiForm.utils';

interface EmojisProps {
    comment: ForumTopicCommentProps
}

export const Emojis: React.FC<EmojisProps> = React.memo(({
    comment,
}) => {
    const dispatch = useDispatch();
    const params = useParams<UrlCommonProps>();
    const profile = useSelector(profileSelector);
    const comments = useSelector(commentsSelector);

    const handleSetEmoji = useCallback((emojiObject: EmojiData) => {
        const topicId = params.id;

        const emoji = composeEmojisToSend({
            emojiObject,
            topicId,
            parentId: comment.id,
            comments,
            userId: profile.id,
        });

        if (!emoji || !comment.id) return;

        dispatch(updateCommentThunk({
            description: '',
            id: comment.id,
            userId: profile.id,
            topicId: Number(topicId),
            emoji,
        }));
    }, [comment]);

    const allEmoji = useMemo(() => {
        const emojisParsed = parseEmoji(comment?.emoji);

        return Object.entries(emojisParsed)
            .map(([key, users]) => (
                <span key={key} className={block('emoji')}>
                    {users.length && <span>{users.length}</span> }
                    <Emoji
                        emoji={key}
                        set="google"
                        size={16}
                        onClick={handleSetEmoji}
                    />
                </span>
            ));
    }, [comment]);

    return (
        <span className={block('all-emojis')}>
            {allEmoji}
        </span>
    );
});
