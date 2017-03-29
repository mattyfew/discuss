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
        postsCopy.sort(function(a,b){
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        })

        return [...postsCopy].reverse().map((post) => {
            return (
                <li className="list-group-item index-single-post" key={post._id}>

                        <h3 className="posts-post-title"><Link to={"/posts/" + post._id}>{post.title}</Link></h3>
                        <div className="row posts-post-bottom-row">

                            <div className="col-sm-4 posts-post-author">
                                by: <span className=""><Link to={"/users/" + post.author_username}>{post.author_username}</Link></span>
                            </div>
                            <div className="col-sm-4">
                                <date className="posts-content">posted: {convertDate(post.createdAt)} at {convertTime(post.createdAt)}</date>
                            </div>
                            <div className="col-sm-4">
                                <date className="posts-content">Posted: {convertDate(post.createdAt)} at {convertTime(post.createdAt)}</date>
                            </div>
                        </div>
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
