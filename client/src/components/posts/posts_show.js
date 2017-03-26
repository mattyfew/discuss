import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../../actions/index';
import { Link } from 'react-router';
import convertDate from '../../utils/convertDate';

import CommentsList from '../comments/comments_list';

class PostsShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        this.props.fetchPost(this.props.params.post_id);
    }

    onDeleteClick() {
        this.props.deletePost(this.props.params.post_id)
        this.context.router.push('/')
    }

    render(){
        const { post } = this.props;
        console.log(post);

        if (!post) return (<div>Loading...</div>);

        return (
            <article className="post clearfix">
                <h2 className="post-show-title page-title">{post.title}</h2>
                <div className="row">
                    <div className="col-xs-12 col-sm-4">
                        <p>by: {post.author_username}</p>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <h6>Categories: {post.categories}</h6>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <p>Posted: {convertDate(post.createdAt)}</p>
                    </div>
                </div>

                <div className="post-main-container">
                    <p className="post-main-content">{post.content}</p>
                </div>

                <CommentsList postId={post._id} />

                <button
                    className="btn btn-danger pull-right"
                    onClick={this.onDeleteClick.bind(this)}>
                    Delete Post
                </button>
            </article>
        );
    }
}

function mapStateToProps(state) {
    return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
