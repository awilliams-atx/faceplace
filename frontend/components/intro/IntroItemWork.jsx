var React = require('react'),
    IntroApiUtil = require('../../util/intro_api_util'),
    IntroStore = require('../../stores/intro');

var IntroItemWork = React.createClass({
  getInitialState: function () {
    return ({
      editing: false,
      company: IntroStore.company(),
      position: IntroStore.position()
    });
  },
  render: function () {
    var workString = 'What do you do?';
    if (this.state.position && this.state.company) {
      workString = this.state.position + " at " + this.state.company;
    } else if (this.state.position) {
      workString = this.state.position;
    } else if (this.state.company) {
      workString = 'Works at ' + this.state.company;
    }
    if (this.state.editing) {
      return (
        <form onSubmit={this.handleSubmit}
              onBlur={this.onBlur}>
          <input value={this.state.position || ''}
            placeholder='What do you do?'
            onChange={this.onPositionChange}
            ref='autoFocus' />

          <input value={this.state.company || ''}
            placeholder='Where do you work?'
            onChange={this.onCompanyChange} />

          <div className='buttons'>
            <button>Submit</button>
            <button onClick={this.cancel}>Cancel</button>
          </div>
        </form>
      );
    } else {
      return (
        <div className='intro-item-text' onClick={this.clickHandler}>
          <div>
            {workString}
          </div>
          <div className='editButton'></div>
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
      position: IntroStore.position(),
      company: IntroStore.company()
    }, this.toggleEdit);
  },
  toggleEdit: function () {
    this.setState({editing: !this.state.editing});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    this.setState({
      editing: false
    });
    IntroApiUtil.setIntro({
      company: this.state.company,
      position: this.state.position
    });
  },
  onPositionChange: function (e) {
    this.setState({position: e.target.value});
  },
  onCompanyChange: function (e) {
    this.setState({company: e.target.value});
  },
  onIntroStoreChange: function (e) {
    this.setState({
      position: IntroStore.position(),
      company: IntroStore.company()
    });
  },
  onFormStoreChange: function (e) {
    if (FormStore.isOpen('INTRO_WORK') && !this.state.editing) {
      this.setState({editing: true});
    } else if (!FormStore.isOpen('INTRO_WORK') && this.state.editing) {
      this.setState({editing: false});
    }
  }
});

module.exports = IntroItemWork;
