var React = require('react'),
    PostForm = require('./PostForm'),
    PostIndexItem = require('./PostIndexItem'),
    ClientActions = require('../../actions/client_actions'),
    PostStore = require('../../stores/post');

var PostIndex = React.createClass({
  getInitialState: function () {
    var userId = this.props.userId;

    return ({posts: PostStore.all(userId)});
  },
  render: function () {

    var postIndexItems;

    var posts = this.state.posts;

    postIndexItems = posts.map(function (post) {
      return <PostIndexItem post={post} key={post.postId} />;
    });

    return (
      <section className='post-index'>
        <PostForm />
        {postIndexItems}
      </section>
    );
  },
  componentDidMount: function () {
    var profileOwnerId = this.props.profileOwnerId;

    this.postListener =
      PostStore.addListener(this.onPostStoreChange);
    ClientActions.fetchProfilePosts(profileOwnerId);
  },
  componentWillUnmount: function () {
    this.postListener.remove();
  },
  onPostStoreChange: function () {
    var userId = this.props.userId;

    this.setState({posts: PostStore.all(userId)});
  }
});

module.exports = PostIndex;
