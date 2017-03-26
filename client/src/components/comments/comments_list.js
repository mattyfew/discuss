import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions/index';
import Comment from './comment';
import CommentNew from './comment_new';

class CommentsList extends Component {
    componentDidMount() {
        this.props.fetchComments(this.props.postId)
    }

    renderComments() {
        let comments = this.props.comments
        return comments.map((comment) => {
            return (
                <Comment {...comment} key={comment._id} />
            )
        })
    }

    render(){

        return (
            <section className="comments-section">
                <h2 className="comments-section-header">Comments!</h2>
                <CommentNew />

                {this.renderComments()}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        post: state.posts.post,
        comments: state.comments.all
    };
}

export default connect(mapStateToProps, { fetchComments })(CommentsList);
