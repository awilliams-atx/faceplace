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
    return ({user: UserStore.find(userId)});
  },
  render: function () {
    var userId = parseInt(this.props.params.userId);

    var authorizedToEdit = userId === SessionStore.currentUser().id;

    var user = this.state.user;
    var coverPhotoUrl = user ? user.coverPhotoUrl : null;

    var profile = (
      <div className='content'>
        <Nav />
        <div className='profile-sub-content'>
          <div className='cover-photo-container'>
            <CoverPhoto imageUrl={coverPhotoUrl}
              authorizedToEdit={authorizedToEdit}
              userId={userId} />
            <AddFriend userId={userId} />
          </div>
          {this.props.children}
        </div>
      </div>
    );

    return (profile);
  },
  componentDidMount: function () {
    var userId = parseInt(this.props.params.userId);

    this.userListener =
      UserStore.addListener(this.onUserStoreChange);
    ClientActions.fetchUser(userId);
  },
  componentWillUnmount: function () {
    this.userListener.remove();
  },
  componentWillReceiveProps: function (newProps) {
    var userId = newProps.params.userId;

    ClientActions.fetchUser(userId);
  },
  onUserStoreChange: function () {
    var userId = parseInt(this.props.params.userId);

    this.setState({user: UserStore.find(userId)});
  }
});

module.exports = Profile;
