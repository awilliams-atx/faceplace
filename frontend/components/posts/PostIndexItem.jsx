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
      <article id={this.props.post.postId} className='timeline-feed-item'
        style={{width: this.articleWidth()}}>
        <div className='post-head'>
          {this.renderOptions()}
          <header className='post-breakdown group'>
            <a href={'/users/' + this.props.post.authorId}
              onClick={this.pushAuthorRoute} >
              <img src={this.props.post.postPicUrl} />
            </a>
            <div className='post-breakdown-text'>
              <div className='post-breakdown-users group'>
                <div className='post-author-name'>
                  <a href={'/users/' + this.props.post.authorId}
                    onClick={this.pushAuthorRoute}>
                      {this.props.post.fullName}
                  </a>
                </div>
                {ProfileOwner(this.props.post.profileOwner,
                  this.pushProfileOwnerRoute)}
              </div>
              <div className='post-breakdown-datetime group'>
                <div className='post-datetime'>
                  {Util.moment(this.props.post.createdAt)}
                </div>
              </div>
            </div>
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
  articleWidth: function () {
    if (window.location.pathname.match('/users/')) {
      return '510px';
    } else {
      return '502px';
    }
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
