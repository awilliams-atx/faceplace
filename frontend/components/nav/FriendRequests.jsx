var React = require('react'),
    FriendRequestItem = require('./FriendRequestItem'),
    ClientActions = require('../../actions/client_actions'),
    FriendRequestStore = require('../../stores/friend_request.js'),
    SessionStore = require('../../stores/session.js');

var FriendRequests = React.createClass({
  getInitialState: function () {
    return { requests: [] };
  },
  render: function () {
    var renderRequests = function () {
      if (this.state.requests.length === 0) {
        return (
          <div id='empty-friend-requests'>
            <aside>No friend requests</aside>
          </div>
        );
      } else {
        return this.state.requests.map(function (req, idx) {
          return (
            <FriendRequestItem
              req={req}
              key={idx}
              onAccept={this.onAccept}
              onReject={this.onReject} />
          );
        }.bind(this));
      }
    }.bind(this);

    var dropDown = function () {
      if (this.props.dropToggles['friendRequests']) {
        return (
          <div id='friend-request-overlay'>
            <div id='friend-request-overlay-title'>
              <strong>Friend Requests</strong>
            </div>
            {renderRequests()}
          </div>
        );
      }
    }.bind(this);

    var requestCounter = function () {
      if (this.state.requests.length > 0) {
        return (
          <mark>{this.state.requests.length}</mark>
        );
      }
    }.bind(this);

    return (
      <div className={this.className() + ' nav-drop-icon'}
        id='friends-drop'
        onClick={this.toggleNavDrop}>
        <div className='fa-hover-box-25x25'>
          <i className="fa fa-user-plus" aria-hidden="true"></i>
          {requestCounter()}
        </div>
        {dropDown(this.state.requests)}
      </div>
    );
  },
  componentDidMount: function () {
    ClientActions.fetchFriendRequests();
    this.friendRequestListener =
      FriendRequestStore.addListener(this.onFriendRequestStoreChange);
  },
  componentWillUnmount: function () {
    this.friendRequestListener.remove();
  },
  componentWillReceiveProps: function (props) {
    this.setState({ dropped: props.dropped });
  },
  className: function () {
    if (this.state.requests.length > 0) {
      return 'nav-drop-active';
    } else if (this.props.dropToggles['friendRequests']) {
      return 'nav-drop-active';
    } else {
      return 'nav-drop-inactive';
    }
  },
  onAccept: function (user_id) {
    var response = this.response(user_id, 'accept');
    ClientActions.respondToFriendRequest(response);
  },
  onFriendRequestStoreChange: function () {
    this.setState({ requests: FriendRequestStore.all() });
  },
  onReject: function (user_id) {
    var response = this.response(user_id, 'reject');
    ClientActions.respondToFriendRequest(response);
  },
  response: function (user_id, response) {
    var params = {
      maker_id: user_id,
      receiver_id: SessionStore.currentUser().id,
    };
    params[response] = true;
    return params;
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
