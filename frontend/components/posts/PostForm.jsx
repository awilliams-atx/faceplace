var React = require('react'),
    SessionStore = require('../../stores/session');

var PostForm = React.createClass({
  render: function () {
    var currentUser = SessionStore.currentUser();

    return (
      <section id='post-form-section' className='subcontent-container'>
        <div className='post-types-background'>
          <header className='post-types'>
              <img src='https://s3.amazonaws.com/faceplace-dev/assets/post_status.png' className='post-type-img' />
              <div className='post-type-text'>
                Status
              </div>
          </header>
        </div>
        <div className='post-form'>
          <img src={SessionStore.currentUser().postPicUrl}
            className='post-pic'/>
        </div>
        <footer>
          <div className='post-footer-background'>
            <button className='button button-blue'>
              Post
            </button>
          </div>
        </footer>
      </section>
    );
  }
});


module.exports = PostForm;
