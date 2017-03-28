import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/index';
import { Link } from 'react-router';
import { convertDate, convertTime } from '../../utils';

class PostsIndex extends Component {
    componentWillMount() {
        this.props.fetchPosts()
    }

    renderPosts() {
        // need to add author and incremented number
        let postsCopy = this.props.posts

        return [...postsCopy].reverse().map((post) => {
            return (
                <li className="list-group-item index-single-post" key={post._id}>
                    <Link to={"/posts/" + post._id}>

                        <h3 className="posts-post-title">{post.title}</h3>
                        <div className="row posts-post-bottom-row">

                            <div className="col-sm-4 posts-post-author">
                                by: <span className="">{post.author_username}</span>
                            </div>
                            <div className="col-sm-4">
                                <date className="posts-content">Posted: {convertDate(post.createdAt)} at {convertTime(post.createdAt)}</date>
                            </div>
                            <div className="col-sm-4">
                                <date className="posts-content">Posted: {convertDate(post.createdAt)} at {convertTime(post.createdAt)}</date>
                            </div>
                        </div>
                    </Link>
                </li>
            )
        })
    }

    render() {
        return (
            <div>
                <h2 className="page-title">Posts</h2>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { posts: state.posts.all}
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
