var React = require('react'),
    SessionApiUtil = require('../util/session_api_util'),
    SignUpForm = require('./SignUpForm'),
    SearchIndex = require('./search/SearchIndex'),
    SessionStore = require('../stores/session'),
    FormActions = require('../actions/form_actions'),
    FriendsOverlay = require('./nav_overlay/FriendsOverlay');

var Nav = React.createClass({
  getInitialState: function () {
    return ({
      user: SessionStore.currentUser(),
      toggled: false
    });
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  render: function () {
    var friends;
    if (this.state.toggled === 'friends') {
      friends = (
        <div className='nav-friends-toggled nav-big-three'
          id='nav-friends-toggled'>
          <FriendsOverlay />
        </div>
      );
    } else {
      friends = (
        <div className='nav-friends nav-big-three'
          onClick={this.toggleFriends}>
        </div>
      );
    }
    return (
      <header className='main-header'>
        <nav className='main-header-nav group'>
          <div className='nav-left group'>
            <div id='faceplace-icon'><a href="#/main">
              <i className="fa fa-facebook-official fa-2x" aria-hidden="true"></i>
            </a></div>
          <SearchIndex />
          </div>
          <div className='nav-right group'>
            <div id='user-icon'>
              <a onClick={this.closeForms} href={'#/users/' + SessionStore.currentUser().id}>
                {this.state.user.first_name}!
              </a>
            </div>
            {friends}
            <div className='nav-messages nav-big-three'
              onClick={this.toggleMessages}>
            </div>
            <div className='nav-notifications nav-big-three'
              onClick={this.toggleNotifications}>
            </div>
            <button onClick={this._logout}>Log Out</button>
          </div>
        </nav>
      </header>
    );
  },
  onClick: function (e) {
    FormActions.closeAll();
  },
  _logout: function (e) {
    e.preventDefault();
    SessionApiUtil.logout(function () {
      this.context.router.push('/login');
    }.bind(this));
  },
  toggleFriends: function () {
    if (this.state.toggled === 'friends') {
      this.setState({toggled: false}, function () {
        document.getElementsByTagName('body')[0]
          .removeEventListener('click', this.friendsClickListener);
      });
    } else {
      this.setState({toggled: 'friends'}, function () {
        document.getElementsByTagName('body')[0]
          .addEventListener('click', this.friendsClickListener);
      });
    }
  },
  friendsClickListener: function (e) {
    var navFriendsToggled = document.getElementById('nav-friends-toggled');
    console.log('navFriendsToggled' + navFriendsToggled);

    if (!navFriendsToggled.contains(e.target)) {
     this.toggleFriends();
    }
  }
});

module.exports = Nav;
