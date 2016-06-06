var React = require('react'),
    FriendIndexItem = require('./FriendIndexItem'),
    FriendStore = require('../../../../stores/friend');

var FriendIndex = React.createClass({
  render: function () {
    var profileOwnerId = this.props.profileOwnerId,
        friends = FriendStore.all(profileOwnerId);

    var friendIndexItems = friends.map(function (friend) {
      return <FriendIndexItem friend={friend} key={friend.userId}/>;
    });

    return (
      <section id='friends-index' className='profile-aside-item'>
        <img src={window.profile_friends_icon} className='icon'/>
        <h2>Friends</h2>
        <div id='friend-thumbs-container' className='group'>
          {friendIndexItems}
        </div>
      </section>
    );
  },
  componentDidMount: function () {
    this.friendListener = FriendStore.addListener(this.onFriendStoreChange);
  },
  componentWillUnmount: function () {
    this.friendListener.remove();
  },
  componentWillReceiveProps: function (newProps) {
    this.forceUpdate();
  },
  onFriendStoreChange: function () {
    this.forceUpdate();
  }
});

module.exports = FriendIndex;
