import './CommentsTree.css';

import React, { useMemo } from 'react';
import bem from 'bem-cn';
import { ForumTopicCommentProps } from '../../Forum.types';
import { mapCommentsToTree } from './CommentsTree.utils';

const block = bem('comments-tree');

interface CommentsTreeProps {
    comments: ForumTopicCommentProps[]
}

export const CommentsTree: React.FC<CommentsTreeProps> = React.memo(({
    comments,
}) => {
    const tree = useMemo(() => mapCommentsToTree(comments), [comments]);

    return (
        <div className={block()}>
            {tree}
        </div>
    );
});
