var React = require('react'),
    SessionApiUtil = require('../util/session_api_util'),
    SignUpForm = require('./SignUpForm'),
    ErrorStore = require('../stores/error'),
    SessionStore = require('../stores/session');

var LogInForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return ({email: "", password: ""});
  },
  render: function () {
    var logInButton = <button className='login-button'>Log In</button>;
    if (this.state.email === "" && this.state.password === "") {
      logInButton = (
        <button onClick={this._guestLogin} className='login-button'>
          Guest
        </button>
      );
    }
    var omniauthButton = (
      <a href='/auth/facebook' className='login-button'>
        Log In with Facebook
      </a>
    );
    return (
      <div className='content'>
        <header className='welcome-header'>
          <nav className='welcome-header-nav group'>
            <a href="/"><img src={window.logoUrl} className='header-logo' /></a>
            <form onSubmit={this._handleSubmit}
                  className='log-in-form'>
              <table>
                <thead>
                  <tr>
                    <td>
                      <label htmlFor="email" ref='autoFocus'>Email</label>
                      </td>
                    <td><label htmlFor="password">Password</label></td>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td><input onChange={this._emailChange}
                    value={this.state.email}
                    id="email"
                    /></td>
                    <td><input type="password"
                           onChange={this._passwordChange}
                           value={this.state.password}
                           id="password"
                    /></td>
                  <td>{logInButton}</td>
                  <td>{omniauthButton}</td>
                  </tr>
                </tbody>
              </table>
            </form>
          </nav>
        </header>
        <SignUpForm />
      </div>
    );
  },
  componentDidMount: function () {
    this.setState({errors: ErrorStore.all()});
    this.refs.autoFocus.focus();
  },
  _emailChange: function (e) {
    this.setState({email: e.target.value});
  },
  _passwordChange: function (e) {
    this.setState({password: e.target.value});
  },
  _handleSubmit: function (e, options) {
    var credentials = {};
    e.preventDefault();

    if (options) {
      credentials = options.credentials;
    } else {
      credentials.email = this.state.email;
      credentials.password = this.state.password;
    }

    SessionApiUtil.login(credentials, this._redirectToTimeline);
  },
  _guestLogin: function (e) {
    var credentials = {email: 'jeff', password: 'starwars'};
    this._handleSubmit(e, {credentials: credentials});
  },
  _redirectToTimeline: function () {
    this.context.router.push('/users/' + SessionStore.currentUser().id);
  }
});

module.exports = LogInForm;
