import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../../actions/index';
import { Link } from 'react-router';

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

        if (!post) return (<div>Loading...</div>);

        return (
            <article className="post">
                <Link to="/" className="btn btn-primary">Back to Home</Link>
                <button
                    className="btn btn-danger pull-right"
                    onClick={this.onDeleteClick.bind(this)}>
                    Delete Post</button>
                <h3 className="post-show-title center">{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </article>
        );
    }
}

function mapStateToProps(state) {
    return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
