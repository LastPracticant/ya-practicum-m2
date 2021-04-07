import arrayToTree from 'array-to-tree';
import { ForumTopicCommentProps } from './Forum.types';

export const composeCommentsArrayTree = (
    comments?: ForumTopicCommentProps[],
) => {
    if (!comments) return [];

    return arrayToTree(
        comments, {
            parentProperty: 'parentId',
        },
    );
};
