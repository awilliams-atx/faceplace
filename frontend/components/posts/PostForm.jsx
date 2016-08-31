var React = require('react'),
    TagSearch = require('./TagSearch'),
    ClientActions = require('../../actions/client_actions'),
    FriendApiUtil = require('../../util/friend_api_util'),
    TagApiUtil = require('../../util/tag_api_util'),
    SessionStore = require('../../stores/session'),
    TagStore = require('../../stores/tag'),
    UserStore = require('../../stores/user');

var PostForm = React.createClass({
  getInitialState: function () {
    return({ body: '', isTaggingForTheFirstTime: true, tagging: false });
  },
  render: function () {
    var currentUser = SessionStore.currentUser(),
        profileOwner = UserStore.user(),
        placeholderText,
        tagContents,
        tagUrl =
          'https://s3.amazonaws.com/faceplace-dev/assets/add_friend_icon+original.png';

  tagContents =
    <TagSearch tagging={this.state.tagging}
      isEditingPost={this.props.isEditing} />;

  if (SessionStore.currentUser().id === this.props.profileOwnerId) {
    placeholderText = 'What\'s on your mind, ' + currentUser.first_name + '?';
  } else {
    placeholderText = 'Say something to ' + profileOwner.firstName + '...';
  }

  var taggingClass =
    this.state.tagging ? ' tag-icon-active' : 'tag-icon';

  var footerRightButtons;
  if (this.props.isEditing) {
    footerRightButtons = (
      <div className='post-footer-right-buttons'>
        <button className='button-gray'
          id='modal-cancel'
          onClick={this.handleCancel}>
          Cancel
        </button>
        <button className='button-blue'
          id='modal-submit'
          onClick={this.handleSubmit}>
          Update
        </button>
      </div>
    );
  } else {
    footerRightButtons = (
      <div className='post-footer-right-buttons'>
        <button className='button-blue-wide'
          onClick={this.handleSubmit}>Post</button>
      </div>
    );
  }

  var elTypeClass =
    this.props.isModalElement ? 'modal-element' : 'subcontent-container';

    return (
      // CSS is complicated because of header.
      <section id={this.postSectionId()}
        className={elTypeClass + ' profile-post'}>
        <div className='post-types-background'>
          <header id='post-types'>
            <img src='https://s3.amazonaws.com/faceplace-dev/assets/post_status.png' className='post-type-img' />
            <div className='post-type-text'>
              Status
            </div>
          </header>
        </div>
        <form>
          <div className='post-form'>

            <img src={SessionStore.currentUser().postPicUrl}
              className='post-pic'/>
            <textarea className='post-textarea'
              onChange={this.onBodyChange}
              onFocus={this.untoggleTag}
              value={this.state.body}
              placeholder={placeholderText}
              ref='autoFocus' >
            </textarea>
          </div>
          {tagContents}
          <footer>
            <div className='post-footer-background'>
              <div className='post-footer-left-buttons'>
                <div className={taggingClass}
                  onClick={this.toggleTag}>
                  <i className="fa fa-user-plus" aria-hidden="true"></i>
                </div>
              </div>
              {footerRightButtons}
            </div>
          </footer>
        </form>
      </section>
    )
  },
  componentDidMount: function () {
    var post = this.props.post;
    if (post) {
      this.setState({ body: post.body }, function () {
        ClientActions.fetchTaggedFriends(post.postId);
        this.refs.autoFocus.focus();
      }.bind(this));
    }
  },
  handleCancel: function (e) {
    e.preventDefault();
    this.props.modalCallback();
  },
  handleSubmit: function (e) {
    e.preventDefault();
    if (this.state.body.length < 1) { return; }
    var post = {
      body: this.state.body,
      taggedFriendIds: Object.keys(TagStore.taggedFriends())
    };
    if (this.props.isEditing) {
      post.id = this.props.post.postId;
      $('body').removeClass('no-scroll-body');
      ClientActions.cancelModal();
      ClientActions.updatePost(post);
      this.props.modalCallback();
    } else {
      post.profileOwnerId = this.props.profileOwnerId;
      this.setState({ body: '', tagging: false }, function () {
        ClientActions.submitPost(post);
      });
    }
  },
  onBodyChange: function (e) {
    this.setState({ body: e.target.value });
  },
  postSectionId: function () {
    if (this.props.isEditing) {
      return 'modal';
    } else {
      return 'post-form-section';
    }
  },
  submitButtonId: function () {
    if (this.props.isModalElement) {
      return 'modal-submit';
    } else {
      return '';
    }
  },
  taggingListener: function (e) {
    var node = e.target;
    var noBlurClassNames =
      ['search-index-item group', 'tagged-friends-list-item'];
    for (var i = 0; i < 3; i++) {
      if (!node) {
        document.removeEventListener('click', this.taggingListener);
        this.setState({ tagging: false });
        return;
      } else if (noBlurClassNames.includes(node.className)) {
        return;
      }
      node = node.parentNode;
    }
    document.removeEventListener('click', this.taggingListener);
    this.setState({ tagging: false });
  },
  toggleTag: function (e) {
    e.preventDefault();
    var willTagForTheFirstTime = !!this.state.isTaggingForTheFirstTime;

    this.setState({
      isTaggingForTheFirstTime: false,
      tagging: !this.state.tagging
    }, function () {
      if (this.state.tagging) {
        if (willTagForTheFirstTime) {
          ClientActions.fetchTagSearchResults('');
        }
        document.addEventListener('click', this.taggingListener);
      }
    });
  },
  untoggleTag: function () {
    this.setState({ tagging: false });
  }
});


module.exports = PostForm;
