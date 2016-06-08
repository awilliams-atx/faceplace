var React = require('react'),
    TagSearch = require('./TagSearch'),
    ClientActions = require('../../actions/client_actions'),
    FriendApiUtil = require('../../util/friend_api_util'),
    TagApiUtil = require('../../util/tag_api_util'),
    SessionStore = require('../../stores/session'),
    TagStore = require('../../stores/tag');

var PostForm = React.createClass({
  getInitialState: function () {
    return({
      postBody: '',
      tagging: false,
      friendsFetched: false,
      tagQuery: ''
    });
  },
  render: function () {
    var currentUser = SessionStore.currentUser(),
        tagContents,
        tagUrl =
          'https://s3.amazonaws.com/faceplace-dev/assets/add_friend_icon+original.png';

  if (this.state.tagging) {
    tagContents = <TagSearch />;
  } else {
    tagContents = <div className='empty-tagging-contents' />;
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
              placeholder={'What\'s on your mind, ' + SessionStore.currentUser().first_name + '?'} >

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
  handleSubmit: function (e) {
    e.preventDefault();
    if (this.state.postBody.length < 1) { return; }
    var post = {
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
      TagApiUtil.fetchFriendsForTagging(SessionStore.currentUser().id);
    });
  }
});


module.exports = PostForm;
