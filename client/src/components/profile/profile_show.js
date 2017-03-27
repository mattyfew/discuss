import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { fetchUser } from '../../actions/index';

class ProfileShow extends Component {
    componentWillMount(){
        this.props.fetchUser(this.props.params.username)
    }

    render(){
        if (!this.props.user){
            return (<div>Loading...</div>)
        }

        const { username, imageUrl, firstname, lastname } = this.props.user

        return(
            <article className="page">

                <h2 className="page-title">User Profile</h2>
                <div>Username: {username}</div>
                <div>Name: </div>
                <div>Image: whatever</div>

            </article>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { fetchUser })(ProfileShow)
