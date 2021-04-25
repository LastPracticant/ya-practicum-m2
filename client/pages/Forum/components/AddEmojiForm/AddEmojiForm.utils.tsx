import { EmojiData } from 'emoji-mart';
import { CommentModelProps } from 'server/models/models.types';
import { parseEmoji } from '../CommentsTree/components/Emojis/Emojis.utils';

interface ComposeEmojisToSendProps {
    emojiObject: EmojiData
    topicId?: string
    parentId?: number
    userId: number
    comments?: CommentModelProps[]
}

export const composeEmojisToSend = ({
    emojiObject,
    topicId,
    parentId,
    comments,
    userId,
}: ComposeEmojisToSendProps) => {
    if (!topicId || !parentId || !emojiObject.id) return;

    const currentComment = comments?.find((comment) => comment.id === parentId);
    const emojiSet = parseEmoji(currentComment?.emoji);

    if (emojiSet[emojiObject.id]?.includes(userId)) {
        emojiSet[emojiObject.id] = emojiSet[emojiObject.id].filter((id) => id !== userId);
    } else {
        const currentSet = emojiSet[emojiObject.id];
        emojiSet[emojiObject.id] = [
            ...(currentSet || []),
            userId,
        ];
    }

    if (!emojiSet[emojiObject.id].length) {
        delete emojiSet[emojiObject.id];
    }

    return JSON.stringify(emojiSet);
};
