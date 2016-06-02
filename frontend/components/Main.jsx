var React = require('react'),
    Nav = require('./Nav');

var Main = React.createClass({
  getInitialState: function () {
    return null;
  },
  render: function () {
    return (
      <div className='content'>
        <header className='main-header'>
          <Nav />
        </header>
      </div>
    );
  }
});

module.exports = Main;
