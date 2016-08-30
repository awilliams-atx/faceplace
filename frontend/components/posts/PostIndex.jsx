var React = require('react'),
    Util = require('../../util/general'),
    PostForm = require('./PostForm'),
    PostIndexItem = require('./PostIndexItem'),
    ClientActions = require('../../actions/client_actions'),
    NotificationStore = require('../../stores/notification'),
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
      <section id='post-index'>
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
    this.notificationListener =
      NotificationStore.addListener(this.onNotificationStoreChange);
    this.postListener = PostStore.addListener(this.onPostStoreChange);
    this.userListener = UserStore.addListener(this.onUserStoreChange);
  },
  componentDidUpdate: function () {
    Util.scrollToQueryStringPost();
  },
  componentWillUnmount: function () {
    this.notificationListener.remove();
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
  onNotificationStoreChange: function () {
    var notification = NotificationStore.mostRecent();
    if (Object.keys(notification).length === 0) { return }
    if (notification.notifiable_type !== 'Comment') { return }
    if (UserStore.user().userId === notification.timeline_owner_id) {
      ClientActions.fetchNotifiableComment(notification);
    } else {
      var postIds = this.state.posts.map(function (post) {
        return post.postId;
      });
      if (postIds.indexOf(notification.post_id) >= 0) {
        ClientActions.fetchNotifiableComment(notification);
      }
    }
  },
  onPostStoreChange: function () {
    this.setState({ posts: PostStore.all() });
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
