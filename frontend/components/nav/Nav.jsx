var React = require('react'),
    NavDrops = require('./NavDrops'),
    SignUpForm = require('../SignUpForm'),
    SearchIndex = require('../search/SearchIndex'),

    ClientActions = require('../../actions/client_actions'),
    SessionApiUtil = require('../../util/session_api_util'),
    SessionStore = require('../../stores/session');

var Nav = React.createClass({
  getInitialState: function () {
    return ({
      user: SessionStore.currentUser(),
      toggled: false,
      dropToggles: { notifications: false, friendRequests: false }
    });
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  render: function () {
    return (
      <header className='main-header'>
        <nav className='main-header-nav group'>
          <div className='nav-left group'>
            <div id='faceplace-icon'><a href="#/main">
              <i className="fa fa-facebook-official" aria-hidden="true"></i>
            </a></div>
          <SearchIndex />
          </div>
          <div id='nav-right' className='group'>
            <div id='user-icon'>
              <a onClick={this.closeForms} href={'#/users/' + SessionStore.currentUser().id}>
                {this.state.user.first_name}!
              </a>
            </div>
            <NavDrops toggleNavDrop={this.toggleNavDrop}
              dropToggles={this.state.dropToggles} />
            <button id='logout' onClick={this.logout}>Log Out</button>
          </div>
        </nav>
      </header>
    );
  },
  logout: function (e) {
    e.preventDefault();
    SessionApiUtil.logout(function () {
      this.context.router.push('/login');
    }.bind(this));
  },
  toggleNavDrop: function (drop) {
    var dropToggles = { notifications: false, friendRequests: false };
    dropToggles[drop] = true;
    this.setState({dropToggles: dropToggles});
  }
});

module.exports = Nav;
