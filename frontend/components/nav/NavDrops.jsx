var React = require('react'),
    FriendRequests = require('./FriendRequests'),
    Notifications = require('./Notifications');

var NavDrops = React.createClass({
  render: function () {
    return (
      <div id='nav-drops' className='group'>
        <FriendRequests dropToggles={this.props.dropToggles}
          toggleNavDrop={this.props.toggleNavDrop} />
        <Notifications dropToggles={this.props.dropToggles}
          toggleNavDrop={this.props.toggleNavDrop} />
      </div>
    );
  }
});

module.exports = NavDrops;
