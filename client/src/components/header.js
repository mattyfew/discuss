import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Header extends Component{
    renderNavLinks() {
        if(this.props.authenticated) {
            return [
                <li className="nav-item" key={2}>
                    <NavLink to="posts/new" activeClassName="nav-active" className="nav-link">New Post</NavLink></li>
            ]
        } else {
            return [
                <li className="nav-item" key={1}>
                    <NavLink to="/signin" activeClassName="nav-active" className="nav-link">Sign In</NavLink></li>,
                <li className="nav-item" key={2}>
                    <NavLink to="/signup" activeClassName="nav-active" className="nav-link">Sign Up</NavLink></li>
            ];
        }
    }

    render(){
        return(
            <nav className="navbar">
                <NavLink to="/" activeClassName="nav-active" className="navbar-brand">Discuss</NavLink>
                <ul className="nav navbar-nav">
                    {this.renderNavLinks()}
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item">
                        <NavLink activeClassName="nav-active" className="nav-link" to="/profile">My Profile</NavLink></li>
                    <li className="nav-item">
                        <NavLink activeClassName="nav-active" className="nav-link" to="/signout">Sign Out</NavLink></li>
                </ul>
            </nav>
        )
    }
}

function mapStateToProps(state){
    return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(Header);
