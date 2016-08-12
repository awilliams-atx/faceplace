var React = require('react'),
    FriendRequests = require('./FriendRequests'),
    Notifications = require('./Notifications');

var NavDrops = function (props) {
  return (
    <div className='nav-drops group'>
      <Notifications dropToggles={props.dropToggles}
        toggleNavDrop={props.toggleNavDrop} />
      <FriendRequests dropToggles={props.dropToggles}
        toggleNavDrop={props.toggleNavDrop} />
    </div>
  );
};

module.exports = NavDrops;
