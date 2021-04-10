import { EmojiParsedProps } from 'server/models/models.types';

export const parseEmoji = (emojisJSON?: string): EmojiParsedProps => JSON.parse(emojisJSON || '{}');
