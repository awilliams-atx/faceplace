var React = require('react'),
    IntroApiUtil = require('../../util/intro_api_util'),
    IntroStore = require('../../stores/intro');

var IntroItemLocation = React.createClass({
  getInitialState: function () {
    return ({
      editing: false,
      location: IntroStore.location()
    });
  },
  render: function () {
    if (this.state.editing) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.location || ''}
            ref='autoFocus'
            placeholder={'Where do you live?'}
            onChange={this.onFormChange} />

          <div className='buttons'>
            <button>Submit</button>
            <button onClick={this.cancel}>Cancel</button>
          </div>
        </form>
      );
    } else {
      return (
        <div className='intro-item-text' onClick={this.clickHandler}>
          {this.state.location ? this.state.location : 'Where do you live?'}
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
      location: IntroStore.location()
    }, this.toggleEdit);
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
      location: this.state.location
    });
  },
  onFormChange: function (e) {
    e.preventDefault();
    this.setState({location: e.target.value});
  },
  onIntroStoreChange: function () {
    this.setState({location: IntroStore.location()});
  },
  onFormStoreChange: function (e) {
    if (FormStore.isOpen('INTRO_LOCATION') && !this.state.editing) {
      this.setState({editing: true});
    } else if (!FormStore.isOpen('INTRO_LOCATION') && this.state.editing) {
      this.setState({editing: false});
    }
  }
});

module.exports = IntroItemLocation;
