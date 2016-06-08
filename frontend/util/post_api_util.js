var ServerActions = require('../actions/server_actions');

var PostApiUtil = {
  fetchProfilePosts: function (userId) {
    $.ajax({
      url: 'api/users/' + userId + '/posts',
      method: 'GET',
      dataType: 'json',
      data: {profilePosts: true},
      success: function (posts) {
        ServerActions.receiveProfilePosts({
          userId: userId,
          posts: posts
        });
      },
      error: function (errors) {
        console.log('UserApiUtil#fetchProfilePosts ERROR');
      }
    });
  },
  submitPost: function (post) {
    $.ajax({
      url: 'api/posts',
      method: 'POST',
      dataType: 'json',
      data: {post: post},
      success: function (post) {
        ServerActions.receiveOwnPost(post);
      },
      error: function (errors) {
        console.log('PostApiUtil#submitPost ERROR');
      }
    });
  }
};

module.exports = PostApiUtil;
