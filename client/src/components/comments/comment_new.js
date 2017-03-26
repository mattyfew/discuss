import React, { Component } from 'react';
import { createComment } from '../../actions/index';
import { reduxForm } from 'redux-form';
import cookie from 'react-cookie';

class CommentNew extends Component {
    constructor(){
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
        this.state = {
            userId: cookie.load('user_id'),
            username: cookie.load('username')
        }
    }

    handleSubmit(){
        let allProps = Object.assign(this.props.values, this.state, {postId: this.props.postId})
        this.props.createComment(allProps)
    }

    render(){
        const { fields: { content }, handleSubmit } = this.props;

        return (
            <form className="comment-new">
                <textarea type="text" className="comment-textarea" {...content} ></textarea>
                <button type="button" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        userId: state.userId,
        username: state.username,
        postId: state.posts.post._id
     };
}

export default reduxForm({
    form: 'CommentNew',
    fields: ['content']
}, mapStateToProps, { createComment })(CommentNew);