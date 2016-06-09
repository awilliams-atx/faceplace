var React = require('react'),
    PostForm = require('./PostForm'),
    PostIndexItem = require('./PostIndexItem'),
    ClientActions = require('../../actions/client_actions'),
    PostStore = require('../../stores/post');

var PostIndex = React.createClass({
  getInitialState: function () {
    return ({posts: PostStore.all()});
  },
  render: function () {
    var profileOwnerId = this.props.profileOwnerId,
        posts = this.state.posts,
        postIndexItems;

        console.log(posts);
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
    this.setState({posts: PostStore.all()});
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({posts: PostStore.all()});
  }
});

module.exports = PostIndex;
