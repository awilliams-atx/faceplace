var React = require('react'),
    Nav = require('./nav/Nav');

var Main = React.createClass({
  getInitialState: function () {
    return null;
  },
  render: function () {
    return (
      <div id='main'>
        <Nav />
        <div id='main-content' className='group'>
          <aside id='left-col'>
            l
          </aside>
          <section id='feed'>
            o
          </section>
          <aside id='right-col'>
            l
          </aside>
        </div>
      </div>
    );
  }
});

module.exports = Main;
