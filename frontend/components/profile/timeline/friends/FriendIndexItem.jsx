var React = require('react');

var FriendIndexItem = React.createClass({
  render: function () {
    var friend = this.props.friend;

    return (
      <div className='friend-thumb'>
        <a href={'#/users/' + this.props.friend.userId}>
          <img src={friend.thumbUrl}/>
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
