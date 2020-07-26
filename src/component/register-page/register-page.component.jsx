import React from 'react';
import { connect } from 'react-redux';
import { createLogin } from '../../actions/index';
import { Link } from 'react-router-dom';
import { Label, Button } from 'semantic-ui-react';

class SignUp extends React.Component {
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
    const isAutorized = this.props.newLogin.map(element => (element.email === email && element.password === password))
    if (isAutorized.includes(true)) {
      this.setState({ error: 'Email - Id already registered' })
    }
    else {
      this.props.createLogin({ email: email, password: password });
      this.props.history.push('/');
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
          <h1>Company Name- SignUp</h1>
        </div>
        <div className='container card '>
          <h2>Please Sign Up</h2>
          <span>Sign up with your email and password</span>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <Label className="mt-2 mb-2" color='violet' ribbon>
                  Email Address
                </Label>
                <input type="email" className="form-control" name="email" onChange={this.handleChange} placeholder="Enter email" autoComplete="off" />
              </div>
              <div className="shared-errorColor">
                {this.state.error}
              </div>
              <div className="form-group">
                <Label className="mb-2" color='violet' ribbon>
                  Password
                </Label>
                <input type="password" className="form-control" name="password" onChange={this.handleChange} placeholder="Password" />
              </div>
              <Button type="submit" color='violet' className="mb-2">Submit</Button>
              <Link to="/"><button type="reset" className="btn btn-danger mb-2 ml-2">Cancel</button></Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const dispatchStateToProps = {
  createLogin: createLogin
}

const mapStateToProps = (state) => {
  return {
    newLogin: state.register
  }
}


export default connect(mapStateToProps, dispatchStateToProps)(SignUp);

