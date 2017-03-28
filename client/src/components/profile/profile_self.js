import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { editProfile, fetchUser } from '../../actions/index';
import cookie from 'react-cookie';


class ProfileSelf extends Component {
    componentWillMount() {
        this.state = {
            userId: cookie.load('user_id'),
            username: cookie.load('username')
        }

        this.props.fetchUser(this.state.username)
    }

    handleSubmit(props) {
        let allProps = Object.assign(props, this.state)
        this.props.editProfile(allProps)
    }

    render(){
        const { fields: {firstname, lastname, imageUrl, email }, handleSubmit, user } = this.props


        if (!user) return (<div>Loading...</div>)
        console.log(user.firstname);

        return (
            <article className="page">
                <h2 className="page-title">Your Profile</h2>

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
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" {...email} placeholder={user.email} />
                        </div>

                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Image</label>
                            <input placeholde="enter a URL" type="text" className="form-control" {...imageUrl} placeholder={user.imageUrl} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12">
                            <img className="profile-self-img center-block" src={user.imageUrl} />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary edit-profile-submit-btn">Submit</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </form>

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
