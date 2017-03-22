import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { editProfile } from '../../actions/index';
import cookie from 'react-cookie';


class ProfileShow extends Component {
    componentWillMount() {
        this.state = {
            userId: cookie.load('user_id'),
            username: cookie.load('username')
        }
    }

    handleSubmit(props) {
        this.props.editProfile(props);
    }

    render(){
        const { fields: {firstname, lastname, imageUrl, email }, handleSubmit } = this.props;

        return (
            <div>
                <h1>Your Profile</h1>
                <Link to="/" className="btn btn-primary">Back to Home</Link>

                <form onSubmit={handleSubmit(this.handleSubmit.bind(this))} >
                    <h3>Customize your Profile</h3>

                    <div className="row">
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" {...firstname} />
                        </div>

                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" {...lastname} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" {...email} />
                        </div>

                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Image</label>
                            <input placeholde="enter a URL" type="text" className="form-control" {...imageUrl} />
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


export default reduxForm({
    form: 'ProfileShow',
    fields: ['firstname', 'lastname', 'imageUrl', 'email']
}, null, { editProfile })(ProfileShow);
