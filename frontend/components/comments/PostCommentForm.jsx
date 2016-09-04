var React = require('react'),
    Util = require('../../util/general'),
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
        <div className='autogrower'
          ref='autogrower'
          style={{width: this.textareaWidth()}}></div>
      </div>
    );
  },
  autogrow: function () {
    Util.autogrow({
      autogrower: this.refs.autogrower,
      body: this.state.body,
      difference: 14,
      emptyHeight: 16,
      textarea: this.refs.textarea
    });
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
  },
  textareaWidth: function () {
    if (this.refs.textarea) {
      return (this.refs.textarea.clientWidth - 10).toString() + 'px';
    } else {
      return '0px';
    }
  }
});

module.exports = PostCommentForm;
