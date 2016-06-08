var React = require('react'),
    PostForm = require('./PostForm'),
    PostIndexItem = require('./PostIndexItem'),
    ClientActions = require('../../actions/client_actions'),
    PostStore = require('../../stores/post');

var PostIndex = React.createClass({
  getInitialState: function () {
    var profileOwnerId = this.props.profileOwnerId;

    return ({posts: PostStore.all(profileOwnerId)});
  },
  render: function () {
    debugger
    var profileOwnerId = this.props.profileOwnerId,
        posts = this.state.posts,
        postIndexItems;

    postIndexItems = posts.map(function (post) {
      return <PostIndexItem post={post} key={post.postId} />;
    });

    return (
      <section className='post-index'>
        <PostForm profileOwnerId={profileOwnerId}/>
        {postIndexItems}
      </section>
    );
  },
  componentDidMount: function () {
    var profileOwnerId = this.props.profileOwnerId;

    this.postListener =
      PostStore.addListener(this.onPostStoreChange);
    ClientActions.fetchTimelinePosts(profileOwnerId);
  },
  componentWillUnmount: function () {
    this.postListener.remove();
  },
  onPostStoreChange: function () {
    var profileOwnerId = this.props.profileOwnerId;

    this.setState({posts: PostStore.all(profileOwnerId)});
  }
});

module.exports = PostIndex;
