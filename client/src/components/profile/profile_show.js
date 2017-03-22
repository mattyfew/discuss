import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';


class ProfileShow extends Component {

    render(){
        return (
            <div>
                <h1>This is the profile page!!</h1>
                <Link to="/" className="btn btn-primary">Back to Home</Link>
            </div>
        )
    }

}

export default connect(null, {})(ProfileShow)
