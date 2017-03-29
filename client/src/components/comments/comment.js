import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timeSince } from '../../utils';
import { Link } from 'react-router';

export default class Comment extends Component {

    render() {
        let comment = this.props;

        return(
            <article className="comment">
                <hgroup className="row">
                    <h5 className="comment-author col-xs-2">by: <Link to={"/users/" + comment.author_username} >{comment.author_username}</Link></h5>
                    <h5 className="comment-date col-xs-10">submitted {timeSince(comment.createdAt)} ago</h5>
                </hgroup>
                <p className="comment-content">{comment.content}</p>
                <footer className="comment-footer">
                    Reply.....Share
                </footer>
            </article>
        )
    }
}
