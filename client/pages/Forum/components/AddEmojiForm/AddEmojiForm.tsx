import React from 'react';
import bem from 'bem-cn';
import '../../../../../node_modules/emoji-mart/css/emoji-mart.css';
import { EmojiData, Picker } from 'emoji-mart';
import { FnActionProps } from 'client/shared/types';
import { NivelatorXY } from 'client/shared/components';
import { useDispatch, useSelector } from 'react-redux';
import { addEmojiThunk, profileSelector } from 'client/core/store';

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

    const handleEmojiSelect = (emojiObject: EmojiData) => {
        if (!topicId || !parentId || !emojiObject.id) return;

        const userEmoji = JSON.stringify({
            [emojiObject.id]: 1,
        });

        dispatch(
            addEmojiThunk(
                {
                    commentId: parentId,
                    userId: profile.id,
                    userEmoji,
                },
                Number(topicId),
            ),
        );

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
