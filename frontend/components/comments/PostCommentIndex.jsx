var React = require('react'),
    PostCommentForm = require('./PostCommentForm'),
    PostCommentIndexItem = require('./PostCommentIndexItem'),
    CommentApiUtil = require('../../util/comment_api_util'),
    CommentStore = require('../../stores/comment');

var PostCommentIndex = React.createClass({
  getInitialState: function () {
    var postId = this.props.postId;

    return ({
      comments: CommentStore.allPostComments(postId)
    });
  },
  render: function () {
    commentIndexItems = this.state.comments.map(function (comment) {
      return <PostCommentIndexItem comment={comment} key={comment.id} />;
    });

    return (
      <section className='comment-section'>
        {commentIndexItems}
        <PostCommentForm postId={this.props.postId} />
      </section>
    );
  },
  componentDidMount: function () {
    this.commentListener = CommentStore.addListener(this.onCommentStoreChange);

    CommentApiUtil.fetchComments({
      commentable_id: this.props.postId,
      commentable_type: 'Post'
    });
  },
  componentWillUnmount: function () {
    this.commentListener.remove();
  },
  handleSubmit: function (e) {

  },
  onCommentBodyChange: function (e) {
    this.setState({commentBody: e.target.value});
  },
  onCommentStoreChange: function () {
    this.setState({
      comments: CommentStore.allPostComments(this.props.postId)
    });
  }
});

module.exports = PostCommentIndex;
