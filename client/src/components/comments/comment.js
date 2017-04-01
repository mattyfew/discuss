import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timeSince } from '../../utils';
import { Link } from 'react-router';
import CommentsList from './comments_list';
import CommentNew from './comment_new';

export default class Comment extends Component {
    constructor (props){
        super(props)
        this.state = {
            showCommentForm: false
        }
    }

    render() {
        let comment = this.props;

        return(
            <div className="comment-container">
                <article className="comment">
                    <hgroup className="row">
                        <h5 className="comment-author col-xs-2"><Link to={"/users/" + comment.author_username} >{comment.author_username}</Link></h5>
                        <h5 className="comment-date col-xs-10">submitted {timeSince(comment.createdAt)} ago</h5>
                    </hgroup>
                    <p className="comment-content">{comment.content}</p>
                    <footer className="comment-footer">
                        <button className="show-commentnew"
                            onClick={()=>{
                                this.setState({ showCommentForm: true })
                            } }>Reply</button>
                    </footer>
                </article>

                { this.state.showCommentForm &&
                    <CommentNew placeholder="please enter your reply"
                        rows="2"
                        className="reply-comment-new" />
                }

                { comment.children &&
                    <div>
                        <p>yoyo only if there are comments should I see dis</p>
                        <CommentsList comments={comment.children} />
                    </div>
                }
            </div>
        )
    }
}
