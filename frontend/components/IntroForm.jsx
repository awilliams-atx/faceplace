var React = require('react'),
    ProfileStore = require('../stores/profile'),
    ProfileActions = require('../actions/profile_actions');

var IntroForm = React.createClass({
  getInitialState: function () {
    var intro = {
      description: '',
      company: '',
      position: '',
      location: '',
      hometown: ''
    };
    return(ProfileStore.intro());
  },
  componentDidMount: function () {
    this.profileListener = ProfileStore.addListener(this._onChange);
    ProfileActions.fetchProfile();
  },
  componentWillUnmount: function () {
    this.profileListener.remove();
  },
  render: function () {
    return (
      <section>
      </section>
    );
  },
  // {description}
  // {work}
  // {location}
  // {hometown}
  _onChange: function () {
    this.setState({intro: ProfileStore.profile()});
  }
});

module.exports = IntroForm;
