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
  if (!_postComments[postId]) {
    return [];
  }

  return _postComments[postId];
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
  comments.forEach(function (comment) {
    CommentStore.setComment(comment);
  });
}

module.exports = CommentStore;
