import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
    componentWillMount() {
        this.props.fetchPosts()
    }

    renderPosts() {
        // need to add author and incremented number
        return this.props.posts.map((post) => {
            return (
                <li className="list-group-item index-single-post" key={post._id}>
                    <Link to={"/posts/" + post._id}>

                        <div className="row">
                            <div className="col-sm-4">
                                <strong>{post.title}</strong>
                            </div>
                            <div className="col-sm-4">
                                <span className="">{post.categories}</span>
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
