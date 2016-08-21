var React = require('react');

var FriendIndexItem = React.createClass({
  render: function () {
    var friend = this.props.friend;

    return (
      <div className='friend-thumb'>
        <a href={'#/users/' + this.props.friend.user_id}>
          <img src={friend.profile_pic_url}/>
          <div className='friend-thumb-name'>
            {friend.fullName}
          </div>
        </a>
      </div>
    );
  },
  componentWillReceiveProps: function () {
    this.forceUpdate();
  }
});

module.exports = FriendIndexItem;
