var React = require('react'),
    PostForm = require('./PostForm'),
    PostIndexItem = require('./PostIndexItem');

var PostIndex = React.createClass({
  render: function () {
    return (
      <PostForm />
    );
  }
});

module.exports = PostIndex;
