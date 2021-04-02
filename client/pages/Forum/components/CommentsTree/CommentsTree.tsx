import './CommentsTree.css';

import React, { useMemo } from 'react';

import { ForumTopicCommentProps } from '../../Forum.types';
import { mapCommentsToTree } from './CommentsTree.utils';
import { block } from './CommentsTree.config';

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
