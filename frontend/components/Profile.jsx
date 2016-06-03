var React = require('react'),
    Nav = require('./Nav'),
    IntroIndex = require('./IntroIndex');

var Profile = React.createClass({
  render: function () {
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
