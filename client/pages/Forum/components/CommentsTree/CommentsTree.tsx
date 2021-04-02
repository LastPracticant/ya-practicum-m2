import './CommentsTree.css';

import React, { useMemo } from 'react';

import { LOCAL } from 'client/shared/consts';
import { FnActionRequiredProps } from 'client/shared/types';
import { ForumTopicCommentProps } from '../../Forum.types';
import { mapCommentsToTree } from './CommentsTree.utils';
import { block } from './CommentsTree.config';

interface CommentsTreeProps {
    comments: ForumTopicCommentProps[]
    onAddComment: FnActionRequiredProps<number>
}

export const CommentsTree: React.FC<CommentsTreeProps> = React.memo(({
    comments,
    onAddComment,
}) => {
    const tree = useMemo(() => mapCommentsToTree(
        comments,
        onAddComment,
    ), [comments]);

    return (
        <div className={block()}>
            {tree || (
                <div className={block('empty')}>
                    {LOCAL.FORUM_COLUMN_COMMENT_EMPTY}
                </div>
            )}
        </div>
    );
});
