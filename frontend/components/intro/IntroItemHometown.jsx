var React = require('react'),
    IntroApiUtil = require('../../util/intro_api_util'),
    IntroStore = require('../../stores/intro');

var IntroItemHometown = React.createClass({
  getInitialState: function () {
    return ({
      editing: false,
      hometown: IntroStore.hometown()
    });
  },
  render: function () {
    if (this.state.editing)
    {
      return (
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.hometown}
            ref='autoFocus'
            placeholder={'Where are you from?'}
            onChange={this.onFormChange} />

          <div className='buttons'>
            <button>Submit</button>
            <button onClick={this.toggleEdit}>Cancel</button>
          </div>
        </form>
      );
    } else {
      return (
        <div className='intro-item-text' onClick={this.clickHandler}>
          {this.state.hometown ? this.state.hometown : 'Where are you from?'}
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
      hometown: this.state.hometown
    });
  },
  onFormChange: function (e) {
    this.setState({hometown: e.target.value});
  },
  onStoreChange: function (e) {
    this.setState({hometown: IntroStore.hometown()});
  }
});

module.exports = IntroItemHometown;
