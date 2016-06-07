var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    postConstants = require('../constants/post_constants');

var _post = {
  authorId: null,
  postBody: '',
  postPicUrl: '',
  fullName: '',
  createdAt: ''
};

var PostStore = new Store(AppDispatcher);

PostStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  }
};


module.exports = PostStore;
