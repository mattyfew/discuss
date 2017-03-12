import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component{
    renderLinks() {
        if(this.props.authenticated) {
            return [
                <li className="nav-item" key={2}>
                    <Link className="nav-link" to="/posts/new">New Post</Link>
                </li>
            ]
        } else {
            return [
                <li className="nav-item" key={1}>
                    <Link className="nav-link" to="/signin">Sign In</Link>
                </li>,
                <li className="nav-item" key={2}>
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
            ];
        }
    }

    render(){
        return(
            <nav className="navbar navbar-default">
                <Link to="/" className="navbar-brand">Discuss</Link>
                <ul className="nav navbar-nav">
                    {this.renderLinks()}
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item">
                        <Link className="nav-link" to="#">My Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signout">Sign Out</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

function mapStateToProps(state){
    return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(Header);
