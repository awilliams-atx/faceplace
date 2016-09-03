var React = require('react'),
    Nav = require('./nav/Nav'),
    GlobalPostIndex = require('./posts/GlobalPostIndex'),
    ClientActions = require('../actions/client_actions');

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
            <GlobalPostIndex />
          </section>
          <aside id='right-col'>
            l
          </aside>
        </div>
      </div>
    );
  },
  componentDidMount: function () {
    ClientActions.fetchGlobalPosts();
  }
});

module.exports = Main;
