import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { editProfile, fetchUser } from '../../actions/index';
import cookie from 'react-cookie';


class ProfileSelf extends Component {
    constructor(props) {
        super(props)
        this.resetFields = this.resetFields.bind(this)
    }

    componentWillMount() {
        this.state = {
            userId: cookie.load('user_id'),
            username: cookie.load('username')
        }

        this.props.fetchUser(this.state.username)
    }

    handleSubmit(props) {
        console.log("ProfileSelf handleSubmit running", props)
        let allProps = Object.assign(props, this.state)
        this.props.editProfile(allProps)
        this.props.resetForm()

    }

    resetFields() {
        console.log("fields", this.props.fields);
        if (this.props.fields){
            for (var key in this.props.fields) {
                this.props.fields[key].value = ''
            }
        }
    }

    render(){
        const { fields: {
            firstname, lastname, imageUrl, email
        }, handleSubmit, user } = this.props


        if (!user) return (<div>Loading...</div>)

        return (
            <article className="page">
                <h2 className="page-title">Your Profile</h2>

                <div className="row">
                    <div className="col-xs-12 col-sm-3">
                        <img className="profile-self-img center-block" src={user.imageUrl} />
                    </div>

                    <div className="col-xs-12 col-sm-9">
                        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))} >

                            <div className="row">
                                <div className="col-xs-12 col-sm-6 form-group">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" {...firstname} placeholder={user.firstname}/>
                                </div>

                                <div className="col-xs-12 col-sm-6 form-group">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" {...lastname} placeholder={user.lastname} />
                                </div>

                                <div className="col-xs-12 col-sm-6 form-group">
                                    <label>Email</label>
                                    <input type="text" className="form-control" {...email} placeholder={user.email} />
                                </div>

                                <div className="col-xs-12 col-sm-6 form-group">
                                    <label>Image</label>
                                    <input placeholde="enter a URL" type="text" className="form-control" {...imageUrl} placeholder={user.imageUrl} />
                                </div>

                                <button type="submit" className="btn pull-right btn-primary edit-profile-submit-btn">Submit</button>
                                <Link to="/" className="btn pull-right btn-danger">Cancel</Link>
                            </div>

                        </form>
                    </div>
                </div>
            </article>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.auth.user
    }
}

export default reduxForm({
    form: 'ProfileShow',
    fields: ['firstname', 'lastname', 'imageUrl', 'email']
}, mapStateToProps, { editProfile, fetchUser })(ProfileSelf);
