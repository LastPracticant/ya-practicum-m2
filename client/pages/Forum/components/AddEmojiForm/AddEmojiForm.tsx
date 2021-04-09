import React from 'react';
import { FnActionProps } from 'client/shared/types';

interface AddEmojiFormProps {
    closeModal: FnActionProps
}

export const AddEmojiForm: React.FC<AddEmojiFormProps> = React.memo(({
    closeModal,
}) => {
    // const [chosenEmoji, setChosenEmoji] = useState<IEmojiData>();
    console.log(closeModal);

    // const onEmojiClick = (event: MouseEvent, emojiObject: IEmojiData) => {
    //     console.log(chosenEmoji);

    //     setChosenEmoji(emojiObject);
    //     closeModal();
    // };

    return (
        <div>
            emoji
        </div>
    );
});
