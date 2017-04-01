import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions/index';
import Comment from './comment';
import CommentNew from './comment_new';

class CommentsList extends Component {
    componentDidMount() {
        if (this.props.comment && this.props.comment.children){
            return console.log("testtest?");
        } else {
            this.props.fetchComments(this.props.postId)
        }
    }

    function nestComments(commentList) {
        const commentMap = {};

        // move all the comments into a map of id => comment
        commentList.forEach(comment => commentMap[comment.id] = comment);

        // iterate over the comments again and correctly nest the children
        commentList.forEach(comment => {
            if(comment.parentId !== null) {
                const parent = commentMap[comment.parentId];
                parent.children = (parent.children || []).push(comment);
            }
        });

        // filter the list to return a list of correctly nested comments
        return commentList.filter(comment => {
            return comment.parentId === null;
        });
    }

    renderComments() {
        let comments = this.props.comments.comments || this.props.comments
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
