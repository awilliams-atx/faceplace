var React = require('react'),
    PostCommentForm = require('./PostCommentForm'),
    PostCommentIndexItem = require('./PostCommentIndexItem'),
    CommentApiUtil = require('../../util/comment_api_util'),
    CommentStore = require('../../stores/comment');

var PostCommentIndex = React.createClass({
  getInitialState: function () {
    var postId = this.props.post.postId;
    return ({ comments: CommentStore.allPostComments(postId) });
  },
  render: function () {
    var commentIndexItems = this.state.comments.map(function (comment) {
      return <PostCommentIndexItem comment={comment} key={comment.id} />;
    });

    return (
      <section className='comment-section'>
        {commentIndexItems}
        <PostCommentForm postId={this.props.post.postId} />
      </section>
    );
  },
  componentDidMount: function () {
    this.commentListener = CommentStore.addListener(this.onCommentStoreChange);
    CommentApiUtil.fetchComments({
      commentable_id: this.props.post.postId,
      commentable_type: 'Post'
    });
  },
  componentWillUnmount: function () {
    this.commentListener.remove();
  },
  onCommentBodyChange: function (e) {
    this.setState({commentBody: e.target.value});
  },
  onCommentStoreChange: function () {
    this.setState({
      comments: CommentStore.allPostComments(this.props.post.postId)
    });
  }
});

module.exports = PostCommentIndex;
