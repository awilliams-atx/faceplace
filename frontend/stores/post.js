var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    postConstants = require('../constants/post_constants');

var _posts = [],
    _isEditing = false;

var PostStore = new Store(AppDispatcher);

PostStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case postConstants.DELETED_POST_RECEIVED:
      PostStore.removePost(payload.post);
      PostStore.__emitChange();
      break;
    case postConstants.OWN_POST_RECEIVED:
      PostStore.addPost(payload.post);
      PostStore.__emitChange();
      break;
    case postConstants.OLD_POSTS_RECEIVED:
      PostStore.addPosts(payload.posts);
      PostStore.__emitChange();
      break;
    case postConstants.POSTS_RECEIVED:
      PostStore.setPosts(payload);
      PostStore.__emitChange();
      break;
    case postConstants.UPDATED_POST_RECEIVED:
      PostStore.updatePost(payload.post);
      PostStore.__emitChange();
      break;
  }
};

PostStore.addPost = function (post) {
  _posts.unshift(post);
};

PostStore.addPosts = function (posts) {
  _posts = _posts.concat(posts);
};

PostStore.all = function () {
  return _posts.slice();
};

PostStore.removePost = function (post) {
  var postId = post.postId;

  for (var i = 0; i < _posts.length; i++) {
    if (_posts[i].postId === postId) {
      _posts.splice(i, 1);
      return post;
    }
  }
};

PostStore.setPosts = function (payload) {
  _posts = payload.posts;
};

PostStore.updatePost = function (post) {
  for (var i = 0; i < _posts.length; i++) {
    if (_posts[i].postId === post.postId) {
      _posts[i] = post;
      return;
    }
  }
};

module.exports = PostStore;
