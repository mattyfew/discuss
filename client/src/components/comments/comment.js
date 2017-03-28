import React, { Component } from 'react';
import { connect } from 'react-redux';
import { convertDate, convertTime } from '../../utils';

export default class Comment extends Component {

    render() {
        let comment = this.props;

        return(
            <article className="comment">
                <hgroup className="row">
                    <h5 className="comment-author col-xs-4">by: {comment.author_username}</h5>
                    <h5 className="comment-date col-xs-8">posted: {convertDate(comment.createdAt)} at {convertTime(comment.createdAt)}</h5>
                </hgroup>
                <p className="comment-content">{comment.content}</p>
            </article>
        )
    }
}
