import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './login-page.styles.css';
import { newLogin } from '../../actions/index';
import { Label, Button } from 'semantic-ui-react';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: ''
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

  render() {
    return (
      <div>
        <div className="text-center">
          <h1>Company Name</h1>
        </div>
        <div className='sign-in container card '>
          <h2>I already have an account</h2>
          <span>Sign in with your email and password</span>
          <div>
            <form onSubmit={this.handleSubmit}>

              <div className="form-group">
                <Label className="mb-2" color='violet' ribbon>
                  Email Address
                </Label>
                <input type="email" className="form-control" name="email" onChange={this.handleChange} id="exampleInputEmail1" placeholder="Enter email" autoComplete="off" />
              </div>
              <div className="shared-errorColor">
                {this.state.error}
              </div>
              <div className="form-group">
                <Label className="mb-2" color='violet' ribbon>
                  Password
                </Label>
                <input type="password" className="form-control" name="password" onChange={this.handleChange} id="exampleInputPassword1" placeholder="Password" />
              </div>
              <Button type="submit" color={"violet"} className="mb-2">Submit</Button>
            </form>
          </div>
          <div>
            If you do not have an account , <Link to='/register'>To Register</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newLoginCheck: state.register
  }
}

const dispatchStateToProps = {
  createLogin: newLogin
}


export default connect(mapStateToProps, dispatchStateToProps)(LoginPage);
