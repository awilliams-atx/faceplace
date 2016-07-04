var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    postConstants = require('../constants/post_constants');

var _posts = [],
    _isEditing = false,
    _reactivateForm = false;

var PostStore = new Store(AppDispatcher);

PostStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case postConstants.DELETED_POST_RECEIVED:
      this.removePost(payload.post);
      PostStore.__emitChange();
      break;
    case postConstants.EDITING_FINISHED:
      _isEditing = false;
      PostStore.__emitChange();
      break;
    case postConstants.EDITING_POST:
      _isEditing = true;
      PostStore.__emitChange();
      break;
    case postConstants.OWN_POST_RECEIVED:
      this.addPost(payload.post);
      PostStore.__emitChange();
      break;
    case postConstants.POSTS_RECEIVED:
      this.setPosts(payload);
      PostStore.__emitChange();
      break;
    case postConstants.UPDATED_POST_RECEIVED:
      this.updatePost(payload.post);
      PostStore.__emitChange();
      break;
  }
};

PostStore.addPost = function (post) {
  _posts.unshift(post);
};

PostStore.all = function () {
  return _posts.slice();
};

PostStore.isEditing = function () {
  return !!_isEditing;
}

PostStore.reactivateForm = function () {
  return !!_reactivateForm;
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

window.PostStore = PostStore;
module.exports = PostStore;
