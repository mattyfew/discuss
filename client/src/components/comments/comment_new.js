import React, { Component } from 'react';
import { createComment } from '../../actions/index';
import { reduxForm } from 'redux-form';
import cookie from 'react-cookie';

class CommentNew extends Component {
    constructor(){
        super();
        this.state = {inputValue: ''}

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange () {
        this.setState({inputValue: this.inputValue.refs.input.value});
    }

    componentWillMount() {
        this.state = {
            userId: cookie.load('user_id'),
            username: cookie.load('username')
        }
    }

    handleSubmit(){
        const allProps = Object.assign( {}, this.state, {
                postId: this.props.postId,
                parentId: this.props.parentId
            }
        );
        this.props.createComment(allProps);
    }

    render(){
        const { fields: { content }, handleSubmit } = this.props;

        return (
            <form className="comment-new">
                <TextArea
                    ref={ component => this.inputValue = component }
                    handleChange={this.handleChange} />
                <div>Checker: {this.state.inputValue}</div>
                <button type="button" onClick={this.handleSubmit} className="btn">Submit</button>
            </form>
        )
    }
}

class TextArea extends Component {
    render(){
        return (
            <textarea type="text" className="comment-textarea form-control"
                onChange={this.props.handleChange}
                ref="input"
                rows={this.props.rows || 3} />
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
