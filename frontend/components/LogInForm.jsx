var React = require('react'),
    SessionApiUtil = require('../util/session_api_util');

var LogInForm = React.createClass({
  getInitialState: function () {
    return ({username: "", password: ""});
  },
  render: function () {
    return (
      <div>
        <form onSubmit={this._handleSubmit}>

          <label for="username">Username</label>
          <input onChange={this._usernameChange}
                 value={this.state.username}
                 id="username"
          />

          <label for="password">Password</label>
          <input type="password"
                 onChange={this._passwordChange}
                 value={this.state.password}
                 id="password"
          />

          <button>Submit</button>
        </form>
      </div>
    );
  },
  _usernameChange: function (e) {
    this.setState({username: e.target.value});
  },
  _passwordChange: function (e) {
    this.setState({password: e.target.value});
  },
  _handleSubmit: function (e) {
    e.preventDefault();
    var credentials = {};
    credentials.username = this.state.username;
    credentials.password = this.state.password;
    
    SessionApiUtil.login(credentials);
  }
});

module.exports = LogInForm;
