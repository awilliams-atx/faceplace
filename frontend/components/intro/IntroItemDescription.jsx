var React = require('react'),
    IntroApiUtil = require('../../util/intro_api_util'),
    IntroStore = require('../../stores/intro');

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
            <textarea value={this.state.description}
              cols='46'
              rows='5'
              ref='autoFocus'
              placeholder='Tell everyone about yourself.'
              onBlur={this.toggleEdit}
              onChange={this.onFormChange} />
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
    this.IntroListener = IntroStore.addListener(this.onStoreChange);
  },
  componentWillUnmount: function () {
    this.IntroListener.remove();
  },
  clickHandler: function (e) {
    e.preventDefault();
    this.setState({
      editing: true
    }, function () {
      this.refs.autoFocus.focus();
    });
  },
  toggleEdit: function (e) {
    e.preventDefault();
    this.setState({
      editing: !this.state.editing
    });
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
  onStoreChange: function (e) {
    this.setState({description: IntroStore.description()});
  }
});

module.exports = IntroItemDescription;
