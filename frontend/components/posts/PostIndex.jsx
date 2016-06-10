var React = require('react'),
    PostForm = require('./PostForm'),
    PostIndexItem = require('./PostIndexItem'),
    ClientActions = require('../../actions/client_actions'),
    PostStore = require('../../stores/post'),
    SessionStore = require('../../stores/session'),
    UserStore = require('../../stores/user');

var PostIndex = React.createClass({
  getInitialState: function () {
    var profileOwnerId = this.props.profileOwnerId;
    return ({
      isFriendOfProfileOwner: UserStore.user().isFriendOfCurrentUser,
      posts: PostStore.all(),
      editingPosts: {}
    });
  },
  render: function () {
    var profileOwnerId = this.props.profileOwnerId,
        authorizedToPost = false;

    if (profileOwnerId === SessionStore.currentUser().id) {
      authorizedToPost = true;
    } else if (this.state.isFriendOfProfileOwner) {
      authorizedToPost = true;
    }

    var posts = this.state.posts,
        postIndexItems,
        postForm;

    postIndexItems = posts.map(function (post) {
      return <PostIndexItem post={post} key={post.postId} />;
    });

    postForm = <div className='empty-post-form' />;

  if (authorizedToPost) {
    postForm = <PostForm profileOwnerId={profileOwnerId}/>;
  }

    return (
      <section className='post-index'>
        {postForm}
        {postIndexItems}
      </section>
    );
  },
  componentDidMount: function () {
    var profileOwnerId = this.props.profileOwnerId;

    this.postListener =
      PostStore.addListener(this.onPostStoreChange);

    this.userListener =
      UserStore.addListener(this.onUserStoreChange);

    ClientActions.fetchTimelinePosts(profileOwnerId);
  },
  componentWillUnmount: function () {
    this.postListener.remove();
  },
  onPostStoreChange: function () {
    this.setState({posts: PostStore.all()});
  },
  onUserStoreChange: function () {
    var profileOwnerId = this.props.profileOwnerId;

    this.setState({isFriendOfProfileOwner:
      UserStore.user().isFriendOfCurrentUser});
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({posts: PostStore.all()});
  }
});

module.exports = PostIndex;
