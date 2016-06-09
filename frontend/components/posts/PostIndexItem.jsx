var React = require('react');

var PostIndexItem = React.createClass({
  render: function () {
    var post = this.props.post,
        authorUrl = '#/users/' + post.authorId,
        taggedFriends = post.taggedFriends,
        withText = '';

    if (taggedFriends.length > 0) {
      withText = '—with ';

      taggedFriends = taggedFriends.map(function (friend, idx) {
        var separator = ', ';

        if (taggedFriends.length === 2) {
          if (idx === taggedFriends.length - 2) {
            separator = ' and ';
          }
        } else if (taggedFriends.length > 2) {
          if (idx === taggedFriends.length - 2) {
            separator = ', and ';
          }
        }

        if (idx === taggedFriends.length -1) {
          separator = '';
        }

        return (
          <span>
            <a href={'#/users/' + friend.taggedId}
              key={idx}>
              {friend.fullName}
            </a>
            {separator}
          </span>
        );
      });
    } else {
      taggedFriends = <span className='empty-post-tagged-friends'></span>;
    }

    var postOptionsIconUrl = 'https://s3.amazonaws.com/faceplace-dev/assets/post_options_icon.png',
        friendTimelinePostIconUrl = 'https://s3.amazonaws.com/faceplace-dev/assets/friend_timeline_post_icon.png';

    var friendPostBreakdown =
      <div className='empty-friend-post-breakdown'/>,
        friendProfileOwner = this.props.post.profileOwner,
        friendPostBreakdownImg =
      <div className='empty-friend-post-breakdown-img' />;

    if (friendProfileOwner) {
      friendPostBreakdownImg = <img src={friendTimelinePostIconUrl} />;
      friendPostBreakdown = (
        <div className='friend-post-breakdown'>
          <a href={'#/users/' + friendProfileOwner.userId}>
            {friendProfileOwner.fullName}
          </a>
        </div>
      );
    }

    return (
      <article className='timeline-feed-item'>
        <header className='post-breakdown group'>
          <a href={authorUrl}>
            <img src={post.postPicUrl} />
          </a>
          <div className='post-breakdown-details group'>
            <a href={authorUrl}>
              <div className='post-author-name'>{post.fullName}</div>
            </a>
            {friendPostBreakdownImg}
            {friendPostBreakdown}
          </div>
          <br />
          <div className='post-datetime-container group'>
            <div className='post-datetime'>{post.createdAt}</div>
          </div>
        </header>
        <section className='post-body'>
          {post.body}
        </section>
        <div className='post-tagged-friends'>
          <span className='post-tagged-friends-with'>{withText}</span>
          {taggedFriends}
        </div>
      </article>
    );
  }

});

module.exports = PostIndexItem;
