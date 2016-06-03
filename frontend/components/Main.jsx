var React = require('react'),
    Nav = require('./Nav');

var Main = React.createClass({
  getInitialState: function () {
    return null;
  },
  render: function () {
    return (
      <div className='content'>
        <Nav />
      </div>
    );
  }
});

module.exports = Main;
