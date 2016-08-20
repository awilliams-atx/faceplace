var React = require('react'),
    FriendRequests = require('./FriendRequests');

var NavDrops = function (props) {
  return (
    <div id='nav-drops' className='group'>
      <FriendRequests dropToggles={props.dropToggles}
        toggleNavDrop={props.toggleNavDrop} />
    </div>
  );
};

module.exports = NavDrops;
