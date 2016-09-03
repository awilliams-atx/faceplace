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
    var profileOwnerId = this.props.post.profileOwner ? this.props.post.profileOwner.id : undefined
    if (SessionStore.friendsWith(this.props.post.authorId, profileOwnerId) ||
      SessionStore.currentUser().id === this.props.post.authorId) {
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
    console.log('if the notification has a post id, just use that');
    var notification = NotificationStore.mostRecent();
    console.log(notification);
    if (Object.keys(notification).length === 0) { return }
    if (notification.notifiable_type !== 'Comment') { return }
    if (this.props.post.postId === notification.post_id) {
      ClientActions.fetchNotifiableComment(notification);
    } else {
      var postIds = this.state.posts.map(function (post) {
        return post.postId;
      });
      if (postIds.indexOf(notification.post_id) >= 0) {
        ClientActions.fetchNotifiableComment(notification);
      }
    }
  }
});

module.exports = PostCommentIndex;
