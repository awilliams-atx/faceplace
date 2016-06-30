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
    var post = this.props.post;
    return({
      postBody: '',
      tagging: false,
      friendsFetched: false,
      tagQuery: ''
    });
  },
  render: function () {
    var currentUser = SessionStore.currentUser(),
        profileOwner = UserStore.user(),
        placeholderText,
        tagContents,
        tagUrl =
          'https://s3.amazonaws.com/faceplace-dev/assets/add_friend_icon+original.png';

  tagContents = <TagSearch tagging={this.state.tagging}/>;

  if (SessionStore.currentUser().id === this.props.profileOwnerId) {
    placeholderText = 'What\'s on your mind, ' + currentUser.first_name + '?';
  } else {
    placeholderText = 'Say something to ' + profileOwner.firstName + '...';
  }

    return (
      // CSS is complicated because of header.
      <section id='post-form-section'
        className='subcontent-container profile-post'>
        <div className='post-types-background'>
          <header className='post-types'>
              <img src='https://s3.amazonaws.com/faceplace-dev/assets/post_status.png' className='post-type-img' />
              <div className='post-type-text'>
                Status
              </div>
          </header>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className='post-form'>

            <img src={SessionStore.currentUser().postPicUrl}
              className='post-pic'/>
            <textarea className='post-textarea'
              onChange={this.onPostBodyChange}
              value={this.state.postBody}
              placeholder={placeholderText} >

            </textarea>
          </div>
          {tagContents}
          <footer>
            <div className='post-footer-background'>
              <div className='post-footer-left-buttons'>
                <div className='tag-container'>
                  <div className='tag-icon'>
                    <img src={tagUrl}
                      onClick={this.toggleTag}/>
                  </div>
                </div>
              </div>
              <div className='post-footer-right-buttons'>
                <button className='button button-blue button-post'>
                  Post
                </button>
              </div>
            </div>
          </footer>
        </form>
      </section>
    );
  },
  componentDidMount: function () {
    var post = this.props.post;
    if (post) {
      this.setState({postBody: post.body});
    }
  },
  handleSubmit: function (e) {
    e.preventDefault();
    if (this.state.postBody.length < 1) { return; }

    var post = {
      profileOwnerId: this.props.profileOwnerId,
      body: this.state.postBody,
      taggedFriendIds: TagStore.allTaggedFriendIds({keysOnly: true})
    };

    this.setState({
      postBody: '',
      tagging: false
    }, function () {
      ClientActions.submitPost(post);
    });
  },
  onPostBodyChange: function (e) {
    this.setState({postBody: e.target.value});
  },
  toggleTag: function (e) {
    e.preventDefault();
    this.setState({tagging: !this.state.tagging}, function () {
      ensureFriendsFetched();
    });

    function ensureFriendsFetched () {
      if (!TagStore.friendsFetched()) {
        TagApiUtil.fetchFriendsForTagging(SessionStore.currentUser().id);
      }
    }
  }
});


module.exports = PostForm;
