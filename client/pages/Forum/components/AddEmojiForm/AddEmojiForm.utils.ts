import { GetAllCommentsResponseProps } from 'client/core/api';
import { EmojiData } from 'emoji-mart';
import { parseEmoji } from '../CommentsTree/components/Emojis/Emojis.utils';

interface ComposeEmojisToSendProps {
    emojiObject: EmojiData
    topicId?: string
    parentId?: number
    userId: number
    comments?: GetAllCommentsResponseProps[]
}

export const composeEmojisToSend = ({
    emojiObject,
    topicId,
    parentId,
    comments,
    userId,
}: ComposeEmojisToSendProps) => {
    const key = emojiObject.id;

    if (!topicId || !parentId || !key) return;

    const currentComment = comments?.find((comment) => comment.id === parentId);
    const emojiSet = parseEmoji(currentComment?.emoji);

    if (emojiSet[key]?.includes(userId)) {
        emojiSet[key] = emojiSet[key].filter((id) => id !== userId);
    } else {
        const currentSet = emojiSet[key];
        emojiSet[key] = [
            ...(currentSet || []),
            userId,
        ];
    }

    if (!emojiSet[key].length) {
        delete emojiSet[key];
    }

    return JSON.stringify(emojiSet);
};
