var React = require('react'),
    UI = require('../../util/ui'),
    Util = require('../../util/general'),
    ImageListEdit = require('./ImageListEdit'),
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
      images: [],
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
        className={this.formTypeClass() + ' post-form'}
        style={this.style()}>
        <header className='post-types group'>
          <div className='post-type group'>
            <i className="fa fa-camera-retro post-type-icon"
              aria-hidden="true"></i>
            <div className='post-type-text'>
              Photo
            </div>
            <input onChange={this.onImageChange} type='file' />
          </div>
        </header>
        <div className='post-text-body'>
          <img src={SessionStore.currentUser().postPicUrl}
            className='post-pic'/>
          <textarea className='post-textarea'
            onChange={this.onBodyChange}
            value={this.state.body}
            placeholder={this.placeholder()}
            ref='autoFocus'>
          </textarea>
          <div className='autogrower'
            ref='autogrower'
            style={{width: this.textareaWidth()}}>
          </div>
        </div>
        {TaggedBoxes(this.state.tagged, this.untag)}
        {this.renderImages()}
        <TagSearch isEditingPost={this.props.isEditing} />
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
  renderImages: function () {
    if (this.state.images.length > 0) {
      return (
        <aside className='upload-images'>
          {ImageListEdit(this.state.images, this.onRemoveImage)}
        </aside>
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
  makeFormData: function () {
    var data = new FormData();
    this.state.images.forEach(function (img) {
      data.append(('post[uploaded_images][]'), img);
    });
    data.set('post[body]', this.state.body);
    var uids = TagStore.uids(this.props.isEditing);
    if (this.props.isEditing) {
      data.set('post[remove_tags]', uids.remove);
      data.set('post[add_tags]', uids.add);
    } else {
      data.set('post[tagged_ids]', TagStore.uids(this.props.isEditing));
    }
    return data;
  },
  onBodyChange: function (e) {
    this.setState({ body: e.target.value }, this.autogrow);
  },
  onCancel: function (e) {
    e.preventDefault();
    this.props.modalCallback();
  },
  onImageChange: function (e) {
    var imageFile = e.target.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = function () {
      var images = this.state.images.slice()
      images.push(imageFile);
      this.setState({ images: images });
    }.bind(this);
    if (imageFile) { fileReader.readAsDataURL(imageFile) }
  },
  onRemoveImage: function (e) {
    var images = this.state.images.slice();
    images.splice(e.target.dataset.idx, 1);
    this.setState({ images: images });
  },
  onSubmit: function (e) {
    e.preventDefault();
    if (this.state.body.length < 1) { return; }
    var data = this.makeFormData();
    if (this.props.isEditing) {
      document.removeEventListener('click', this.taggingClickout);
      data.set('post[id]', this.props.post.postId);
      document.body.className = '';
      ClientActions.cancelModal();
      ClientActions.updatePost(data);
      this.props.modalCallback();
    } else {
      if (this.props.profileOwnerId &&
        !SessionStore.isCurrentUser(this.props.profileOwnerId)) {
        data.set('post[profile_owner_id]', this.props.profileOwnerId);
      }
      this.setState({ body: '', images: [] }, function () {
        if (this.state.tagging) { this.toggleTag() }
        ClientActions.submitPost(data);
        this.autogrow();
      }.bind(this));
    }
  },
  onTagStoreChange: function () {
    if (this.props.isEditing === UI.now('editingPost')) {
      this.setState({ tagged: TagStore.taggedFriends() });
    }
  },
  placeholder: function () {
    if (!this.props.profileOwnerId || SessionStore.currentUser().id ===
      this.props.profileOwnerId) {
      return 'What\'s on your mind, ' + SessionStore.currentUser()
        .first_name + '?';
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
  style: function () {
    return {
      width: this.props.profileOwnerId ? '510px' : '502px',
      marginBottom: this.props.profileOwnerId? '20px' : '10px'
    };
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
      'tagged-friends-list-item', 'button-blue', 'button-blue-wide', 'tagging-field-container')) {
      return
    } else {
      this.toggleTag(e);
    }
  },
  textareaWidth: function () {
    if (this.refs.autoFocus) {
      return (this.refs.autoFocus.clientWidth - 12).toString() + 'px';
    } else {
      return 0;
    }
  },
  toggleTag: function (e) {
    this.setState({ tagging: !this.state.tagging }, function () {
      UI.set('tagging', this.state.tagging, true);
      if (this.state.tagging) {
        ClientActions.fetchTagSearchResults('');
        document.addEventListener('click', this.taggingClickout);
      } else {
        document.removeEventListener('click', this.taggingClickout);
        if (e && e.target === this.refs.autoFocus) {
          this.refs.autoFocus.focus();
        }
      }
    }.bind(this));
  },
  untag: function (e) {
    var friendId = parseInt(e.target.dataset.userid);
    ClientActions.removeTaggedFriend(friendId);
  }
});

module.exports = PostForm;
