import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { editProfile, fetchUser } from '../../actions/index';
import cookie from 'react-cookie';


class ProfileShow extends Component {
    componentWillMount() {
        this.state = {
            userId: cookie.load('user_id'),
            username: cookie.load('username')
        }

        this.props.fetchUser(this.state.userId)
    }

    handleSubmit(props) {
        let allProps = Object.assign(props, this.state)
        this.props.editProfile(allProps)
    }

    render(){
        const { fields: {firstname, lastname, imageUrl, email }, handleSubmit, user } = this.props

        if (!user) return (<div>Loading...</div>)

        return (
            <div>
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
                            <img className="center-block" src="https://s-media-cache-ak0.pinimg.com/originals/df/a5/e7/dfa5e74f6fa36341a4e0d8d1856ee48e.jpg" />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </form>

            </div>
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
}, mapStateToProps, { editProfile, fetchUser })(ProfileShow);
