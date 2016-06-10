var ServerActions = require('../actions/server_actions');

var PostApiUtil = {
  deletePost: function (postId) {
    $.ajax({
      url: 'api/posts/' + postId,
      method: 'DELETE',
      dataType: 'json',
      success: function (post) {
        ServerActions.receiveDeletedPost(post);
      }
    });
  },
  fetchTimelinePosts: function (userId) {
    $.ajax({
      url: 'api/users/' + userId + '/posts',
      method: 'GET',
      dataType: 'json',
      data: {profilePosts: true},
      success: function (posts) {
        ServerActions.receiveTimelinePosts({
          userId: userId,
          posts: posts
        });
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
      }
    });
  }
};

module.exports = PostApiUtil;
