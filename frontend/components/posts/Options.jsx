var React = require('react'),
    PostForm = require('./PostForm'),
    ClientActions = require('../../actions/client_actions');

var Options = React.createClass({
  getInitialState: function () {
    return { selectingOptions: false, editing: false, deleting: false };
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
  cancelModal: function () {
    if (this.state.deleting) {
      this.deleteCancelCallback();
    } else if (this.state.editing) {
      this.editCallback();
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
    this.setState({ selectingOptions: false, deleting: true }, function () {
      ClientActions.triggerModal(this.deleteModal);
      this.toggleOptions();
      document.addEventListener('click', this.modalClickOutListener);
    });
  },
  deleteCancelCallback: function () {
    document.body.removeAttribute('class');
    ClientActions.cancelModal();
    document.removeEventListener('click', this.modalClickOutListener);
  },
  deleteConfirmCallback: function () {
    document.body.removeAttribute('class');
    ClientActions.cancelModal();
    ClientActions.deletePost(this.props.post.postId);
    document.removeEventListener('click', this.modalClickOutListener);
  },
  deleteModal: function () {
    return (
      <div className='modal-outer group'>
        <div className='modal-inner group'>
          <aside id='modal' className='modal-delete-post modal-element group'>
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
                <button id='modal-cancel' className='button-gray'
                  onClick={this.deleteCancelCallback}>
                    Cancel
                </button>
                <button id='modal-sumbit' className='button-blue'
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
    this.setState({ selectingOptions: false, editing: true }, function () {
      ClientActions.triggerModal(this.editModal);
      this.toggleOptions();
      document.addEventListener('click', this.modalClickOutListener);
    });
  },
  editCallback: function () {
    document.body.removeAttribute('class');
    ClientActions.cancelModal();
    ClientActions.unfreezeTags();
    document.removeEventListener('click', this.modalClickOutListener);
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
  modalClickOutListener: function (e) {
    console.log(e.target);
    var modal = document.getElementById('modal');
    if (!this.submittingOrCanceling(e) && !modal.contains(e.target)) {
      this.cancelModal();
      document.removeEventListener('click', this.modalClickOutListener);
    }
  },
  submittingOrCanceling: function (e) {
    return ['modal-submit', 'modal-cancel'].indexOf(e.target.id) >= 0;
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
