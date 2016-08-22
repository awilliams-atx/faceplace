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
    var renderForm = function () {
      if (this.authorizedToPost()) {
        return <PostForm isEditing={false}
          profileOwnerId={this.props.profileOwnerId}/>;
      }
    }.bind(this);

    var renderPosts = function () {
      return this.state.posts.map(function (post) {
        return <PostIndexItem post={post} key={post.postId} />;
      });
    }.bind(this);

    return (
      <section className='post-index'>
        {renderForm()}
        {renderPosts()}
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
    this.userListener.remove();
  },
  authorizedToPost: function () {
    if (this.props.profileOwnerId === SessionStore.currentUser().id) {
      return true;
    } else if (UserStore.user().isFriendOfCurrentUser) {
      return true;
    }
    return false;
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
