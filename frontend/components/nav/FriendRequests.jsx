var React = require('react'),
    FriendRequestItem = require('./friendRequestItem'),
    ClientActions = require('../../actions/client_actions'),
    FriendRequestStore = require('../../stores/friend_request.js'),
    SessionStore = require('../../stores/session.js');

var FriendRequests = React.createClass({
  getInitialState: function () {
    return { requests: [], uncheckedRequestIds: [], droppedDown: false };
  },
  render: function () {
    return (
      <div className={this.className() + ' nav-drop-icon'}
        id='requests-drop'
        onClick={this.dropDown}>
        <div className='fa-hover-box-25x25'>
          <i className="fa fa-user-plus" aria-hidden="true"></i>
          {this.renderRequestCounter()}
        </div>
        {this.renderDropDown()}
      </div>
    );
  },
  renderDropDown: function () {
    if (this.state.droppedDown) {
      return (
        <div id='nav-drop-overlay'>
          <div id='nav-drop-title'>
            <strong>Friend Requests</strong>
          </div>
          {this.renderRequests()}
        </div>
      );
    }
  },
  renderRequestCounter: function () {
    if (this.state.uncheckedRequestIds.length > 0) {
      return (
        <mark>{this.state.uncheckedRequestIds.length}</mark>
      );
    }
  },
  renderRequests: function () {
    if (this.state.requests.length === 0) {
      return (
        <div id='empty-nav-drop'>
          <aside>No friend requests</aside>
        </div>
      );
    } else {
      return this.state.requests.map(function (req, idx) {
        return (
          <FriendRequestItem
            checkedClass={this.checkedClass(req.id)}
            req={req}
            key={idx}
            onAccept={this.onAccept}
            onReject={this.onReject}
            rollUp={this.rollUp} />
        );
      }.bind(this));
    }
  },
  componentDidMount: function () {
    ClientActions.fetchFriendRequests();
    this.friendRequestListener =
      FriendRequestStore.addListener(this.onFriendRequestStoreChange);
  },
  componentWillUnmount: function () {
    this.friendRequestListener.remove();
  },
  checkedClass: function (id) {
    return FriendRequestStore.justChecked(id) ? ' unchecked-alert' : '';
  },
  className: function () {
    if (this.state.droppedDown) {
      return 'nav-drop-active';
    } else if (this.state.uncheckedRequestIds.length > 0) {
      return 'nav-drop-unchecked';
    } else {
      return 'nav-drop-inactive';
    }
  },
  dropDown: function (e) {
    if (!this.state.droppedDown) {
      this.setState({ droppedDown: true }, function () {
        this.markRequestsChecked();
        document.addEventListener('click', this.navDropClickListener);
      }.bind(this));
    } else if (!document.getElementById('nav-drop-overlay')
      .contains(e.target)) {
        this.rollUp();
    }
  },
  markRequestsChecked: function () {
    if (this.state.uncheckedRequestIds.length > 0) {
      ClientActions.markRequestsChecked(this.state.uncheckedRequestIds);
    }
  },
  navDropClickListener: function (e) {
    var navDropIcon = document.getElementById('requests-drop');
    var overlay = document.getElementById('nav-drop-overlay');
    if (!overlay.contains(e.target)
      && e.target.parentNode.parentNode !== navDropIcon) {
      this.rollUp();
    }
  },
  onAccept: function (user_id) {
    var response = this.response(user_id, 'accept');
    ClientActions.respondToFriendRequest(response);
  },
  onFriendRequestStoreChange: function () {
    this.setState({
      requests: FriendRequestStore.all(),
      uncheckedRequestIds: FriendRequestStore.uncheckedRequestIds()
    });
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
  rollUp: function () {
    this.setState({ droppedDown: false }, function () {
      document.removeEventListener('click', this.navDropClickListener);
    }.bind(this));
  }
});

module.exports = FriendRequests;
