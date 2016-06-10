var React = require('react'),
    AddFriend = require('./AddFriend'),
    CoverPhoto = require('./CoverPhoto'),
    Nav = require('../Nav'),
    ClientActions = require('../../actions/client_actions'),
    SessionActions = require('../../actions/session_actions'),
    SessionStore = require('../../stores/session'),
    UserStore = require('../../stores/user');

var Profile = React.createClass({
  getInitialState: function () {
    var userId = parseInt(this.props.params.userId);
    return ({user: UserStore.user()});
  },
  render: function () {
    var profileOwnerId = parseInt(this.props.params.userId);

    var authorizedToEdit = profileOwnerId === SessionStore.currentUser().id;

    var user = this.state.user,
        coverPhotoUrl = user ? user.coverPhotoUrl : null;

    var profilePic;

    if (user.profilePicUrl) {
      profilePic = <img className='profile-pic' src={user.profilePicUrl} />;
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

    return (profile);
  },
  componentDidMount: function () {
    var profileOwnerId = parseInt(this.props.params.userId);

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
    this.setState({user: UserStore.user()});
  }
});

module.exports = Profile;
