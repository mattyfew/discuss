import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
    componentWillMount() {
        this.props.fetchPosts()
    }

    convertDate(isoDate) {
        let date = new Date(isoDate);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();

        if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }

        return `${year}-${month}-${dt}`
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
                                <span className="posts-categories">{post.categories}</span>
                            </div>
                            <div className="col-sm-4">
                                <span className="posts-content">{this.convertDate(post.createdAt)}</span>
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
