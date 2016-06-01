var React = require('react'),
    SessionApiUtil = require('../util/session_api_util'),
    SignUpForm = require('./SignUpForm');

var LogInForm = React.createClass({
  getInitialState: function () {
    return ({email: "", password: ""});
  },
  render: function () {
    return (
      <div className='content'>
        <header>
          <nav className='header-nav group'>
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
                    <td><button>Log In</button></td>
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
  _emailChange: function (e) {
    this.setState({email: e.target.value});
  },
  _passwordChange: function (e) {
    this.setState({password: e.target.value});
  },
  _handleSubmit: function (e) {
    e.preventDefault();
    var credentials = {};
    credentials.email = this.state.email;
    credentials.password = this.state.password;

    SessionApiUtil.login(credentials);
  }
});

module.exports = LogInForm;
