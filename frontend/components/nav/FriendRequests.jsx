var React = require('react'),
    UI = require('../../util/ui'),
    FriendRequestItem = require('./friendRequestItem'),
    ClientActions = require('../../actions/client_actions'),
    FriendRequestStore = require('../../stores/friend_request.js'),
    SessionStore = require('../../stores/session.js');

var FriendRequests = React.createClass({
  getInitialState: function () {
    return { accepted: [], droppedDown: false, pending: [] };
  },
  render: function () {
    return (
      <div className={this.className() + ' nav-drop-icon'}
        id='requests-drop'
        onClick={this.toggleDropDown}>
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
          <div className='nav-drop-title'>
            <strong>Accepted Requests</strong>
          </div>
          {this.renderAccepted()}
          <div className='nav-drop-title'>
            <strong>Friend Requests</strong>
          </div>
          {this.renderPending()}
        </div>
      );
    }
  },
  renderAccepted: function () {
    return this.state.accepted.map(function (req, idx) {
      return (
        <FriendRequestItem key={idx}
          req={req}
          rollUp={this.rollUp} />
      );
    }.bind(this));
  },
  renderRequestCounter: function () {
    if (FriendRequestStore.totalUnchecked() > 0) {
      return(<mark>{FriendRequestStore.totalUnchecked()}</mark>);
    }
  },
  renderPending: function () {
    if (this.state.pending.length === 0) {
      return (
        <div id='empty-nav-drop'>
          <aside>No new requests</aside>
        </div>
      );
    } else {
      return this.state.pending.map(function (req, idx) {
        return (
          <FriendRequestItem key={idx}
            onAccept={this.onAccept}
            onReject={this.onReject}
            req={req}
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
  className: function () {
    if (this.state.droppedDown) {
      return 'nav-drop-active';
    } else if (FriendRequestStore.totalUnchecked() > 0) {
      return 'nav-drop-unchecked';
    } else {
      return 'nav-drop-inactive';
    }
  },
  toggleDropDown: function (e) {
    if (!this.state.droppedDown) {
      this.setState({ droppedDown: true }, function () {
        UI.toggleRequestDrop(this.state.droppedDown);
        document.addEventListener('click', this.navDropClickListener);
      }.bind(this));
    } else if (!document.getElementById('nav-drop-overlay')
      .contains(e.target)) {
      this.rollUp();
    }
  },
  markRequestsChecked: function () {
    var ids = FriendRequestStore
      .allUnchecked().concat(FriendRequestStore.allNotifiedAccepted());
    ClientActions.markRequestsChecked(ids);
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
    ClientActions.acceptFriendRequest({ maker_id: user_id });
  },
  onFriendRequestStoreChange: function () {
    this.setState({
      accepted: FriendRequestStore.accepted(),
      pending: FriendRequestStore.pending()
    });
  },
  onReject: function (user_id) {
    ClientActions.rejectFriendRequest({ maker_id: user_id });
  },
  rollUp: function () {
    this.setState({ droppedDown: false }, function () {
      this.markRequestsChecked();
      UI.toggleRequestDrop(this.state.droppedDown);
      document.removeEventListener('click', this.navDropClickListener);
    }.bind(this));
  }
});

module.exports = FriendRequests;
