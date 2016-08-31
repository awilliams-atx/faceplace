var React = require('react'),
    ClientActions = require('../../actions/client_actions'),
    SessionStore = require('../../stores/session');

var PostCommentForm = React.createClass({
  getInitialState: function () {
    return ({ body: '' });
  },
  render: function () {
    return (
      <div className='post-comment-form group'>
        <img src={SessionStore.currentUser().profile_pic_url} />
        <textarea placeholder='Write a comment...'
          value={this.state.body}
          onChange={this.onChange}
          onKeyPress={this.onSubmit}
          ref='textarea'
          rows='1'></textarea>
        <div className='autogrower' ref='autogrower'></div>
      </div>
    );
  },
  autogrow: function () {
    if (this.state.body.length === 0) {
      this.refs.textarea.style.height = '16px';
    } else {
      this.refs.autogrower.textContent = this.state.body;
      this.refs.autogrower.style.display = 'block';
      var height = this.refs.autogrower.clientHeight;
      this.refs.autogrower.style.display = 'none'
      height = (height - 18).toString() + 'px';
      this.refs.textarea.style.height = height;
    }
  },
  onChange: function (e) {
    this.setState({ body: e.target.value }, this.autogrow);
  },
  onSubmit: function (e) {
    if (e.charCode === 13) {
      e.preventDefault();
      if (this.state.body.length > 0) {
        var comment = {
          body: this.state.body,
          commentableId: this.props.postId,
          commentableType: 'Post'
        };
        this.setState({ body: '' }, function () {
          ClientActions.submitComment(comment);
          this.autogrow();
        }.bind(this));
      }
    }
  }
});

module.exports = PostCommentForm;
