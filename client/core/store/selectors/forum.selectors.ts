import { StoreProps } from '../store.types';

export const topicsSelector = (store: StoreProps) => store.forum.topics;
export const currentTopicSelector = (store: StoreProps) => store.forum.currentTopic;
export const commentsSelector = (store: StoreProps) => store.forum.comments;
