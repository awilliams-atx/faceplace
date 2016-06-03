var React = require('react'),
    IntroApiUtil = require('../util/intro_api_util'),
    IntroStore = require('../stores/intro');

var IntroItemDouble = React.createClass({
  render: function () {
    return (
      <div className='intro-item-text'>
        INTRO ITEM DOUBLE!
      </div>
    );
  },
  _handleSubmit: function (e) {
    e.preventDefault();

  },
  _form: function () {
    return (
      <form onSubmit={this._handleSubmit}>
        <input value={this.state.firstItem || this.props.prompt} />
      </form>
    );
  }
});

module.exports = IntroItemDouble;
