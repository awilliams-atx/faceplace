var React = require('react'),
    FriendRequests = require('./FriendRequests'),
    Notifications = require('./Notifications');

var NavDrops = function (props) {
  return (
    <div className='nav-drops group'>
      <FriendRequests dropToggles={props.dropToggles}
        toggleNavDrop={props.toggleNavDrop} />
      <Notifications dropToggles={props.dropToggles}
        toggleNavDrop={props.toggleNavDrop} />
    </div>
  );
};

module.exports = NavDrops;
