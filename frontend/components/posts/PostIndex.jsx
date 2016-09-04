var React = require('react'),
    UI = require('../../util/ui'),
    Util = require('../../util/general'),
    PostForm = require('./PostForm'),
    PostIndexItem = require('./PostIndexItem'),
    ClientActions = require('../../actions/client_actions'),
    PostStore = require('../../stores/post'),
    SessionStore = require('../../stores/session'),
    UserStore = require('../../stores/user');

var PostIndex = React.createClass({
  getInitialState: function () {
    return ({ fetchingMore: false, posts: PostStore.all() });
  },
  render: function () {
    return (
      <section className='group'
        id='post-index'
        style={{width: this.sectionWidth()}}>
        {this.renderForm()}
        {this.renderPosts()}
      </section>
    );
  },
  renderForm: function () {
    if (this.authorizedToPost()) {
      return <PostForm isEditing={false} // profileOwnerId undefined on <Main/>
        profileOwnerId={this.props.profileOwnerId}/>;
    }
  },
  renderPosts: function () {
    return this.state.posts.map(function (post) {
      return <PostIndexItem key={post.postId} post={post} />;
    });
  },
  componentDidMount: function () {
    this.postListener = PostStore.addListener(this.onPostStoreChange);
    window.addEventListener('scroll', this.loadListener);
  },
  componentDidUpdate: function () {
    if (this.props.profileOwnerid) {
      setTimeout(function () { UI.scrollToPost() }, 1000);
    }
  },
  componentWillUnmount: function () {
    this.postListener.remove();
    window.removeEventListener('scroll', this.loadListener);
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({ posts: PostStore.all() });
  },
  authorizedToPost: function () {
    if (!this.props.profileOwnerId) { return true }
    if (UserStore.user().isFriendOfCurrentUser ||
      this.props.profileOwnerId === SessionStore.currentUser().id) {
      return true;
    }
    return false;
  },
  loadListener: function () {
     if (document.body.scrollHeight - window.innerHeight <
       window.scrollY + 100 && !this.state.fetchingMore) {
       console.log('uh');
     }
  },
  onPostStoreChange: function () {
    this.setState({ posts: PostStore.all() });
  },
  sectionWidth: function () {
    if (window.location.pathname.match('/users/')) {
      return '510px';
    } else {
      return '502px';
    }
  }
});

module.exports = PostIndex;
