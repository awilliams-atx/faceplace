var React = require('react'),
    ClientActions = require('../../actions/client_actions'),
    SessionStore = require('../../stores/session');

var PostCommentForm = React.createClass({
  getInitialState: function () {
    return ({body: ''});
  },
  render: function () {
    return (
      <div className='post-comment-form group'>
        <img src={SessionStore.currentUser().profile_pic_url} />
        <textarea placeholder='Write a comment...'
          value={this.state.body}
          onChange={this.onChange}
          onKeyPress={this.onSubmit}></textarea>
      </div>
    );
  },
  onChange: function (e) {
    this.setState({body: e.target.value});
  },
  onSubmit: function (e) {
    if (e.charCode === 13) {
      if (this.state.body.length > 0) {
        var comment = {
          body: this.state.body,
          commentableId: this.props.postId,
          commentableType: 'Post'
        };
        this.setState({body: ''}, function () {
          ClientActions.submitComment(comment);
        });
      }
    }
  }
});

module.exports = PostCommentForm;
