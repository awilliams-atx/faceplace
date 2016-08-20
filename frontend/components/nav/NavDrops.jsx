var React = require('react'),
    FriendRequests = require('./FriendRequests');

var NavDrops = React.createClass({
  render: function () {
    return (
      <div id='nav-drops' className='group'>
        <FriendRequests dropToggles={this.props.dropToggles}
          toggleNavDrop={this.props.toggleNavDrop} />
      </div>
    );
  }
});

module.exports = NavDrops;
