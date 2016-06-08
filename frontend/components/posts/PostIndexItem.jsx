var React = require('react');

var PostIndexItem = React.createClass({
  render: function () {
    var post = this.props.post;
    var authorUrl = '#/users/' + post.authorId;

    return (
      <article className='timeline-feed-item'>
        <header className='post-breakdown group'>
          <a href={authorUrl}>
            <img src={post.postPicUrl} />
          </a>
          <div className='post-breakdown-details'>
            <a href={authorUrl}>
              <span className='post-author-name'>{post.fullName}</span>
            </a>
            <br />
            <span className='post-datetime'>{post.createdAt}</span>
          </div>
        </header>
        <section className='post-body'>
          {post.body}
        </section>
      </article>
    );
  }

});

module.exports = PostIndexItem;

// json.postId post.id
// json.body post.body
// json.authorId @author.id
// json.postPicUrl @author.profile_pic.url(:post)
// json.fullName @author.full_name
//
// time = post.created_at.localtime
// json.createdAt "#{time.strftime('%B%e')} at #{time.strftime('%l')}:#{time.strftime('%M')}"
