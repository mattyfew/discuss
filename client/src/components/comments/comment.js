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
        console.log("in comment", comment);
        !comment.children.length ? console.log("no kids :(") : console.log("we got kids!", comment.children);

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
