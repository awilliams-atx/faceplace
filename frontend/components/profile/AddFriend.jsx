var React = require('react'),
    SessionStore = require('../../stores/session'),
    UserStore = require('../../stores/user'),
    ClientActions = require('../../actions/client_actions');

var AddFriend = React.createClass({
  getInitialState: function () {
    return({
      alreadyFriends: UserStore.user().alreadyFriends,
      requestMade: UserStore.user().requestMade,
      requestReceived: UserStore.user().requestReceived
    });
  },
  render: function () {
    var emptyAddFriendContainer = <div className='empty-add-friend-button'></div>,
        friendshipButtonContainer;

    if (!UserStore.profileFetched(this.props.profileOwnerId)) {
      return emptyAddFriendContainer;
    }

    if (this.props.profileOwnerId === SessionStore.currentUser().id) {
      return emptyAddFriendContainer;
    }

    if (UserStore.user().alreadyFriends) {
      friendshipButtonContainer = (
        <div className='friendship-button-container'>
          <button className='button-gray' onClick={this.onUnfriend}>
            <strong>Unfriend</strong>
          </button>
        </div>
      );
    } else if (UserStore.user().requestReceived) {
      friendshipButtonContainer = (
        <div className='friendship-button-container'>
          <button className='button-blue' onClick={this.onAccept}>
            <strong>Confirm</strong>
          </button>
          <button className='button-gray' onClick={this.onReject}>
            <strong>Delete Request</strong>
          </button>
        </div>
      );
    } else if (UserStore.user().requestMade) {
      friendshipButtonContainer = (
        <div className='friendship-button-container'>
          <button className='request-sent-button'
            onClick={this.preventDefault}>
            <img src={window.add_friend_icon} />
            <strong>Request Sent!</strong>
          </button>
          <button className='button-gray' onClick={this.onCancel}>
            <strong>Cancel Request</strong>
          </button>
        </div>
      );
    } else {
      friendshipButtonContainer = (
        <div className='friendship-button-container'>
          <button className='button-blue' onClick={this.onAddFriend}>
            <img src={window.add_friend_icon} />
            <strong>Add Friend</strong>
          </button>
        </div>
      );
    }

    return friendshipButtonContainer;
  },
  componentDidMount: function () {
    this.userListener = UserStore.addListener(this.onUserStoreChange);
  },
  componentWillUnmount: function () {
    this.userListener.remove();
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({reRender: true});
  },
  onUserStoreChange: function () {
    var user = UserStore.user();
    this.setState({
      alreadyFriends: user.alreadyFriends,
      requestMade: user.requestMade,
      requestReceived: user.requestReceived
    });
  },
  onAccept: function (user_id) {
    ClientActions.acceptFriendRequest({ maker_id: this.props.profileOwnerId });
  },
  onAddFriend: function (e) {
    e.preventDefault();
    ClientActions.makeFriendRequest(this.props.profileOwnerId);
  },
  onCancel: function (e) {
    e.preventDefault();
    ClientActions.cancelFriendRequest({
      maker_id: SessionStore.currentUser().id,
      receiver_id: this.props.profileOwnerId
    });
  },
  onReject: function (user_id) {
    ClientActions.rejectFriendRequest({ maker_id: this.props.profileOwnerId });
  },
  onUnfriend: function (e) {
    e.preventDefault();
    ClientActions.unfriend(this.props.profileOwnerId);
  },
  preventDefault: function (e) {
    e.preventDefault();
  }
});


module.exports = AddFriend;
