import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions/index';
import Comment from './comment'

class CommentsList extends Component {
    componentWillMount() {
        this.props.fetchComments(this.props.postId)
    }

    render(){
        return (
            <section className="comments-section">
                <h2>Comments!</h2>

                <Comment />
                <Comment />
                <Comment />
            </section>
        )
    }
}

export default connect(null, { fetchComments })(CommentsList);
