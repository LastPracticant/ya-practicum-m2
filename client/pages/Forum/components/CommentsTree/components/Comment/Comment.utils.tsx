import React from 'react';
import { Emoji } from 'emoji-mart';

import { EmojiParsedProps } from 'server/models/models.types';
import { block } from '../../CommentsTree.config';

export const parseEmoji = (emojisJSON?: string) => {
    if (!emojisJSON) return;

    const emojisParsed: EmojiParsedProps = JSON.parse(emojisJSON);

    return Object.entries(emojisParsed).map(([key, users]) => (
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
};

export const formatCommentDescription = (description: string) => ` " — ${description}"`;
