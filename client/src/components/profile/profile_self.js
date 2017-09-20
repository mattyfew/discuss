import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { editProfile, fetchUser, uploadMulterImgToS3 } from '../../actions/index';
import cookie from 'react-cookie';
import axios from 'axios';


class ProfileSelf extends Component {
    constructor(props) {
        super(props)
        this.renderImgInput = this.renderImgInput.bind(this)
        this.showMulterInput = this.showMulterInput.bind(this)
        this.showUrlInput = this.showUrlInput.bind(this)
        this.uploadMulterImg = this.uploadMulterImg.bind(this)
    }

    componentWillMount() {
        this.state = {
            userId: cookie.load('user_id'),
            username: cookie.load('username'),
            showUrlInputFlag: false,
            showMulterInputFlag: false
        }
        this.props.fetchUser(this.state.username)
    }

    handleSubmit(props) {
        let allProps = Object.assign(props, this.state)
        this.props.editProfile(allProps)
        this.props.resetForm()
    }

    renderImgInput() {
        const { fields: { imageUrl }, user } = this.props

        if(this.state.showUrlInputFlag){
            return (<input placeholder="enter a URL" type="text" className="form-control" {...imageUrl} placeholder={user.imageUrl} />)
        } else if (this.state.showMulterInputFlag) {
            return (
                <div>
                    <input id="multer-upload" type="file" onChange={this.uploadMulterImg} />
                </div>
        )
        } else {
            return (<div>nothin</div>)
        }
    }

    uploadMulterImg(e) {
        const fileInput = document.getElementById('multer-upload')
        var formData = new FormData
        formData.append('file', fileInput.files[0])

        this.props.uploadMulterImgToS3(formData)
    }

    showMulterInput() {
        if (this.state.showUrlInputFlag) {
            this.setState({ showUrlInputFlag: !this.state.showUrlInputFlag})
        }
        this.setState({ showMulterInputFlag: true })
    }

    showUrlInput() {
        if (this.state.showMulterInputFlag) {
            this.setState({ showMulterInputFlag: !this.state.showMulterInputFlag})
        }
        this.setState({ showUrlInputFlag: true })
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
                    <div className="col-xs-12 col-md-3">
                        <img className="profile-self-img center-block" src={user.imageUrl} />
                    </div>

                    <div className="col-xs-12 col-md-9">
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
                                    <button onClick={() => this.showUrlInput() }>Upload a URL</button>
                                        or
                                    <button onClick={() => this.showMulterInput() }>Upload your own image</button>
                                    {this.renderImgInput()}
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
}, mapStateToProps, { editProfile, fetchUser, uploadMulterImgToS3 })(ProfileSelf);
