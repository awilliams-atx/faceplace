var React = require('react'),
    ClientActions = require('../../../../actions/client_actions'),
    UserStore = require('../../../../stores/user');

var IntroItemSchool = React.createClass({
  getInitialState: function () {
    return ({
      editing: false,
      major: UserStore.user().major,
      school: UserStore.user().school
    });
  },
  render: function () {
    var studyString = 'What\'s your area of study?';
    if (this.state.major && this.state.school) {
      studyString = "Studied " + this.state.major + " at " + this.state.school;
    } else if (this.state.major) {
      studyString = 'Studied ' + this.state.major;
    } else if (this.state.school) {
      studyString = 'Studied ' + this.state.school;
    }

    if (this.state.editing) {
      return (
        <form onSubmit={this.handleSubmit} >

          <input value={this.state.major || ''}
            ref='autoFocus'
            placeholder='What is your area of study?'
            onChange={this.onMajorChange} />

          <input value={this.state.school || ''}
            placeholder='What school did you attend?'
            onChange={this.onSchoolChange} />

          <div className='buttons'>
            <button>Submit</button>
            <button onClick={this.cancel}>Cancel</button>
          </div>
        </form>
      );
    } else {
      return (
        <div className='intro-item-text' onClick={this.showEdit}>
          {studyString}
        </div>
      );
    }
  },
  componentDidMount: function () {
    this.UserListener = UserStore.addListener(this.onUserStoreChange);
  },
  componentWillUnmount: function () {
    this.UserListener.remove();
  },
  showEdit: function (e) {
    e.preventDefault();
    if (!this.props.authorizedToEdit) { return; }
    this.setState({ editing: true }, function () {
      this.refs.autoFocus.focus();
    });
  },
  cancel: function (e) {
    e.preventDefault();
    this.setState({
      school: UserStore.user().school,
      major: UserStore.user().major
    }, function () { this.toggleEdit(); });
  },
  toggleEdit: function () {
    this.setState({ editing: !this.state.editing });
  },
  handleSubmit: function (e) {
    e.preventDefault();
    this.toggleEdit();
    ClientActions.submitProfile({
      major: this.state.major,
      school: this.state.school
    });
  },
  onSchoolChange: function (e) {
    this.setState({ school: e.target.value });
  },
  onMajorChange: function (e) {
    this.setState({ major: e.target.value });
  },
  onUserStoreChange: function (e) {
    this.setState({
      school: UserStore.user().school,
      major: UserStore.user().major
    });
  }
});

module.exports = IntroItemSchool;
