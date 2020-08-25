import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { newLogin } from '../actions/index';

const CLIENT_ID = '240967084246-9nu5ovj915kv4o6a1grpre9e40h544ib.apps.googleusercontent.com';


class GoogleBtn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogined: false,
            accessToken: ''
        };

        this.login = this.login.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.logout = this.logout.bind(this);
        this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
    }

    login(response) {
        let { profileObj, accessToken } = response;
        console.log('response: ', response);
        let GoogleUser = {
            name: profileObj.name,
            imageUrl: profileObj.imageUrl,
            email: profileObj.email
        }
        this.props.createLogin(GoogleUser)
        if (accessToken) {
            this.setState(state => ({
                isLogined: true,
                accessToken: accessToken
            }));
        }
    }

    logout(response) {
        this.setState(state => ({
            isLogined: false,
            accessToken: ''
        }));
    }

    handleLoginFailure(response) {
        alert('Failed to log in')
    }

    handleLogoutFailure(response) {
        alert('Failed to log out')
    }

    render() {
        return (
            <div>
                {this.state.isLogined ?
                    <GoogleLogout
                        clientId={CLIENT_ID}
                        buttonText='Logout'
                        onLogoutSuccess={this.logout}
                        onFailure={this.handleLogoutFailure}
                    >
                    </GoogleLogout> :
                    <GoogleLogin
                        className="google-login-button"
                        clientId={CLIENT_ID}
                        buttonText='Continue with Google'
                        onSuccess={this.login}
                        cookiePolicy={'single_host_origin'}
                        responseType='code,token'
                    />
                }
                {this.state.accessToken ? this.props.history.push('/homePage') : null}

            </div>
        )
    }
}


const dispatchStateToProps = {
    createLogin: newLogin
}


export default withRouter(connect(null, dispatchStateToProps)(GoogleBtn));