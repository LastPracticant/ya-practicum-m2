import React from 'react';
import bem from 'bem-cn';
import '../../../../../node_modules/emoji-mart/css/emoji-mart.css';
import { EmojiData, Picker } from 'emoji-mart';
import { FnActionProps } from 'client/shared/types';
import { NivelatorXY } from 'client/shared/components';
import { useDispatch, useSelector } from 'react-redux';
import { updateCommentThunk, profileSelector, commentsSelector } from 'client/core/store';
import { composeEmojisToSend } from './AddEmojiForm.utils';

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
        const emoji = composeEmojisToSend({
            emojiObject,
            topicId,
            parentId,
            comments,
            userId: profile.id,
        });

        if (!emoji || !parentId) return;

        dispatch(updateCommentThunk({
            description: '',
            id: parentId,
            userId: profile.id,
            topicId: Number(topicId),
            emoji,
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
