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
        if (!this.props.user) return (<div>Loading...</div>)

        const { username, imageUrl, firstname, lastname } = this.props.user

        return(
            <article className="page">

                <h2 className="page-title">User Profile</h2>
                <section className="user-info row">
                    <div className="col-xs-12 col-sm-4">
                        <img src={imageUrl} />
                    </div>
                    <div className="col-xs-12 col-sm-8">
                        <h3>{username}</h3>
                        <div>{firstname} {lastname}</div>
                        <div>Recent Posts:</div>
                        <div>Recent Comments:</div>
                    </div>
                </section>

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
