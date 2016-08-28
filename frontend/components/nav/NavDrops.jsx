var React = require('react'),
    FriendRequests = require('./FriendRequests'),
    Notifications = require('./Notifications');

var NavDrops = React.createClass({
  render: function () {
    return (
      <div id='nav-drops' className='group'>
        <FriendRequests />
        <Notifications />
      </div>
    );
  }
});

module.exports = NavDrops;
