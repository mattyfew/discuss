import React, { Component } from 'react';
import { createComment } from '../../actions/index';
import { reduxForm } from 'redux-form';
import cookie from 'react-cookie';

class CommentNew extends Component {
    constructor(){
        super()
        this.state = {inputValue: ''}

        this.handleSubmit = this.handleSubmit.bind(this)
        // this.handleChange = this.handleChange.bind(this)
    }

    handleChange (propertyName, event) {
        let inputValue = this.state.inputValue;
        // inputValue[propertyName] = event.target.value;
        this.setState({inputValue: inputValue});
    }

    componentWillMount() {
        this.state = {
            userId: cookie.load('user_id'),
            username: cookie.load('username')
        }
    }

    handleSubmit(){
        let allProps = Object.assign(
            this.props.values,
            this.state, {
                postId: this.props.postId,
                parentId: this.props.parentId
            }
        );
        this.props.createComment(allProps)
    }

    render(){
        const { fields: { content }, handleSubmit } = this.props;

        return (
            <form className="comment-new">
                <textarea type="text" className="comment-textarea form-control"
                    rows={this.props.rows || 3}
                    value={this.state.inputValue}
                    {...content}
                    onChange={this.handleChange.bind(this, 'inputValue')} ></textarea>
                <button type="button" onClick={this.handleSubmit} className="btn">Submit</button>
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
