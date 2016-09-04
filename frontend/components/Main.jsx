var React = require('react'),
    LeftCol = require('./main/LeftCol'),
    RightCol = require('./main/RightCol'),
    Nav = require('./nav/Nav'),
    PostIndex = require('./posts/PostIndex'),
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
          <LeftCol />
          <section id='feed'>
            <PostIndex />
          </section>
          <RightCol />
        </div>
      </div>
    );
  },
  componentDidMount: function () {
    ClientActions.fetchPosts();
  }
});

module.exports = Main;
