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
    this.profileOwnerId = function () {
      return parseInt(this.props.params.userId) || SessionStore.currentUser().id
    }.bind(this)
    return ({profileOwner: UserStore.user()});
  },
  render: function () {
    var profileOwnerId = this.profileOwnerId();

    var authorizedToEdit = profileOwnerId === SessionStore.currentUser().id;

    var profileOwner = this.state.profileOwner,
        coverPhotoUrl = profileOwner ? profileOwner.coverPhotoUrl : null,
        profilePicUrl = profileOwner ? profileOwner.profilePicUrl : null;

    var profilePic;

    if (profileOwner.profilePicUrl) {
      profilePic = (
        <ProfilePic profileOwnerId={profileOwnerId}
          profilePicUrl={profilePicUrl}/>
      );
    } else {
      profilePic = <div className='empty-profile-pic'/>;
    }

    var profile = (
      <div className='content'>
        <Nav />
        <div className='profile-sub-content'>
          <div className='profile-top-content'>
            <div className='cover-photo-container'>
              <CoverPhoto coverPhotoUrl={coverPhotoUrl}
                authorizedToEdit={authorizedToEdit}
                profileOwnerId={profileOwnerId} />
              <AddFriend profileOwnerId={profileOwnerId} />
            </div>
            {profilePic}
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
    return profile;
  },
  componentDidMount: function () {
    var profileOwnerId = this.profileOwnerId();

    this.userListener =
      UserStore.addListener(this.onUserStoreChange);
    ClientActions.fetchUser(profileOwnerId);
  },
  componentWillUnmount: function () {
    this.userListener.remove();
  },
  componentWillReceiveProps: function (newProps) {
    var profileOwnerId = newProps.params.userId;

    ClientActions.fetchUser(profileOwnerId);
  },
  onUserStoreChange: function () {
    this.setState({profileOwner: UserStore.user()});
  }
});

module.exports = Profile;
