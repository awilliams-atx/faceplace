var React = require('react'),
    AddFriend = require('./AddFriend'),
    CoverPhoto = require('./CoverPhoto'),
    Nav = require('../nav/Nav'),
    ProfilePic = require('./ProfilePic'),
    ClientActions = require('../../actions/client_actions'),
    SessionActions = require('../../actions/session_actions'),
    SessionStore = require('../../stores/session'),
    UserStore = require('../../stores/user');

var Profile = React.createClass({
  getInitialState: function () {
    console.log('Profile#getInitialState');
    return ({ user: UserStore.user() });
  },
  render: function () {
    console.log('Profile#render');
    return (
      <div className='content'>
        <Nav />
        <div className='profile-sub-content'>
          <div className='profile-top-content'>
            <div className='cover-photo-container'>
              <CoverPhoto coverPhotoUrl={this.state.user.coverPhotoUrl}
                authorizedToEdit={this.authorizedToEdit()}
                profileOwnerId={this.profileOwnerId()} />
              <AddFriend profileOwnerId={this.profileOwnerId()} />
            </div>
            <ProfilePic profileOwnerId={this.profileOwnerId()}
              profilePicUrl={this.state.user.profilePicUrl} />
            <nav className='profile-nav'>
              <div className='profile-nav-links'>
                <ul>
                  <li>
                    Timeline
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  },
  componentDidMount: function () {
    this.userListener = UserStore.addListener(this.onUserStoreChange);
    ClientActions.fetchUser(this.profileOwnerId());
  },
  componentWillUnmount: function () {
    this.userListener.remove();
  },
  componentWillReceiveProps: function (props) {
    console.log('Profile#componentWillReceiveProps');
    ClientActions.fetchUser(props.params.userId);
  },
  authorizedToEdit: function () {
    return this.profileOwnerId() === SessionStore.currentUser().id;
  },
  onUserStoreChange: function () {
    console.log('Profile#onUserStoreChange');
    this.setState({ user: UserStore.user() });
  },
  profileOwnerId: function () {
    return parseInt(this.props.params.userId);
  }
});

module.exports = Profile;
