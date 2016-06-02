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
    var logInButton = <button>Log In</button>;
    if (this.state.email === "" && this.state.password === "") {
      logInButton = <button onClick={this._guestLogin}>Guest</button>;
    }
    console.log("LogInForm#render");
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
                    <td><label htmlFor="email">Email</label></td>
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
  },
  _emailChange: function (e) {
    this.setState({email: e.target.value});
  },
  _passwordChange: function (e) {
    this.setState({password: e.target.value});
  },
  _handleSubmit: function (e, options) {
    var credentials;
    console.log('LogInForm#_handleSubmit');
    e.preventDefault();

    if (options) {
      credentials = options.credentials;
    } else {
      credentials.email = this.state.email;
      credentials.password = this.state.password;
    }

    SessionApiUtil.login(credentials, this._redirectToMain);
  },
  _guestLogin: function (e) {
    console.log('LogInForm#_guestLogin');
    var credentials = {};
    credentials.email = "thedude@lebowskimail.com";
    credentials.password = "starwars";
    this._handleSubmit(e, {credentials: credentials});
  },
  _redirectToMain: function () {
    this.context.router.push('/main');
  }
});

module.exports = LogInForm;
