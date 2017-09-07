import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
    handleSubmit(formProps){
        this.props.signupUser(formProps, this.state)
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
        const { handleSubmit, fields: { email, username, firstname, lastname, password, passwordConfirm }} = this.props;

        return (
            <div className="page">
                <h2 className="page-title">Sign Up</h2>
                <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                    <fieldset className="form-group row">
                        <label className="col-xs-2 col-form-label">Email:</label>
                        <div className="col-xs-7"><input className="form-control" {...email} /></div>
                        {email.touched && email.error && <div className="error">{email.error}</div>}
                    </fieldset>
                    <fieldset className="form-group row">
                        <label className="col-xs-2 col-form-label">Username:</label>
                        <div className="col-xs-7"><input className="form-control" {...username} /></div>
                        {username.touched && username.error && <div className="error">{username.error}</div>}
                    </fieldset>
                    <fieldset className="form-group row">
                        <label className="col-xs-2 col-form-label">First Name:</label>
                        <div className="col-xs-7"><input className="form-control" {...firstname} /></div>
                        {firstname.touched && firstname.error && <div className="error">{firstname.error}</div>}
                    </fieldset>
                    <fieldset className="form-group row">
                        <label className="col-xs-2 col-form-label">Last Name:</label>
                        <div className="col-xs-7"><input className="form-control" {...lastname} /></div>
                        {lastname.touched && lastname.error && <div className="error">{lastname.error}</div>}
                    </fieldset>
                    <fieldset className="form-group row">
                        <label className="col-xs-2 col-form-label">Password:</label>
                        <div className="col-xs-7"><input className="form-control" {...password} type="password" /></div>
                        {password.touched && password.error && <div className="error">{password.error}</div>}
                    </fieldset>
                    <fieldset className="form-group row">
                        <label className="col-xs-2 col-form-label">Confirm Password:</label>
                        <div className="col-xs-7"><input className="form-control" {...passwordConfirm} type="password" /></div>
                        {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
                    </fieldset>
                    {this.renderAlert()}
                    <button action="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        )
    }
}

function validate(formProps) {
    const errors = {};

    for (var key in formProps){
        if (!formProps[key]){
            errors[key] = 'Please enter a ' + key
        }
    }
    
    if (formProps.password !== formProps.passwordConfirm){
        errors.password = "Passwords must match!";
    }

    return errors;
}

function mapStateToProps(state){
    return {
        errorMessage: state.auth.error,
        user_id: state.auth.user_id,
        username: state.auth.username
    }
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'username', 'firstname', 'lastname', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions)(Signup);
