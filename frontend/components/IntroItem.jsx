var React = require('react'),
    IntroApiUtil = require('../util/intro_api_util'),
    IntroStore = require('../stores/intro');

var IntroItem = React.createClass({
  render: function () {
    return (
      <div className='intro-item-text'>
        INTRO ITEM SINGLE!
      </div>
    );
  },
  _handleSubmit: function (e) {
    e.preventDefault();

  },
  _form: function () {

  }
});

module.exports = IntroItem;
