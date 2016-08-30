var React = require('react'),
    PostCommentForm = require('./PostCommentForm'),
    PostCommentIndexItem = require('./PostCommentIndexItem'),
    CommentApiUtil = require('../../util/comment_api_util'),
    CommentStore = require('../../stores/comment');

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
  },
  componentWillUnmount: function () {
    this.commentListener.remove();
  },
  onCommentStoreChange: function () {
    this.setState({
      comments: CommentStore.allPostComments(this.props.post.postId)
    });
  }
});

module.exports = PostCommentIndex;
