import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
    handleSubmit(formProps){
        this.props.signupUser(formProps)
    }

    renderAlert() {
        if (this.props.errorMessage){
            return(
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }

    render() {
        const { handleSubmit, fields: { email, username, password, passwordConfirm }} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <input className="form-control" {...email} />
                    {email.touched && email.error && <div className="error">{email.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Username:</label>
                    <input className="form-control" {...username} />
                    {username.touched && username.error && <div className="error">{username.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <input className="form-control" {...password} type="password" />
                    {password.touched && password.error && <div className="error">{password.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password:</label>
                    <input className="form-control" {...passwordConfirm} type="password" />
                    {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign Up</button>
            </form>
        )
    }
}

function validate(formProps) {
    const errors = {};

    if(!formProps.email){
        errors.email = 'Please enter an email';
    }

    if(!formProps.username){
        errors.username = 'Please enter a username';
    }

    if(!formProps.password){
        errors.password = 'Please enter a password';
    }

    if(!formProps.passwordConfirm){
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    // for(var i = 0; i < formProps.length; i++) {
    //     if (!formProps[i]){
    //         errors[i] = "Please enter a " + formProps[i]
    //     }
    // }

    if (formProps.password !== formProps.passwordConfirm){
        errors.password = "Passwords must match!";
    }

    return errors;
}

function mapStateToProps(state){
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'username', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions)(Signup);
