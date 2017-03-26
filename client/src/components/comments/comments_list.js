import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions/index';
import Comment from './comment'

class CommentsList extends Component {
    componentDidMount() {
        this.props.fetchComments(this.props.postId)
    }

    renderComments() {
        let comments = this.props.comments
        console.log("what im workin with", comments);

        return comments.map((comment) => {
            return <Comment {...comment} />
        })
    }

    render(){

        return (
            <section className="comments-section">
                <h2>Comments!</h2>

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
