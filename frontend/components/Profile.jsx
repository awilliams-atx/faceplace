var React = require('react'),
    Nav = require('./Nav'),
    IntroIndex = require('./intro/IntroIndex'),
    IntroApiUtil = require('../util/intro_api_util'),
    SessionStore = require('../stores/session');

var Profile = React.createClass({
  render: function () {
    IntroApiUtil.fetchIntro(this.props.params.userId);
    var userIsProfileOwner =
      SessionStore.currentUser().id === parseInt(this.props.params.userId);

    return (
      <div className='content'>
        <Nav />
        <section className='sub-content'>
          <IntroIndex userIsProfileOwner={userIsProfileOwner}/>
        </section>
      </div>
    );
  }
});

module.exports = Profile;
