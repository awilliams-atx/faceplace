var React = require('react'),
    Options = require('./Options'),
    ProfileOwner = require('./ProfileOwner'),
    TaggedFriends = require('./TaggedFriends'),
    ClientActions = require('../../actions/client_actions'),
    PostCommentIndex = require('../comments/PostCommentIndex'),
    SessionStore = require('../../stores/session');

var PostIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return ({ selectingOptions: false });
  },
  render: function () {
    return (
      <article className='timeline-feed-item'>
        <a name={this.props.post.postId}></a>
        <header className='post-breakdown group'>
          <a href={'/users/' + this.props.post.authorId}
            onClick={this.pushAuthorRoute} >
            <img src={this.props.post.postPicUrl} />
          </a>
          <div className='post-breakdown-details group'>
            <a href={'/users/' + this.props.post.authorId}
              onClick={this.pushAuthorRoute}>
              <div className='post-author-name'>
                {this.props.post.fullName}
              </div>
            </a>
            {ProfileOwner(this.props.post.profileOwner,
              this.pushProfileOwnerRoute)}
          </div>
          <br />
          <div className='post-datetime-container group'>
            <div className='post-datetime'>
              {this.props.post.createdAt}
            </div>
          </div>
          {this.renderOptions()}
        </header>
        <section className='post-body'>
          {this.props.post.body}
        </section>
        {TaggedFriends(this.props.post.taggedFriends, this.pushUserRoute)}
        <PostCommentIndex post={this.props.post} />
      </article>
    );
  },
  renderOptions: function () {
    if (this.authorizedToEdit()) {
      return <Options post={this.props.post} />;
    }
  },
  componentDidMount: function () {
    ClientActions.fetchComments('Post', this.props.post.postId);
  },
  authorizedToEdit: function () {
    return this.props.post.authorId === SessionStore.currentUser().id;
  },
  pushAuthorRoute: function (e) {
    e.preventDefault();
    this.context.router.push(e.currentTarget.pathname);
  },
  pushProfileOwnerRoute: function (e) {
    e.preventDefault();
    this.context.router.push(e.target.pathname);
  },
  pushUserRoute: function (e) {
    e.preventDefault();
    this.context.router.push(e.target.pathname);
  }
});

module.exports = PostIndexItem;
