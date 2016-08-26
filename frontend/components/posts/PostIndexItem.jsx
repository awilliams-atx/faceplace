var React = require('react'),
    Util = require('../../util/general'),
    PostForm = require('./PostForm'),
    ClientActions = require('../../actions/client_actions'),
    PostCommentIndex = require('../comments/PostCommentIndex'),
    SessionStore = require('../../stores/session');

var PostIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return ({ selectingOptions: false });
  },
  render: function () {
    var renderCrossPostUser = function () {
      if (!this.props.post.profileOwner) { return; }
      return (
        <div>
          <div className='friend-post-icon'>
            <i className='fa fa-caret-right' aria-hidden='true'></i>
          </div>
          <div className='friend-post-breakdown'>
            <a href={'/users/' + this.props.post.profileOwner.userId}>
              {this.props.post.profileOwner.fullName}
            </a>
          </div>
        </div>
      );
    }.bind(this);

    var renderTaggedFriends = function () {
      if (this.props.post.taggedFriends.length > 0) {
        return (
          <div className='post-tagged-friends'>
            <span className='post-tagged-friends-with'>—with </span>
            {Util.toCommaSeparatedAnchors(this.props.post.taggedFriends)}
          </div>
        );
      }
    }.bind(this);

    var renderOptionsIcon = function () {
      if (this.authorizedToEdit()) {
        return (
          <i className="fa fa-chevron-down"
            aria-hidden="true"
            onClick={this.toggleOptions}>
          </i>
        );
      }
    }.bind(this);

    var renderOptions = function () {
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
    }.bind(this);

    return (
      <article className='timeline-feed-item'>
        <header className='post-breakdown group'>
          <a href={'/users/' + this.props.post.authorId}
            onClick={this.pushAuthorRoute} >
            <img src={this.props.post.postPicUrl} />
          </a>
          <div className='post-breakdown-details group'>
            <a href={'/users/' + this.props.post.authorId}
              onClick={this.pushAuthorRoute}>
              <div className='post-author-name'>{this.props.post.fullName}</div>
            </a>
            {renderCrossPostUser()}
          </div>
          <br />
          <div className='post-datetime-container group'>
            <div className='post-datetime'>{this.props.post.createdAt}</div>
          </div>
          <aside className='post-options-container'>
            {renderOptionsIcon()}
            {renderOptions()}
          </aside>
        </header>
        <section className='post-body'>
          {this.props.post.body}
        </section>
        {renderTaggedFriends()}
        <PostCommentIndex post={this.props.post} />
      </article>
    );
  },
  componentDidMount: function () {
    ClientActions.fetchComments('Post', this.props.post.postId);
  },
  authorizedToEdit: function () {
    return this.props.post.authorId === SessionStore.currentUser().id;
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
                  <button className='button button-gray modal-cancel-button'
                    onClick={cancelCallback}>Cancel</button>
                  <button className='button button-blue modal-confirm-button'
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

    var post = this.props.post;
    var modalContent = function () {
      return (
        <div className='modal-outer group'>
          <aside className='modal-inner'>
          <PostForm isEditing={true}
            modalCallback={completionCallback}
            post={post}
            isModalElement={true} />
          </aside>
        </div>
      );
    };

    this.setState({ selectingOptions: false }, function () {
      ClientActions.triggerModal(modalContent);
    });
  },
  pushAuthorRoute: function (e) {
    e.preventDefault();
    this.context.router.push('/users/' + this.props.post.authorId);
  },
  toggleOptions: function () {
    this.setState({ selectingOptions: !this.state.selectingOptions });
  }
});

module.exports = PostIndexItem;
