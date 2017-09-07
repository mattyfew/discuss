import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timeSince } from '../../utils';
import { Link } from 'react-router';
import CommentsList from './comments_list';
import CommentNew from './comment_new';
import { fetchComments } from '../../actions/index';

class Comment extends Component {
    constructor (){
        super()
        this.state = { showCommentForm: false }
    }

    render() {
        const comment = this.props;
        let showCommentForm = this.state.showCommentForm

        console.log(comment);

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
                                showCommentForm = !showCommentForm
                                this.setState({showCommentForm})
                            } }>Reply</button>
                    </footer>
                </article>

                { showCommentForm &&
                    <div className="reply-comment-new">
                        <CommentNew
                            rows="2"
                            parentCommentId={comment._id} />
                    </div>
                }
            </div>
        )
    }
}

export default Comment;
