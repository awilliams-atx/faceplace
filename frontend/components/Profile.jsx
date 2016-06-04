var React = require('react'),
    Nav = require('./Nav'),
    IntroIndex = require('./intro/IntroIndex'),
    IntroApiUtil = require('../util/intro_api_util');

var Profile = React.createClass({
  render: function () {
    IntroApiUtil.fetchIntro(this.props.params.userId);
    return (
      <div className='content'>
        <Nav />
        <section className='sub-content'>
          <IntroIndex />
        </section>
      </div>
    );
  }
});

module.exports = Profile;
