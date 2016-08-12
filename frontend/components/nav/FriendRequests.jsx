var React = require('react'),
    FriendRequestStore = require('../../stores/friend_request.js');

var FriendRequests = React.createClass({
  getInitialState: function () {
    return { friendRequests: [] };
  },
  render: function () {
    var dropDown = function () {
      if (this.props.dropToggles['friendRequests']) {
        return(
          <div>FRIEND REQUESTS</div>
        );
      }
    }.bind(this);
    return (
      <div className={this.className()}
        id='friends-drop'
        onClick={this.toggleNavDrop}>
        <i className="fa fa-user-plus" aria-hidden="true"></i>
        {dropDown()}
      </div>
    );
  },
  componentDidMount: function () {
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
    if (this.props.dropToggles['friendRequests']) {
      return 'nav-drop-active';
    } else {
      return 'nav-drop-inactive';
    }
  },
  onFriendRequestStoreChange: function () {
    this.setState({ friendRequests: FriendRequestStore.all() });
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
