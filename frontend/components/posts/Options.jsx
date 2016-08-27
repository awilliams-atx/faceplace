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
        <ul className='post-options group'>
          <li className='post-option' onClick={this.editPost}>
            Edit Post
          </li>
          <br />
          <hr />
          <li className='post-option' onClick={this.deletePost}>
            Delete Post
          </li>
        </ul>
      );
    }
  },
  deletePost: function () {
    $('body').addClass('no-scroll-body');
    var confirmCallback = function () {
      $('body').removeClass('no-scroll-body');
      ClientActions.cancelModal();
      ClientActions.deletePost(this.props.post.postId);
    }.bind(this);
    var cancelCallback = function () {
      $('body').removeClass('no-scroll-body');
      ClientActions.cancelModal();
    };
    var modalContent = function () {
      return (
        <div className='modal-outer group'>
          <div className='modal-inner group'>
            <aside className='modal-delete-post modal-element group'>
              <header className='modal-header'>
                <strong>Delete Post</strong>
              </header>
              <div className='modal-message-container'>
                <mark>Really delete this post?</mark>
              </div>
              <br />
              <hr />
              <footer className='modal-footer group'>
                <div className='modal-button-container group'>
                  <button className='button-gray'
                    onClick={cancelCallback}>Cancel</button>
                  <button className='button-blue'
                    onClick={confirmCallback}
                    ref='autoFocus'>Delete Post</button>
                </div>
              </footer>
            </aside>
          </div>
        </div>
      );
    };
    this.setState({selectingOptions: false}, function () {
      ClientActions.triggerModal(modalContent);
    });
  },
  editPost: function () {
    $('body').addClass('no-scroll-body');
    ClientActions.freezeTags();
    var completionCallback = function () {
      $('body').removeClass('no-scroll-body');
      ClientActions.cancelModal();
      ClientActions.unfreezeTags();
    };
    var modalContent = function () {
      return (
        <div className='modal-outer group'>
          <aside className='modal-inner'>
          <PostForm isEditing={true}
            modalCallback={completionCallback}
            post={this.props.post}
            isModalElement={true} />
          </aside>
        </div>
      );
    }.bind(this);

    this.setState({ selectingOptions: false }, function () {
      ClientActions.triggerModal(modalContent);
    });
  },
  toggleOptions: function () {
    this.setState({ selectingOptions: !this.state.selectingOptions });
  }
});

module.exports = Options;
