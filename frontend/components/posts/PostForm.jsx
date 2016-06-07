var React = require('react'),
    ClientActions = require('../../actions/client_actions'),
    SessionStore = require('../../stores/session');

var PostForm = React.createClass({
  getInitialState: function () {
    return({postBody: ''});
  },
  render: function () {
    var currentUser = SessionStore.currentUser();

    return (
      <section id='post-form-section'
        className='subcontent-container profile-post'>
        <div className='post-types-background'>
          <header className='post-types'>
              <img src='https://s3.amazonaws.com/faceplace-dev/assets/post_status.png' className='post-type-img' />
              <div className='post-type-text'>
                Status
              </div>
          </header>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className='post-form'>

            <img src={SessionStore.currentUser().postPicUrl}
              className='post-pic'/>
            <textarea className='post-textarea'
              onChange={this.onPostBodyChange}
              value={this.state.postBody}
              placeholder={'What\'s on your mind, ' + SessionStore.currentUser().first_name + '?'} >

            </textarea>
          </div>
          <footer>
            <div className='post-footer-background'>
              <div className='post-footer-buttons'>
                <button className='button button-blue button-post'>
                  Post
                </button>
              </div>
            </div>
          </footer>
        </form>
      </section>
    );
  },
  onPostBodyChange: function (e) {
    this.setState({postBody: e.target.value});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    if (this.state.postBody.length < 1) { return; }
    var post = {
      body: this.state.postBody
    };

    this.setState({
      postBody: ''
    }, function () {
      ClientActions.submitPost(post);
    });
  }
});


module.exports = PostForm;
