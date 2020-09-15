import React from 'react';
import { useSelector } from 'react-redux';

import List from '../CommentList/CommentList';

import { reduxState } from '../../interfaces/state';

import './comment.css';

function MyComment() {
    const { list } = useSelector((item: reduxState) => item.comment);

    return (
        <div className="comment">
            <List comments={list} />
        </div>
    );
}

export default MyComment;