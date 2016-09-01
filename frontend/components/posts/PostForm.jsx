var React = require('react'),
    Util = require('../../util/general'),
    TaggedBoxes = require('./TaggedBoxes'),
    TagSearch = require('./TagSearch'),
    ClientActions = require('../../actions/client_actions'),
    FriendApiUtil = require('../../util/friend_api_util'),
    TagApiUtil = require('../../util/tag_api_util'),
    SessionStore = require('../../stores/session'),
    TagStore = require('../../stores/tag'),
    UserStore = require('../../stores/user');

var PostForm = React.createClass({
  getInitialState: function () {
    return({
      body: '',
      isTaggingForTheFirstTime: true,
      tagged: TagStore.taggedFriends(),
      tagging: false
    });
  },
  render: function () {
    var tagUrl =
          'https://s3.amazonaws.com/faceplace-dev/assets/add_friend_icon+original.png';

    return (
      // CSS is complicated because of header.
      <section id={this.postSectionId()}
        className={this.formTypeClass() + ' profile-post'}>
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
              placeholder={this.placeholder()}
              ref='autoFocus' >
            </textarea>
            <div className='autogrower' ref='autogrower'></div>
          </div>
          {TaggedBoxes(this.state.tagged, this.untag)}
          <TagSearch isEditingPost={this.props.isEditing}
            tagging={this.state.tagging} />
          <footer>
            <div className='post-footer-background'>
              <div className='post-footer-left-buttons'>
                <div className={this.taggingClass()}
                  onClick={this.toggleTag}>
                  <i className="fa fa-user-plus" aria-hidden="true"></i>
                </div>
              </div>
              {this.renderFooterRightButtons()}
            </div>
          </footer>
        </form>
      </section>
    )
  },
  renderFooterRightButtons: function () {
    if (this.props.isEditing) {
      return (
        <div className='post-footer-right-buttons'>
          <button className='button-gray'
            id='modal-cancel'
            onClick={this.onCancel}>
            Cancel
          </button>
          <button className='button-blue'
            id='modal-submit'
            onClick={this.onSubmit}>
            Update
          </button>
        </div>
      );
    } else {
      return (
        <div className='post-footer-right-buttons'>
          <button className='button-blue-wide'
            onClick={this.onSubmit}>Post</button>
        </div>
      );
    }
  },
  componentDidMount: function () {
    this.tagListener = TagStore.addListener(this.onTagStoreChange);
    if (this.props.post) {
      this.setState({ body: this.props.post.body }, function () {
        ClientActions.fetchTaggedFriends(this.props.post.postId);
        this.refs.autoFocus.focus();
        this.autogrow();
      }.bind(this));
    }
  },
  componentWillUnmount: function () {
    this.tagListener.remove();
  },
  autogrow: function () {
    Util.autogrow({
      autogrower: this.refs.autogrower,
      body: this.state.body,
      difference: 8,
      emptyHeight: 32,
      textarea: this.refs.autoFocus
    });
  },
  formTypeClass: function () {
    return this.props.isModalElement ? 'modal-element' : 'subcontent-container';
  },
  onBodyChange: function (e) {
    this.setState({ body: e.target.value }, this.autogrow);
  },
  onCancel: function (e) {
    e.preventDefault();
    this.props.modalCallback();
  },
  onSubmit: function (e) {
    e.preventDefault();
    if (this.state.body.length < 1) { return; }
    var post = {
      body: this.state.body,
      taggedFriendIds: Object.keys(TagStore.taggedFriends())
    };
    if (this.props.isEditing) {
      post.id = this.props.post.postId;
      document.body.className = '';
      ClientActions.cancelModal();
      ClientActions.updatePost(post);
      this.props.modalCallback();
    } else {
      post.profileOwnerId = this.props.profileOwnerId;
      this.setState({ body: '', tagging: false }, function () {
        ClientActions.submitPost(post);
        this.autogrow();
      });
    }
  },
  onTagStoreChange: function () {
    this.setState({ tagged: TagStore.taggedFriends() });
  },
  placeholder: function () {
    if (SessionStore.currentUser().id === this.props.profileOwnerId) {
      return 'What\'s on your mind, ' +
        SessionStore.currentUser().first_name + '?';
    } else {
      return 'Say something to ' + UserStore.user().firstName + '...';
    }
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
  taggingClass: function () {
    return this.state.tagging ? ' tag-icon-active' : 'tag-icon';
  },
  taggingClickout: function (e) {
    if (Util.hasOrDescendsFromClass(e.target, 3, 'search-index-item',
      'tagged-friends-list-item')) {
      return
    } else {
      document.removeEventListener('click', this.taggingClickout);
      this.setState({ tagging: false });
    }
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
        document.addEventListener('click', this.taggingClickout);
      }
    });
  },
  untag: function (e) {
    var friendId = parseInt(e.target.dataset.userid);
    ClientActions.removeTaggedFriend(friendId);
  },
  untoggleTag: function () {
    this.setState({ tagging: false });
  }
});

module.exports = PostForm;
