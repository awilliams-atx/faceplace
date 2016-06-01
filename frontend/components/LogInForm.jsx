var React = require('react'),
    SessionApiUtil = require('../util/session_api_util'),
    SignUpForm = require('./SignUpForm');

var LogInForm = React.createClass({
  getInitialState: function () {
    return ({email: "", password: ""});
  },
  render: function () {
    return (
      <div>
        <form onSubmit={this._handleSubmit}>

          <label for="email">Email</label>
          <input onChange={this._emailChange}
                 value={this.state.email}
                 id="email"
          />

          <label for="password">Password</label>
          <input type="password"
                 onChange={this._passwordChange}
                 value={this.state.password}
                 id="password"
          />

          <button>Submit</button>
        </form>
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
