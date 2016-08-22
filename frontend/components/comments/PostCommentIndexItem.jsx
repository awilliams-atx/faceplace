var React = require('react');

var CommentIndexItem = React.createClass({
  render: function () {
    return (
      <div className='post-comment group'>
        <a href={'#/users/' + this.props.comment.authorId}>
          <img src={this.props.comment.profile_pic_url}
            className='post-comment-profile-pic' />
        </a>
        <div className='post-comment-body'>
          <a href={'#/users/' + this.props.comment.authorId}>
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
  handleSubmit: function (e) {

  },
  onCommentBodyChange: function (e) {
    this.setState({commentBody: e.target.value});
  },

});

module.exports = CommentIndexItem;
