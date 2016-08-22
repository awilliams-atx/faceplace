var ServerActions = require('../actions/server_actions');

var CommentApiUtil = {
  fetchComments: function (type, id) {
    var url = 'api/';

    if (type === 'Post') {
      url += 'posts/' + id + '/comments';
    } else if (type === 'Comment') {
      url += 'comments/' + id + '/comments';
    }

    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      success: function (comments) {
        ServerActions.receiveComments(comments);
      }
    });
  },
  submitComment: function (comment) {

    var submissionComment = {};

    submissionComment.body = comment.body;
    submissionComment.commentable_id = comment.commentableId;
    submissionComment.commentable_type = comment.commentableType;

    var parentRoute,
        parentId;

    if (comment.commentableType === 'Post') {
      parentRoute = 'posts';
      parentId = comment.commentableId;
    } else if (comment.commentableType === 'Comment') {
      parentRoute = 'comments';
      parentId = comment.commentableId;
    }

    var url = 'api/' + parentRoute + '/' + parentId + '/comments';

    $.ajax({
      url: url,
      method: 'POST',
      dataType: 'json',
      data: {comment: submissionComment},
      success: function (comment) {
        ServerActions.receiveComment(comment);
      }
    });
  }
};

module.exports = CommentApiUtil;
