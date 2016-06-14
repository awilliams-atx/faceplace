var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    commentConstants = require('../constants/comment_constants');

var _commentComments = {},
    _postComments = {};

var CommentStore = new Store(AppDispatcher);

CommentStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case commentConstants.COMMENT_RECEIVED:
    this.setComment(payload.comment);
    CommentStore.__emitChange();
    break;
  case commentConstants.COMMENTS_RECEIVED:
    this.setComments(payload.comments);
    CommentStore.__emitChange();
    break;
  }
};

CommentStore.all = function () {
  return ({
    postComments: $.extend({}, _postComments),
    commentComments: $.extend({}, _commentComments)
  });
};

CommentStore.allCommentComments = function (commentId) {
  if (!_commentComments[commentId]) {
    return [];
  }

  return _commentComments[commentId];
}
CommentStore.allPostComments = function (postId) {
  if (_postComments[postId]) {
    return _postComments[postId];
  } else {
    return [];
  }
}

CommentStore.setComment = function (comment) {
  if (comment.commentableType === 'Comment') {
    var commentId = comment.commentableId;

    if (!_commentComments[commentId]) {
      _commentComments[commentId] = [];
    }

    _commentComments[commentId].push(comment);
  } else if (comment.commentableType === 'Post') {
    var postId = comment.commentableId;

    if (!_postComments[postId]) {
      _postComments[postId] = [];
    }

    _postComments[postId].push(comment);
  }
}

CommentStore.setComments = function (comments) {
  if (comments[0].commentableType === 'Comment') {
    _commentComments[comments[0].commentableId] = comments;
  } else if (comments[0].commentableType === 'Post') {
    _postComments[comments[0].commentableId] = comments;
  }
}

module.exports = CommentStore;
