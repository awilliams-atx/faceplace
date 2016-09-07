var React = require('react'),
    UI = require('../../util/ui'),
    Util = require('../../util/general'),
    ImageList = require('./ImageList'),
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
    return ({
      authorizedToComment: SessionStore.authorizedToCommentOn(this.props.post),
      selectingOptions: false
    });
  },
  render: function () {
    return (
      <article id={this.props.post.postId} className='timeline-feed-item'
        style={this.style()}>
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
          <section className='post-images'>
            {ImageList(this.props.post.images)}
          </section>
          {TaggedFriends(this.props.post.taggedFriends, this.pushUserRoute)}
        </div>
        <PostCommentIndex authorizedToComment={this.state.authorizedToComment}
          post={this.props.post} />
      </article>
    );
  },
  renderOptions: function () {
    if (this.authorizedToEdit()) {
      return <Options post={this.props.post} />;
    }
  },
  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this.onSessionStoreChange);
    ClientActions.fetchComments('Post', this.props.post.postId);
    setTimeout(function () {
      UI.scrollToPost(this.props.post.postId);
    }.bind(this), 1000);
  },
  componentWillUnmount: function () {
    this.sessionListener.remove();
  },
  authorizedToEdit: function () {
    return this.props.post.authorId === SessionStore.currentUser().id;
  },
  onSessionStoreChange: function () {
    this.setState({
      authorizedToComment: SessionStore.authorizedToCommentOn(this.props.post)
    });
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
  },
  style: function () {
    var onTimeline = window.location.pathname.match('/users/') ? true : false;
    return {
      marginBottom: onTimeline ? '20px' : '10px',
      width: onTimeline ? '510px' : '502px'
    }
  }
});

module.exports = PostIndexItem;
