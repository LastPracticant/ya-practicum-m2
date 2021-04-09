import React from 'react';
import bem from 'bem-cn';
import '../../../../../node_modules/emoji-mart/css/emoji-mart.css';
import { EmojiData, Picker } from 'emoji-mart';
import { FnActionProps } from 'client/shared/types';
import { NivelatorXY } from 'client/shared/components';

interface AddEmojiFormProps {
    closeModal: FnActionProps
}

export const block = bem('add-emoji-form');

export const AddEmojiForm: React.FC<AddEmojiFormProps> = React.memo(({
    closeModal,
}) => {
    const handleEmojiSelect = (emojiObject: EmojiData) => {
        console.log(emojiObject);

        closeModal();
    };

    return (
        <NivelatorXY>
            <Picker
                set="google"
                onSelect={handleEmojiSelect}
                perLine={8}
            />
        </NivelatorXY>
    );
});
