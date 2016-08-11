var React = require('react'),
    FriendRequests = require('./FriendRequests'),
    Notifications = require('./Notifications');

var NavDrops = function (props) {
  return (
    <div className='nav-drops group'>
      <Notifications dropToggles={props.dropToggles}
        toggleDrop={props.toggleDrop} />
      <FriendRequests dropToggles={props.dropToggles}
        toggleDrop={props.toggleDrop} />
    </div>
  );
};

module.exports = NavDrops;
