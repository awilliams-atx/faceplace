var React = require('react'),
    friendRequestItem = require('./friendRequestItem'),
    ClientActions = require('../../actions/client_actions'),
    FriendRequestStore = require('../../stores/friend_request.js'),
    SessionStore = require('../../stores/session.js');

var FriendRequests = React.createClass({
  getInitialState: function () {
    return { requests: [] };
  },
  render: function () {
    var dropDown = function () {
      if (this.props.dropToggles['friendRequests']) {
        return (
          <div id='friend-request-overlay'>
            <div id='friend-request-overlay-title'>
              <strong>Friend Requests</strong>
            </div>
            {
              this.state.requests.map(function (req, idx) {
                return friendRequestItem(req, idx);
              })
            }
          </div>
        );
      }
    }.bind(this);
    return (
      <div className={this.className()}
        id='friends-drop'
        onClick={this.toggleNavDrop}>
        <i className="fa fa-user-plus" aria-hidden="true"></i>
        {dropDown(this.state.requests)}
      </div>
    );
  },
  componentDidMount: function () {
    ClientActions.fetchFriendRequests();
    this.friendRequestListener =
      FriendRequestStore.addListener(this.onFriendRequestStoreChange);
    this.pusherSubscribe();
  },
  componentWillUnmount: function () {
    this.friendRequestListener.remove();
    this.pusher.unsubscribe('friend_requests_' + SessionStore.currentUser().id);
  },
  componentWillReceiveProps: function (props) {
    this.setState({ dropped: props.dropped });
  },
  className: function () {
    if (this.props.dropToggles['friendRequests']) {
      return 'nav-drop-active';
    } else {
      return 'nav-drop-inactive';
    }
  },
  onFriendRequestStoreChange: function () {
    this.setState({ requests: FriendRequestStore.all() });
  },
  pusherSubscribe: function () {
    this.pusher = new Pusher('3d702a0663f5bd8c69dd', {
      encrypted: true
    });
    var channel = this.pusher.subscribe('friend_requests_' + SessionStore.currentUser().id);
    channel.bind('friend_request_received', ClientActions.fetchFriendRequests);
  },
  toggleNavDrop: function () {
    this.props.toggleNavDrop('friendRequests');
    var body = document.getElementsByTagName('body')[0];
    this.navDropClickListener = function (e) {
      var friendsDrop = document.getElementById('friends-drop');
      if (!friendsDrop.contains(e.target)) {
        this.props.toggleNavDrop('null');
        body.removeEventListener('click', this.navDropClickListener);
      }
    }.bind(this);
    body.addEventListener('click', this.navDropClickListener);
  }
});

module.exports = FriendRequests;
