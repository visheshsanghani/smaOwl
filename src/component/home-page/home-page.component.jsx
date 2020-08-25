import React from 'react';
import { Segment, Button, Image } from 'semantic-ui-react';
import { logOut } from '../../actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form } from 'semantic-ui-react'

import './home-page.styles.css';
class HomePage extends React.Component {
    state = {
        INR: 0,
        USD: 0,
        GBP: 0
    }
    componentDidMount() {
        if (!this.props.checkLogin.email) {
            this.props.history.push('/')
        }
    }

    loggingOut = () => {
        const { logOutUser, history } = this.props;
        logOutUser();
        history.push('/')
    }

    checkLessthanTenCents = (currenyOne, currenyTwo) => {
        if (currenyOne < 0.10 || currenyTwo < 0.10) {
            this.setState({
                LessthanTenCents: '*Currencies value less than 10 cents, is not displayed.',
                USD: '',
                GBP: ''
            })
        } else {
            this.setState({ LessthanTenCents: '' })
        }
    }

    currencyConversion = event => {
        const { name, value } = event.target;
        let decimalValue = value;
        let IN, US, UK = '';
        if (decimalValue === '') {
            this.setState({ INR: '', USD: '', GBP: '', LessthanTenCents: '' })
        } else {
            switch (name) {
                case 'INR':
                    this.setState({ INR: decimalValue })
                    US = (decimalValue / 74.93).toFixed(3);
                    UK = (decimalValue / 98.08).toFixed(3);
                    this.checkLessthanTenCents(US, UK);
                    if (US > 0.1) {
                        this.setState({ USD: US })
                    }
                    if (UK > 0.1) {
                        this.setState({ GBP: UK })
                    }
                    break;
                case 'USD':
                    this.setState({ USD: decimalValue })
                    IN = (decimalValue * 74.93).toFixed(3);
                    UK = (decimalValue * 0.76).toFixed(3);
                    this.checkLessthanTenCents(IN, UK);
                    if (IN > 0.1) {
                        this.setState({ INR: IN })
                    }
                    if (UK > 0.1) {
                        this.setState({ GBP: UK })
                    }
                    break;
                case 'GBP':
                    this.setState({ GBP: decimalValue })
                    IN = (decimalValue * 98.08).toFixed(3);
                    US = (decimalValue * 1.31).toFixed(3);
                    this.setState({ INR: IN })
                    this.setState({ USD: US })
                    break;

                default:
                    break;
            }
        }
    }

    render() {
        const customStyles = {
            backgroundStyle: {
                "background": "url(https://image.freepik.com/free-vector/elegant-white-background-with-shiny-lines_1017-17580.jpg)",
                "backgroundSize": "cover",
                "height": "100vh"
            },
            logo: {
                position: "relative",
                height: "40px",
            }
        }
        const { INR, USD, GBP, LessthanTenCents } = this.state;
        const { checkLogin } = this.props;
        return (
            <div>
                <Segment className="p-0" style={customStyles.backgroundStyle}>
                    {/* avatar component after login with google */}
                    <div style={{ background: '#c1c1c163', padding: checkLogin.name ? "1rem" : "2rem" }}>
                        {checkLogin.name
                            &&
                            <span style={{ position: "relative" }}>
                                <Image className="d-inline mr-3" circular alt="Profile_Pic" size="mini" src={checkLogin.imageUrl} />
                                <span style={{ top: 20, left: 20 }}>
                                    Hey {checkLogin.name} !
                                </span>
                            </span>
                        }
                        <span style={{ position: "absolute", top: "10px", right: "10px" }}>
                            <Button basic size="small" floated='right' onClick={() => this.loggingOut()}>
                                Sign - Out
                            </Button>
                        </span>
                    </div>

                    <div className="container">
                        <div className="row align-content-center justify-content-center" style={{ height: "80vh" }}>
                            <div className="col col-xs-10 col-md-6">

                                <div className='sign-in container card p-4' style={{ "borderRadius": "10px", "background": "rgb(255 255 255 / 82%)", "border": "2px #a2d6f396 solid", "zIndex": "1" }}>
                                    <h1 className="mb-3">Currency conversion</h1>
                                    <Form>
                                        <div className="p-8">
                                            <div className="currencyTitle">
                                                The Indian rupee (INR)
                                            </div>
                                            <Form.Input
                                                className=""
                                                name='INR'
                                                id='INR'
                                                placeholder='₹'
                                                width={8}
                                                type="number"
                                                value={INR ? INR : ''}
                                                onChange={this.currencyConversion}
                                                min="0"
                                            />
                                        </div>
                                        <div className="p-8">
                                            <div className="currencyTitle">United States Dollar (USD)</div>
                                            <Form.Input
                                                name='USD'
                                                id='USD'
                                                placeholder='$'
                                                width={8}
                                                type="number"
                                                value={USD ? USD : ''}
                                                onChange={this.currencyConversion}
                                                min="0"
                                            />
                                        </div>
                                        <div className="p-8">
                                            <div className="currencyTitle">Pound sterling (GBP)</div>
                                            <Form.Input
                                                name='GBP'
                                                id='GBP'
                                                placeholder='£'
                                                width={8}
                                                type="number"
                                                value={GBP ? GBP : ''}
                                                onChange={this.currencyConversion}
                                                min="0"
                                            />
                                        </div>
                                    </Form>
                                    <span className="shared-errorColor">{LessthanTenCents && LessthanTenCents}</span>
                                </div>
                                <div className="text-center mt-4">
                                    powered by:
                                   <br />
                                    <img style={customStyles.logo} alt="smaOwl" src="https://assets.website-files.com/5de5d00ba6a896fd7382e3e2/5e6b808ff633b217105451f9_5e54cd1e9261fb046b86aeb6_Group_2024_402x_ebc0c6cb38ca5e8101edc18471253066.png" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <img className="d-none d-sm-block" style={{ "position": "absolute", "bottom": "0px", "height": "45vh", "zIndex": "0" }} alt="wallet" src="/images/undraw_transfer_money_rywa.svg" />
                    <img className="d-none d-sm-block" style={{ "position": "absolute", "bottom": "0px", "right": "0px", "height": "45vh", "zIndex": "0" }} alt="wallet" src="/images/undraw_Savings_re_eq4w.svg" />

                </Segment>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        checkLogin: state.login
    }
}

const dispathToProps = {
    logOutUser: logOut,
}

export default withRouter(connect(mapStateToProps, dispathToProps)(HomePage));