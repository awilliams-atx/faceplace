var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    postConstants = require('../constants/post_constants');

var _posts = {};

var PostStore = new Store(AppDispatcher);

PostStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case postConstants.POSTS_RECEIVED:
      this.setPosts(payload);
      PostStore.__emitChange();
      break;
    case postConstants.OWN_POST_RECEIVED:
      this.addPost(payload.post);
      PostStore.__emitChange();
      break;
  }
};

PostStore.addPost = function (post) {
  var authorId = post.authorId;

  if (_posts[post.authorId]) {
    _posts[post.authorId].unshift(post);
  } else {
    _posts[post.authorId] = [post];
  }
};

PostStore.all = function (userId) {
  if (_posts.hasOwnProperty(userId)) {
    return _posts[userId].slice();
  } else {
    return [];
  }
};

PostStore.setPosts = function (payload) {
  _posts[payload.userId] = payload.posts;
};

window.PostStore = PostStore;
module.exports = PostStore;
