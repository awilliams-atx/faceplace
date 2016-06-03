var React = require('react'),
    IntroApiUtil = require('../../util/intro_api_util'),
    IntroStore = require('../../stores/intro'),
    FormStore = require('../../stores/form');

var IntroItemDescription = React.createClass({
  getInitialState: function () {
    return ({
      editing: false,
      decription: IntroStore.description()
    });
  },
  render: function () {
    if (this.state.editing)
    {
      return (
        <div id='description-form'>
          <form onSubmit={this.handleSubmit}>
            <textarea value={this.state.description || ''}
              cols='46'
              rows='5'
              ref='autoFocus'
              placeholder='Tell everyone about yourself.'
              onChange={this.onFormChange} />

            <div className='buttons' >
              <button>Submit</button>
              <button onClick={this.cancel}>Cancel</button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className='intro-item-text-empty' onClick={this.clickHandler}>
          {this.state.description ? this.state.description : 'Tell everyone about yourself.'}
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
    this.unchangedDescription = this.state.description;
    this.setState({
      editing: true
    }, function () {
      this.refs.autoFocus.focus();
    });
  },
  toggleEdit: function () {
    this.setState({
      editing: !this.state.editing
    });
  },
  cancel: function (e) {
    e.preventDefault();
    this.setState({
      description: this.unchangedDescription
    }, this.toggleEdit);
  },
  handleSubmit: function (e) {
    e.preventDefault();
    this.setState({
      editing: false
    });
    IntroApiUtil.setIntro({
      description: this.state.description
    });
  },
  onFormChange: function (e) {
    this.setState({description: e.target.value});
  },
  onIntroStoreChange: function (e) {
    this.setState({description: IntroStore.description()});
  },
  onFormStoreChange: function (e) {
    if (FormStore.isOpen('INTRO_DESCRIPTION') && !this.state.editing) {
      this.setState({editing: true});
    } else if (!FormStore.isOpen('INTRO_DESCRIPTION') && this.state.editing) {
      this.setState({editing: false});
    }
  }
});

module.exports = IntroItemDescription;
