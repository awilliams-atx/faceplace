var React = require('react'),
    Nav = require('./nav/Nav');

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
