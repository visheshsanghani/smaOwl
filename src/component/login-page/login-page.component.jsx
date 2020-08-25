import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './login-page.styles.css';
import { newLogin } from '../../actions/index';
import { Label, Button } from 'semantic-ui-react';
import GoogleBtn from '../GoogleBtn';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      useEmailFlag: false,
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;
    const isAutorized = this.props.newLoginCheck.map(element => (element.email === email && element.password === password))
    if (isAutorized.includes(true)) {
      this.props.createLogin({ email, password })
      this.props.history.push('/homePage');
    }
    else {
      this.setState({ error: 'Please check your Email-Id OR password' })
    }

  };


  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value, error: '' });

  };

  componentDidMount() {
    if (this.props.login.email) {
      this.props.history.push('/homePage');
    }
  }

  render() {
    const customStyles = {
      backgroundStyle: {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",
        "height": "100vh",
        "background": "url(https://motionarray.imgix.net/preview-141192-Mi0B7jCQQ8-high_0001.jpg)",
        "backgroundSize": "cover"
      },
      logo: {
        filter: "drop-shadow(5px 10px 3px #53515142)",
        height: "60px"
      }
    }
    return (
      <div style={customStyles.backgroundStyle}>
        <div style={{ width: '50vw' }}>
          <div className='container card mt-5 p-4' style={{ "borderRadius": "10px", "background": "rgb(255 255 255 / 16%)", "border": "2px #a2d6f396 solid" }}>
            <div className="text-center mb-4">
              <div>
                <img style={customStyles.logo} alt="smaOwl" src="https://assets.website-files.com/5de5d00ba6a896fd7382e3e2/5e6b808ff633b217105451f9_5e54cd1e9261fb046b86aeb6_Group_2024_402x_ebc0c6cb38ca5e8101edc18471253066.png" />
              </div>
            </div>
            <div className="my-2">
              {
                !this.state.useEmailFlag ?
                  <div className="mb-4">
                    <div className="text-center">
                      <GoogleBtn />
                      <div className="my-2">
                        OR
                    </div>
                    </div>
                    <div className="text-center">
                      <Button onClick={() => this.setState({
                        useEmailFlag: true
                      })} className="grey basic" size="mini">
                        Use Email and Password
                      </Button>
                    </div>
                  </div>
                  :
                  <form onSubmit={this.handleSubmit}>

                    <div className="form-group">
                      <Label className="mb-2" color='yellow' ribbon>
                        Email Address
                    </Label>
                      <input type="email" className="form-control" name="email" onChange={this.handleChange} id="exampleInputEmail1" placeholder="Enter email" autoComplete="off" />
                    </div>
                    <div className="shared-errorColor">
                      {this.state.error}
                    </div>
                    <div className="form-group">
                      <Label className="mb-2" color='yellow' ribbon>
                        Password
                    </Label>
                      <input type="password" className="form-control" name="password" onChange={this.handleChange} id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <Button type="submit" color={"yellow"} className="mb-2">Submit</Button>
                    <Button className="mb-2 ml-2" onClick={() => { this.setState({ useEmailFlag: false }) }}>Cancel</Button>
                  </form>
              }
            </div>
            <div className="text-right" >
              <Link to='/register'>Signup</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newLoginCheck: state.register,
    login: state.login
  }
}

const dispatchStateToProps = {
  createLogin: newLogin
}


export default withRouter(connect(mapStateToProps, dispatchStateToProps)(LoginPage));