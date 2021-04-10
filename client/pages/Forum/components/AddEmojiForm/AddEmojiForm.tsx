import React from 'react';
import bem from 'bem-cn';
import '../../../../../node_modules/emoji-mart/css/emoji-mart.css';
import { EmojiData, Picker } from 'emoji-mart';
import { FnActionProps } from 'client/shared/types';
import { NivelatorXY } from 'client/shared/components';
import { useDispatch, useSelector } from 'react-redux';
import { updateCommentThunk, profileSelector, commentsSelector } from 'client/core/store';
import { parseEmoji } from '../CommentsTree/components/Emojis/Emojis.utils';

interface AddEmojiFormProps {
    closeModal: FnActionProps
    topicId?: string
    parentId?: number
}

export const block = bem('add-emoji-form');

export const AddEmojiForm: React.FC<AddEmojiFormProps> = React.memo(({
    closeModal,
    topicId,
    parentId,
}) => {
    const dispatch = useDispatch();
    const profile = useSelector(profileSelector);
    const comments = useSelector(commentsSelector);

    const handleEmojiSelect = (emojiObject: EmojiData) => {
        if (!topicId || !parentId || !emojiObject.id) return;

        const currentComment = comments?.find((comment) => comment.id === Number(topicId));
        const emojiSet = parseEmoji(currentComment?.emoji);

        if (emojiSet[emojiObject.id]?.includes(profile.id)) {
            emojiSet[emojiObject.id] = emojiSet[emojiObject.id].filter((userId) => userId !== profile.id);
        } else {
            emojiSet[emojiObject.id] = [];
            emojiSet[emojiObject.id].push(profile.id);
        }

        if (!emojiSet[emojiObject.id].length) {
            delete emojiSet[emojiObject.id];
        }

        dispatch(updateCommentThunk({
            description: '',
            id: parentId,
            userId: profile.id,
            topicId: Number(topicId),
            emoji: JSON.stringify(emojiSet),
        }));

        closeModal();
    };

    return (
        <NivelatorXY>
            <Picker
                set="google"
                onSelect={handleEmojiSelect}
                perLine={8}
                theme="dark"
                showPreview={false}
                showSkinTones={false}
            />
        </NivelatorXY>
    );
});
