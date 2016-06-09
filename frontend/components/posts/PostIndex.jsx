var React = require('react'),
    PostForm = require('./PostForm'),
    PostIndexItem = require('./PostIndexItem'),
    ClientActions = require('../../actions/client_actions'),
    PostStore = require('../../stores/post'),
    UserStore = require('../../stores/user');

var PostIndex = React.createClass({
  getInitialState: function () {
    var profileOwnerId = this.props.profileOwnerId;

    return ({
      posts: PostStore.all(),
      authorizedToPost: UserStore.user().isFriendsWithCurrentUser
    });
  },
  render: function () {
    var profileOwnerId = this.props.profileOwnerId,
        posts = this.state.posts,
        postIndexItems,
        postForm;

    postIndexItems = posts.map(function (post) {
      return <PostIndexItem post={post} key={post.postId} />;
    });

    postForm = <div className='empty-post-form' />;

  if (this.state.authorizedToPost) {
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

    this.setState({authorizedToPost:
      UserStore.user().isFriendsWithCurrentUser});
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({posts: PostStore.all()});
  }
});

module.exports = PostIndex;
