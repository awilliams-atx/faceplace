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
    case postConstants.POST_RECEIVED:
      console.log('PostStore#POST_RECEIVED');
      this.addPost(payload.post);
      PostStore.__emitChange();
      break;
  }
};

PostStore.addPost = function (post) {
  _posts[post.authorId].push(post);
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

module.exports = PostStore;
