import React from 'react';
import '../style.css';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import logo from '../../images/logo.PNG';
import getConnect from '../common/connect';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isFetching: false,
      isAuthorized: false,
      emailIsSent: false,
      error: null
    };
  }
  handleChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  handleKeyPress = e => {
    if (e.keyCode === 13 || e.which === 13) {
      this.handleSubmit();
    }
  };
  handleSubmit = () => {
    this.setState({
      isFetching: true,
      isAuthorized: false,
      emailIsSent: false,
      error: null
    });
  };

  render() {
    const { email, isFetching, emailIsSent } = this.state;

    return (
      <div className="loginBox">
               <div
          className="row"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <div className="col-xs-12 col-sm-8 col-md-5 col-lg-5 col-xl-4 ">
            <div className="login-card" zDepth={1}>
              <div class="loginhead">
                <img src={logo} className="brandimg" alt=""/>
                <p> Just sign in if you have an account in here. Enjoy our Website </p>
              </div>
              <div class="logincardbody">
                <div className="loginInput">
                  <TextField
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                    label={'Email'}
                    fullWidth
                    hintStyle={{ width: '100%' }}
                    hintText={'email'}
                    variant="outlined"
                  />
                </div>
                <div className="loginInput">
                  <TextField
                    className="form-control"
                    type="password"
                    hintText="At least 8 characters"
                    label={'Password'}
                    floatingLabelText="Enter your password"
                    errorText="Your password is too short"
                    variant="outlined"
                  />
                </div>
                <div class="col-xs-12">
                  <div class="row">
                    <div class="col-xs-6">
                      <FormControl component="fieldset">
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Remember Me"
                        />
                      </FormControl>
                    </div>
                    <div class="col-xs-6">
                      <a href="/" className="forgetLink">
                        Forget Password
											</a>
                    </div>
                  </div>
                </div>
                <button
                  className="submit-btn"
                  label={'loginButton'}
                  primary
                  disabled={isFetching || emailIsSent}
                  onClick={this.handleSubmit}
                >Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default getConnect(Login);

