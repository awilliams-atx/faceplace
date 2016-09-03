var React = require('react'),
    Socket = require('../../lib/socket'),
    Util = require('../../util/general'),
    NavDrops = require('./NavDrops'),
    SignUpForm = require('../SignUpForm'),
    SearchIndex = require('../search/SearchIndex'),

    ClientActions = require('../../actions/client_actions'),
    SessionApiUtil = require('../../util/session_api_util'),
    SessionStore = require('../../stores/session');

var Nav = React.createClass({
  getInitialState: function () {
    return ({ user: SessionStore.currentUser() });
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  render: function () {
    return (
      <header className='main-header'>
        <nav className='main-header-nav group'>
          <div className='nav-left group'>
            <div id='faceplace-icon'>
              <a href="/main" onClick={this.pushMainRoute}>
                <i className="fa fa-facebook-official" aria-hidden="true"></i>
              </a>
            </div>
          <SearchIndex />
          </div>
          <div id='nav-right' className='group'>
            <div id='user-icon'>
              <a href={'/users/' + SessionStore.currentUser().id}
                onClick={this.pushCurrentUserRoute}>
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
  componentDidMount: function () {
    this.friendRequestSocket = new Socket('friend_requests');
    this.notificationSocket = new Socket('notifications');
  },
  logout: function (e) {
    e.preventDefault();
    SessionApiUtil.logout(function () {
      this.friendRequestSocket.unsubscribe();
      this.notificationSocket.unsubscribe();
      this.context.router.push('/login');
    }.bind(this));
  },
  pushCurrentUserRoute: function (e) {
    e.preventDefault();
    this.context.router.push(e.target.pathname);
    Util.jumpToTop();
  },
  pushMainRoute: function (e) {
    e.preventDefault();
    this.context.router.push('/main');
    Util.jumpToTop();
  }
});

module.exports = Nav;
