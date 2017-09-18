import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export default function Welcome(){
    return (
        <div id="welcome-container">
            <h1>Welcome to Discuss</h1>
            <h2>A private forum where we discuss possible business ventures</h2>
            <p>Please <Link to="/signin">sign in</Link> or <Link to="/signup">signup</Link></p>
        </div>
    )
}
