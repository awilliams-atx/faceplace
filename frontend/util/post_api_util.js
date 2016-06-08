var ServerActions = require('../actions/server_actions');

var PostApiUtil = {
  submitPost: function (post) {
    console.log('PostApiUtil body: ' + post.body);
    $.ajax({
      url: 'api/posts',
      method: 'POST',
      dataType: 'json',
      data: {post: post},
      success: function (post) {
        ServerActions.receivePost(post);
      },
      error: function (errors) {
        console.log('PostApiUtil#submitPost ERROR');
      }
    });
  }
};

module.exports = PostApiUtil;
