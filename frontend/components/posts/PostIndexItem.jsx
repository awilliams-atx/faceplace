var React = require('react'),
    UI = require('../../util/ui'),
    Util = require('../../util/general'),
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
      <article id={this.props.post.postId} className='timeline-feed-item'>
        <div className='post-head'>
          <header className='post-breakdown group'>
            <a href={'/users/' + this.props.post.authorId}
              onClick={this.pushAuthorRoute} >
              <img src={this.props.post.postPicUrl} />
            </a>
            <div className='post-breakdown-details group'>
              <div className='post-author-name'>
                <a href={'/users/' + this.props.post.authorId}
                  onClick={this.pushAuthorRoute}>
                    {this.props.post.fullName}
                </a>
              </div>
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
        </div>
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
    UI.scrollToPost(this.props.post.postId);
  },
  authorizedToEdit: function () {
    return this.props.post.authorId === SessionStore.currentUser().id;
  },
  pushAuthorRoute: function (e) {
    e.preventDefault();
    this.context.router.push(e.currentTarget.pathname);
    Util.jumpToTop();
  },
  pushProfileOwnerRoute: function (e) {
    e.preventDefault();
    this.context.router.push(e.target.pathname);
    Util.jumpToTop();
  },
  pushUserRoute: function (e) {
    e.preventDefault();
    this.context.router.push(e.target.pathname);
    Util.jumpToTop();
  }
});

module.exports = PostIndexItem;
