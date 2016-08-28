var React = require('react'),
    Util = require('../../util/general');

var CommentIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  render: function () {
    return (
      <div className='post-comment group'>
        <a href={'/users/' + this.props.comment.authorId}
          onClick={this.pushAuthorRoute}>
          <img src={this.props.comment.profile_pic_url} />
        </a>
        <div className='post-comment-body'>
          <a href={'/users/' + this.props.comment.authorId}
            onClick={this.pushAuthorRoute}>
            {this.props.comment.fullName}
          </a>
          {' ' + this.props.comment.body}
          <br />
          <i className="fa fa-pencil" aria-hidden="true"></i>
          <div className='post-comment-created-at'>
            {this.props.comment.createdAt}
          </div>
        </div>
      </div>
    );
  },
  onCommentBodyChange: function (e) {
    this.setState({commentBody: e.target.value});
  },
  pushAuthorRoute: function (e) {
    e.preventDefault();
    this.context.router.push(e.target.pathname);
    Util.jumpToTop();
  }
});

module.exports = CommentIndexItem;
