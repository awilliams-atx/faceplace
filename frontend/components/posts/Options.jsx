var React = require('react'),
    PostForm = require('./PostForm'),
    ClientActions = require('../../actions/client_actions');

var Options = React.createClass({
  getInitialState: function () {
    return { selectingOptions: false };
  },
  render: function () {
    return (
      <aside className='post-options-container'>
        <i className="fa fa-chevron-down"
          aria-hidden="true"
          onClick={this.toggleOptions}>
        </i>
        {this.renderOptions()}
      </aside>
    );
  },
  renderOptions: function () {
    if (this.state.selectingOptions) {
      return (
        <ul id='post-options' className='group'>
          <li className='post-option' onClick={this.edit}>
            Edit Post
          </li>
          <br />
          <hr />
          <li className='post-option' onClick={this.delete}>
            Delete Post
          </li>
        </ul>
      );
    }
  },
  clickOutListener: function (e) {
    var options = document.getElementById('post-options');
    if (!options || !options.contains(e.target)) {
      this.toggleOptions();
    }
  },
  delete: function () {
    document.body.setAttribute('class', 'no-scroll-body');
    this.setState({ selectingOptions: false }, function () {
      ClientActions.triggerModal(this.deleteModal);
      this.toggleOptions();
    });
  },
  deleteCancelCallback: function () {
    document.body.removeAttribute('class');
    ClientActions.cancelModal();
  },
  deleteConfirmCallback: function () {
    document.body.removeAttribute('class');
    ClientActions.cancelModal();
    ClientActions.deletePost(this.props.post.postId);
  },
  deleteModal: function () {
    return (
      <div className='modal-outer group'>
        <div className='modal-inner group'>
          <aside className='modal-delete-post modal-element group'>
            <header className='modal-header'>
              <strong>
                Delete Post
              </strong>
            </header>
            <div className='modal-message-container'>
              <mark>
                Really delete this post?
              </mark>
            </div>
            <br />
            <hr />
            <footer className='modal-footer group'>
              <div className='modal-button-container group'>
                <button className='button-gray'
                  onClick={this.deleteCancelCallback}>
                    Cancel
                </button>
                <button className='button-blue'
                  onClick={this.deleteConfirmCallback}
                  ref='autoFocus'>
                    Delete Post
                </button>
              </div>
            </footer>
          </aside>
        </div>
      </div>
    );
  },
  edit: function () {
    document.body.setAttribute('class', 'no-scroll-body');
    ClientActions.freezeTags();
    this.setState({ selectingOptions: false }, function () {
      ClientActions.triggerModal(this.editModal);
      this.toggleOptions();
    });
  },
  editCallback: function () {
    document.body.removeAttribute('class');
    ClientActions.cancelModal();
    ClientActions.unfreezeTags();
  },
  editModal: function () {
    return (
      <div className='modal-outer group'>
        <aside className='modal-inner'>
        <PostForm isEditing={true}
          modalCallback={this.editCallback}
          post={this.props.post}
          isModalElement={true} />
        </aside>
      </div>
    );
  },
  toggleOptions: function () {
    var state = { selectingOptions: !this.state.selectingOptions };
    this.setState(state, function () {
      if (this.state.selectingOptions) {
        document.addEventListener('click', this.clickOutListener);
      } else {
        document.removeEventListener('click', this.clickOutListener);
      }
    }.bind(this));
  }
});

module.exports = Options;
