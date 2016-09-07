var ServerActions = require('../actions/server_actions');

var PostApiUtil = {
  deletePost: function (postId) {
    $.ajax({
      url: '/api/posts/' + postId,
      method: 'DELETE',
      dataType: 'json',
      success: function (post) {
        ServerActions.receiveDeletedPost(post);
      }
    });
  },
  fetchMorePosts: function (userId, offset) {
    var url = '/api/posts/';
    if (userId !== undefined) { url = '/api/users/' + userId + '/posts/' }
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      data: { offset: offset },
      success: function (posts) {
        ServerActions.receiveMorePosts(posts);
      }
    });
  },
  fetchPosts: function (userId) {
    var url = '/api/posts';
    if (userId !== undefined) { url = '/api/users/' + userId + '/posts' }
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      success: function (posts) {
        ServerActions.receivePosts(posts);
      }
    });
  },
  fetchTaggedFriends: function (postId) {
    $.ajax({
      url: '/api/posts/' + postId + '/tagged_friends',
      method: 'GET',
      dataType: 'json',
      success: function (friends) {
        ServerActions.receiveTaggedFriends(friends);
      }
    });
  },
  submitPost: function (post) {
    $.ajax({
      url: '/api/posts',
      method: 'POST',
      contentType: false,
      dataType: 'json',
      data: post,
      processData: false,
      success: function (post) {
        ServerActions.receiveOwnPost(post);
      }
    });
  },
  updatePost: function (post) {
    $.ajax({
      url: '/api/posts/' + post.id,
      method: 'PUT',
      dataType: 'json',
      data: {post: post},
      success: function (post) {
        ServerActions.receiveUpdatedPost(post);
      }
    })
  }
};

module.exports = PostApiUtil;
