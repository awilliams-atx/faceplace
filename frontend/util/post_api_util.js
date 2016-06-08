var ServerActions = require('../actions/server_actions');

var PostApiUtil = {
  submitPost: function (post) {
    $.ajax({
      url: 'api/posts',
      method: 'POST',
      dataType: 'json',
      data: {post: post},
      success: function (post) {
        debugger
        ServerActions.receiveOwnPost(post);
      },
      error: function (errors) {
        console.log('PostApiUtil#submitPost ERROR');
      }
    });
  }
};

module.exports = PostApiUtil;
