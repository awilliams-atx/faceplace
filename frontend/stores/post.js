var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    postConstants = require('../constants/post_constants');

var _posts = [];

var PostStore = new Store(AppDispatcher);

PostStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case postConstants.DELETED_POST_RECEIVED:
      this.removePost(payload.post);
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
  }
};

PostStore.addPost = function (post) {
  _posts.push(post);
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

window.PostStore = PostStore;
module.exports = PostStore;
