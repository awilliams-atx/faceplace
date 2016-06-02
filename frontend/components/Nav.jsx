var React = require('react'),
    SessionApiUtil = require('../util/session_api_util'),
    SignUpForm = require('./SignUpForm'),
    Search = require('./Search');

var Nav = React.createClass({
  render: function () {
    return (
      <nav className='main-header-nav'>
        <div id='faceplace-icon'><a href="#/main">
          <i className="fa fa-facebook-official fa-2x" aria-hidden="true"></i>
        </a></div>
        <img src={window.flag} />
        <Search />
        <div id='user-icon'>Ur In!</div>
      </nav>
    );
  }
});

module.exports = Nav;
