var React = require('react');

var CommentIndexItem = React.createClass({
  render: function () {
    var comment = this.props.comment;

    return (
      <div className='post-comment group'>
        <div className='post-comment-image'>
          <a href={'#/users/' + this.props.comment.authorId}>
            <img src={this.props.comment.commentPicUrl}
              className='post-comment-profile-pic' />
          </a>
        </div>
        <div className='post-comment-body'>
          <a href={'#/users/' + this.props.comment.authorId}>
            {this.props.comment.fullName}
          </a>
          {' ' + comment.body}
          <br />
          <i className="fa fa-pencil" aria-hidden="true"></i>
          <div className='post-comment-created-at'>
            {this.props.comment.createdAt}
          </div>
        </div>
      </div>
    );
  },
  handleSubmit: function (e) {

  },
  onCommentBodyChange: function (e) {
    this.setState({commentBody: e.target.value});
  },

});

module.exports = CommentIndexItem;
