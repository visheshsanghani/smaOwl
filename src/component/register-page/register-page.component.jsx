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
            <div className="text-center">
              <div>
                <img style={customStyles.logo} alt="smaOwl" src="https://assets.website-files.com/5de5d00ba6a896fd7382e3e2/5e6b808ff633b217105451f9_5e54cd1e9261fb046b86aeb6_Group_2024_402x_ebc0c6cb38ca5e8101edc18471253066.png" />
              </div>
            </div>
            <h2>Please Sign Up</h2>
            <div className="mb-2">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <Label className="mt-2 mb-2" color='yellow' ribbon>
                    Email Address
                  </Label>
                  <input type="email" className="form-control" name="email" onChange={this.handleChange} placeholder="Enter email" autoComplete="off" />
                </div>
                <div className="shared-errorColor">
                  {this.state.error}
                </div>
                <div className="form-group">
                  <Label className="mb-2" color='yellow' ribbon>
                    Password
                  </Label>
                  <input type="password" className="form-control" name="password" onChange={this.handleChange} placeholder="Password" />
                </div>
                <Button type="submit" color='yellow' className="mb-2">Submit</Button>
                <Link to="/"><Button className="mb-2 ml-2">Cancel</Button></Link>
              </form>
            </div>
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