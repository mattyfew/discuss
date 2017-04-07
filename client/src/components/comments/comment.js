import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timeSince } from '../../utils';
import { Link } from 'react-router';
import CommentsList from './comments_list';
import CommentNew from './comment_new';
import { fetchComments } from '../../actions/index';

class Comment extends Component {
    constructor (props){
        super(props)
        this.state = { showCommentForm: false }
    }

    render() {
        const comment = this.props;
        let nestedComments = []
        console.log("outside of map", comment);

        if(comment.children != []){
            nestedComments = (comment.children || []).map(comment => {
                console.log("child", comment);
                return (
                    <div className="child">
                        <Comment {...comment} key={comment._id} />
                    </div>
                )
            });

        } else {
            return <div>nothing</div>
        }

        return(
            <div className="comment-container">
                <article className="comment">
                    <hgroup className="row">
                        <h5 className="comment-author col-xs-2"><Link to={"/users/" + comment.author.username} >{comment.author.username}</Link></h5>
                        <h5 className="comment-date col-xs-10">submitted {timeSince(comment.createdAt)} ago</h5>
                    </hgroup>
                    <p className="comment-content">{comment.content}</p>
                    <footer className="comment-footer">
                        <button className="show-commentnew"
                            onClick={()=>{
                                this.setState({ showCommentForm: true })
                            } }>Reply</button>
                    </footer>
                    { nestedComments }
                </article>

                { this.state.showCommentForm &&
                    <div className="reply-comment-new">
                        <CommentNew
                            rows="2"
                            parentId={comment._id} />
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        // post: state.posts.post,
        comments: state.comments.all
    };
}

export default connect(mapStateToProps, { fetchComments })(Comment);
