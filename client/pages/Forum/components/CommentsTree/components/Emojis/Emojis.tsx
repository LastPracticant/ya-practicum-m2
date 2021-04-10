import React, { useMemo } from 'react';
import { Emoji } from 'emoji-mart';
import { ForumTopicCommentProps } from '../../../../Forum.types';
import { block } from '../../CommentsTree.config';
import { parseEmoji } from './Emojis.utils';

interface EmojisProps {
    comment: ForumTopicCommentProps
}

export const Emojis: React.FC<EmojisProps> = React.memo(({
    comment,
}) => {
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
                        onClick={console.log}
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
