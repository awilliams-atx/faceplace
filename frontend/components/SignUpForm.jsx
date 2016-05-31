var React = require('react'),
    UserApiUtil = require('../util/UserApiUtil');

var SignUpForm = React.createClass({
  getInitialState: function () {
    return({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  },
  render: function () {
    return (
      <form onSubmit={this._handleSubmit}>

        <label for="firstName">First Name</label>
        <input onChange={this._firstNameChange}
               value={this.state.firstName}
               id="firstName"
        />

        <label for="lastName">Last Name</label>
        <input onChange={this._lastNameChange}
               value={this.state.lastName}
               id="lastName"
        />

        <label for="email">Email</label>
        <input onChange={this._emailChange}
               value={this.state.email}
               id="email"
        />

        <label for="password">New Password</label>
        <input type="password"
               onChange={this._passwordChange}
               value={this.state.password}
               id="password"
        />

        <button>Submit</button>
      </form>
    );
  },
  _firstNameChange: function (e) {
    this.setState({firstName: e.target.value});
  },
  _lastNameChange: function (e) {
    this.setState({lastName: e.target.value});
  },
  _emailChange: function (e) {
    this.setState({email: e.target.value});
  },
  _passwordChange: function (e) {
    this.setState({password: e.target.value});
  },
  _handleSubmit: function (e) {
    e.preventDefault();
    UserApiUtil.signUp({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    });
  }
});

module.exports = SignUpForm;
