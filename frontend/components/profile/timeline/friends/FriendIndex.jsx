var React = require('react'),
    FriendIndexItem = require('./FriendIndexItem'),
    ClientActions = require('../../../../actions/client_actions'),
    FriendStore = require('../../../../stores/friend');

var FriendIndex = React.createClass({
  getInitialState: function () {
    console.log('FriendIndex#getInitialState');
    return { friends: [] };
  },
  render: function () {
    console.log('FriendIndex#render');
    var profileOwnerId = this.props.profileOwnerId;

    var renderFriends = function () {
      return this.state.friends.map(function (friend) {
        return <FriendIndexItem friend={friend} key={friend.user_id}/>;
      });
    }.bind(this)


    return (
      <section id='friends-index'
        className='profile-aside-item subcontent-container'>
        <img src={window.profile_friends_icon} className='icon'/>
        <h2>Friends</h2>
        <div id='friend-thumbs-container' className='group'>
          {renderFriends()}
        </div>
      </section>
    );
  },
  componentDidMount: function () {
    this.friendListener = FriendStore.addListener(this.onFriendStoreChange);
    ClientActions.fetchMostRecentlyAddedFriends(this.props.profileOwnerId);
  },
  componentWillUnmount: function () {
    this.friendListener.remove();
  },
  componentWillReceiveProps: function (newProps) {
    this.forceUpdate();
  },
  onFriendStoreChange: function () {
    console.log('FriendIndex#onFriendStoreChange');
    this.setState({ friends: FriendStore.all() });
  }
});

module.exports = FriendIndex;
