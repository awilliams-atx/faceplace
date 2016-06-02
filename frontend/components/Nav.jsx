var React = require('react'),
    SessionApiUtil = require('../util/session_api_util'),
    SignUpForm = require('./SignUpForm'),
    Search = require('./Search');

var Nav = React.createClass({
  getInitialState: function () {
    return SessionStore.currentUser();
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  render: function () {
    return (
      <nav className='main-header-nav group'>
        <div className='nav-left group'>
          <div id='faceplace-icon'><a href="/">
            <i className="fa fa-facebook-official fa-2x" aria-hidden="true"></i>
          </a></div>
          <Search />
        </div>
        <div className='nav-right group'>
          <div id='user-icon'>{this.state.first_name}!</div>
          <button onClick={this._logout}>Log Out</button>
        </div>
      </nav>
    );
  },
  _logout: function (e) {
    e.preventDefault();
    SessionApiUtil.logout(function () {
      this.context.router.push('/');
    }.bind(this));
  }
});

module.exports = Nav;
