import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions/index';
import Comment from './comment';
import CommentNew from './comment_new';

class CommentsList extends Component {

    renderComments(comments) {
        return comments.map((comment) => {
            return (
                <Comment {...comment} key={comment._id} />
            )
        })
    }

    render(){
        const { comments } = this.props

        return (
            <section className="comments-section">
                <h2 className="comments-section-header">Comments!</h2>
                <CommentNew />

                { this.renderComments(comments) }
            </section>
        )
    }
}

export default CommentsList;
