var React = require('react'),
    ProfileStore = require('../../stores/profile'),
    SessionStore = require('../../stores/session'),
    ClientActions = require('../../actions/client_actions');

var AddFriend = React.createClass({
  getInitialState: function () {
    return({
      alreadyFriends: ProfileStore.alreadyFriends(),
      requestMade: ProfileStore.requestMade(),
      requestReceived: ProfileStore.requestReceived()
    });
  },
  render: function () {
    var emptyAddFriendContainer = <div className='empty-add-friend-button'></div>,
        friendshipButtonContainer;

    if (!ProfileStore.profileFetched(this.props.profileOwnerId)) {
      return emptyAddFriendContainer;
    }

    if (this.props.profileOwnerId === SessionStore.currentUser().id) {
      return emptyAddFriendContainer;
    }

    if (ProfileStore.alreadyFriends()) {
      friendshipButtonContainer = (
        <div className='friendship-button-container'>
          <button className='unfriend-button' onClick={this.unfriendHandler}>
            <strong>Unfriend</strong>
          </button>
        </div>
      );
    } else if (ProfileStore.requestReceived()) {
      friendshipButtonContainer = (
        <div className='friendship-button-container'>
          <button className='accept-button' onClick={this.confirmHandler}>
            <strong>Confirm</strong>
          </button>
          <button className='reject-request-button' onClick={this.rejectHandler}>
            <strong>Delete Request</strong>
          </button>
        </div>
      );
    } else if (ProfileStore.requestMade()) {
      friendshipButtonContainer = (
        <div className='friendship-button-container'>
          <button className='request-sent-button' onClick={this.preventDefault}>
            <img src={window.add_friend_icon} />
            <strong>Request Sent!</strong>
          </button>
          <button className='cancel-button' onClick={this.cancelHandler}>
            <strong>Cancel Request</strong>
          </button>
        </div>
      );
    } else {
      friendshipButtonContainer = (
        <div className='friendship-button-container'>
          <button className='add-friend-button' onClick={this.addFriendHandler}>
            <img src={window.add_friend_icon} />
            <strong>Add Friend</strong>
          </button>
        </div>
      );
    }

    return friendshipButtonContainer;
  },
  componentDidMount: function () {
    this.userListener = ProfileStore.addListener(this.onProfileStoreChange);
    ClientActions.fetchUser(this.props.profileOwnerId);
  },
  componentWillUnmount: function () {
    this.userListener.remove();
  },
  componentWillReceiveProps: function (newProps) {
    var oldProfileOwnerId = this.props.profileOwnerId;
    this.setState({reRender: true});
  },
  onProfileStoreChange: function () {
    var profile = ProfileStore.profile();
    this.setState({
      alreadyFriends: profile.alreadyFriends,
      requestMade: profile.requestMade,
      requestReceived: profile.requestReceived
    });
  },
  addFriendHandler: function (e) {
    e.preventDefault();
    ClientActions.makeFriendRequest(this.props.profileOwnerId);
  },
  unfriendHandler: function (e) {
    e.preventDefault();
    ClientActions.unfriend(this.props.profileOwnerId);
  },
  confirmHandler: function (e) {
    e.preventDefault();
    ClientActions.respondToFriendRequest(this.props.profileOwnerId, 'accept');
  },
  rejectHandler: function (e) {
    e.preventDefault();
    ClientActions.respondToFriendRequest(this.props.profileOwnerId, 'reject');
  },
  cancelHandler: function (e) {
    e.preventDefault();
    ClientActions.cancelFriendRequest(this.props.profileOwnerId);
  },
  preventDefault: function (e) {
    e.preventDefault();
  }
});


module.exports = AddFriend;
