var React = require('react'),
    IntroApiUtil = require('../../util/intro_api_util'),
    IntroStore = require('../../stores/intro');

var IntroItemSchool = React.createClass({
  getInitialState: function () {
    return ({
      editing: false,
      major: IntroStore.major(),
      school: IntroStore.school()
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
        <div className='intro-item-text' onClick={this.clickHandler}>
          {studyString}
        </div>
      );
    }
  },
  componentDidMount: function () {
    this.IntroListener = IntroStore.addListener(this.onIntroStoreChange);
    this.FormListener = FormStore.addListener(this.onFormStoreChange);
  },
  componentWillUnmount: function () {
    this.IntroListener.remove();
    this.FormListener.remove();
  },
  clickHandler: function (e) {
    e.preventDefault();
    if (!this.props.currentUserIsProfileOwner) { return; }
    this.setState({
      editing: true
    }, function () {
      this.refs.autoFocus.focus();
    });
  },
  cancel: function (e) {
    e.preventDefault();
    this.setState({
      school: IntroStore.school(),
      major: IntroStore.major()
    }, function () {
    this.toggleEdit();
  });
  },
  toggleEdit: function () {
    this.setState({
      editing: !this.state.editing
    });
  },
  handleSubmit: function (e) {
    e.preventDefault();
    this.toggleEdit();
    IntroApiUtil.setIntro({
      major: this.state.major,
      school: this.state.school
    });
  },
  onSchoolChange: function (e) {
    this.setState({school: e.target.value});
  },
  onMajorChange: function (e) {
    this.setState({major: e.target.value});
  },
  onIntroStoreChange: function (e) {
    this.setState({
      school: IntroStore.school(),
      major: IntroStore.major()
    });
  },
  onFormStoreChange: function (e) {
    if (FormStore.isOpen('INTRO_SCHOOL') && !this.state.editing) {
      this.setState({editing: true});
    } else if (!FormStore.isOpen('INTRO_SCHOOL') && this.state.editing) {
      this.setState({editing: false});
    }
  }
});

module.exports = IntroItemSchool;
