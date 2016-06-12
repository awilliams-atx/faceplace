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
        <img src={SessionStore.currentUser().commentPicUrl}
          className='post-comment-profile-pic'/>
        <form onSubmit={this.doNothing}>
          <textarea placeholder='Write a comment...'
            value={this.state.body}
            onChange={this.onCommentBodyChange}
            onKeyPress={this.handleEnter}></textarea>
        </form>
      </div>
    );
  },
  handleEnter: function (e) {
    if (e.charCode === 13) {
      e.preventDefault();
      if (this.state.body.length) {
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

  },
  handleSubmit: function () {

  },
  doNothing: function (e) {
    e.preventDefault();
  },
  onCommentBodyChange: function (e) {
    console.log('change');
    this.setState({body: e.target.value});
  },

});

module.exports = PostCommentForm;
