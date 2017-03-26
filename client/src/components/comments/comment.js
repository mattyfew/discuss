import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class Comment extends Component {
    render() {
        let comment = this.props;
        return(
            <article className="comment">
                <h5 className="comment-author">by: WILL ADD THIS!</h5>
                <h5 className="comment-date">posted at: WILL also ADD THIS!</h5>
                <p className="comment-content">{comment.content}</p>
            </article>
        )
    }

}
