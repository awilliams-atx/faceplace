var React = require('react');
    // FriendIndexItem = require('./FriendIndexItem');

var FriendIndex = React.createClass({
  render: function () {
    return (
      <section
        className='profile-friends-container profile-aside-item'>
        <img src={window.profile_friends_icon} className='icon'/>
        <h2>Friends</h2>
      </section>
    );
  }
});

module.exports = FriendIndex;
