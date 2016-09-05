var React = require('react'),
    PostCommentForm = require('./PostCommentForm'),
    PostCommentIndexItem = require('./PostCommentIndexItem'),
    ClientActions = require('../../actions/client_actions'),
    CommentApiUtil = require('../../util/comment_api_util'),
    CommentStore = require('../../stores/comment'),
    NotificationStore = require('../../stores/notification');

var PostCommentIndex = React.createClass({
  getInitialState: function () {
    return ({ comments: CommentStore.allPostComments(this.props.post.postId) });
  },
  render: function () {
    return (
      <section className='comment-section'>
        {this.renderComments()}
        {this.renderForm()}
      </section>
    );
  },
  renderComments: function () {
    return this.state.comments.map(function (comment) {
      return <PostCommentIndexItem comment={comment} key={comment.id} />;
    });
  },
  renderForm: function () {
    if (this.props.authorizedToComment) {
      return <PostCommentForm postId={this.props.post.postId} />;
    }
  },
  componentDidMount: function () {
    this.commentListener = CommentStore.addListener(this.onCommentStoreChange);
    this.notificationListener =
      NotificationStore.addListener(this.onNotificationStoreChange);
  },
  componentWillUnmount: function () {
    this.commentListener.remove();
    this.notificationListener.remove();
  },
  onCommentStoreChange: function () {
    this.setState({
      comments: CommentStore.allPostComments(this.props.post.postId)
    });
  },
  onNotificationStoreChange: function () {
    var notification = NotificationStore.mostRecent();
    if (Object.keys(notification).length === 0) { return }
    if (notification.notifiable_type !== 'Comment') { return }
    if (this.props.post.postId === notification.post_id) {
      ClientActions.fetchNotifiableComment(notification);
    }
  }
});

module.exports = PostCommentIndex;
