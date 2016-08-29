var React = require('react'),
    Util = require('../../util/general'),
    PostForm = require('./PostForm'),
    PostIndexItem = require('./PostIndexItem'),
    PostStore = require('../../stores/post'),
    SessionStore = require('../../stores/session'),
    UserStore = require('../../stores/user');

var PostIndex = React.createClass({
  getInitialState: function () {
    return ({
      isFriendOfProfileOwner: UserStore.user().isFriendOfCurrentUser,
      posts: PostStore.all()
    });
  },
  render: function () {
    return (
      <section className='post-index'>
        {this.renderForm()}
        {this.renderPosts()}
      </section>
    );
  },
  renderForm: function () {
    if (this.authorizedToPost()) {
      return <PostForm isEditing={false}
        profileOwnerId={this.props.profileOwnerId}/>;
    }
  },
  renderPosts: function () {
    return this.state.posts.map(function (post) {
      return <PostIndexItem post={post} key={post.postId} />;
    });
  },
  componentDidMount: function () {
    this.postListener = PostStore.addListener(this.onPostStoreChange);
    this.userListener = UserStore.addListener(this.onUserStoreChange);
  },
  componentWillUnmount: function () {
    this.postListener.remove();
    this.userListener.remove();
  },
  authorizedToPost: function () {
    var authorized = false;
    if (UserStore.user().isFriendOfCurrentUser ||
      this.props.profileOwnerId === SessionStore.currentUser().id) {
      authorized = true;
    }
    return authorized;
  },
  onPostStoreChange: function () {
    this.setState({ posts: PostStore.all() }, function () {
      Util.jumpToQueryStringPost();
    });
  },
  onUserStoreChange: function () {
    this.setState({
      isFriendOfProfileOwner: UserStore.user().isFriendOfCurrentUser
    });
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({ posts: PostStore.all() });
  }
});

module.exports = PostIndex;
