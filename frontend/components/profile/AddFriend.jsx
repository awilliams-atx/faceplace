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
          <button className='unfriend-button' onClick={this.onUnfriend}>
            <strong>Unfriend</strong>
          </button>
        </div>
      );
    } else if (UserStore.user().requestReceived) {
      friendshipButtonContainer = (
        <div className='friendship-button-container'>
          <button className='accept-button' onClick={this.onAccept}>
            <strong>Confirm</strong>
          </button>
          <button className='reject-request-button' onClick={this.onReject}>
            <strong>Delete Request</strong>
          </button>
        </div>
      );
    } else if (UserStore.user().requestMade) {
      friendshipButtonContainer = (
        <div className='friendship-button-container'>
          <button className='request-sent-button' onClick={this.preventDefault}>
            <img src={window.add_friend_icon} />
            <strong>Request Sent!</strong>
          </button>
          <button className='cancel-button' onClick={this.onCancel}>
            <strong>Cancel Request</strong>
          </button>
        </div>
      );
    } else {
      friendshipButtonContainer = (
        <div className='friendship-button-container'>
          <button className='add-friend-button' onClick={this.onAddFriend}>
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
    ClientActions.fetchUser(this.props.profileOwnerId);
  },
  componentWillUnmount: function () {
    this.userListener.remove();
  },
  componentWillReceiveProps: function (newProps) {
    var oldProfileOwnerId = this.props.profileOwnerId;
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
  onAccept: function (e) {
    e.preventDefault();
    ClientActions.respondToFriendRequest(this.response('accept'));
  },
  onAddFriend: function (e) {
    e.preventDefault();
    ClientActions.makeFriendRequest(this.props.profileOwnerId);
  },
  onCancel: function (e) {
    e.preventDefault();
    ClientActions.cancelFriendRequest({
      maker_id: SessionStore.currentUser().id,
      receiver_id: this.props.profileOwnerId,
      cancel: true
    });
  },
  onReject: function (e) {
    e.preventDefault();
    ClientActions.respondToFriendRequest(this.response('reject'));
  },
  onUnfriend: function (e) {
    e.preventDefault();
    ClientActions.unfriend(this.props.profileOwnerId);
  },
  preventDefault: function (e) {
    e.preventDefault();
  },
  response: function (response) {
     var params = {
       maker_id: this.props.profileOwnerId,
       receiver_id: SessionStore.currentUser().id,
     };
     params[response] = true;
    return params;
  }
});


module.exports = AddFriend;
