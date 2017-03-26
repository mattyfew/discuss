import React, { Component } from 'react';
import { connect } from 'react-redux';
import newId from '../../utils/newid'

export default class Comment extends Component {

    render() {
        let comment = this.props;

        return(
            <article className="comment">
                <hgroup className="row">
                    <h5 className="comment-author col-xs-4">by: WILL ADD THIS!</h5>
                    <h5 className="comment-date col-xs-8">posted at: WILL also ADD THIS!</h5>
                </hgroup>
                <p className="comment-content">{comment.content}</p>
            </article>
        )
    }

}
