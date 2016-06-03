var React = require('react'),
    IntroStore = require('../../stores/intro'),
    IntroApiUtil = require('../../util/intro_api_util'),
    IntroItemDescription = require('./IntroItemDescription'),
    IntroItemWork = require('./IntroItemWork'),
    IntroItemSchool = require('./IntroItemSchool'),
    IntroItemLocation = require('./IntroItemLocation'),
    IntroItemHometown = require('./IntroItemHometown');

var IntroIndex = React.createClass({
  render: function () {
    return (
      <div id='intro-index'>
        <img src={window.intro_icon} className='icon'/>
        <h2>Intro</h2>

        <div className='intro-line'>
          <IntroItemDescription itemType='description' />
        </div>

        <hr />

        <table>
          <tbody>
            <tr>
              <td className='intro-img' id='intro-work-img'></td>
              <td><IntroItemWork /></td>
            </tr>
            <tr>
              <td className='intro-img' id='intro-school-img'></td>
              <td><IntroItemSchool /></td>
            </tr>
            <tr>
              <td className='intro-img' id='intro-location-img'></td>
              <td><IntroItemLocation /></td>
            </tr>
            <tr>
              <td className='intro-img' id='intro-hometown-img'></td>
              <td><IntroItemHometown /></td>
            </tr>
          </tbody>
        </table>
      </div>

    );
  },
  componentDidMount: function () {
    IntroApiUtil.fetchIntro();
  },
  _onChange: function () {
    var emptyState = {
      position: '',
      company: '',
      school: '',
      location: '',
      hometown: ''
    };
    var fetchedIntro = IntroStore.intro();
    this.setState({intro: IntroStore.intro()});
  },
  toggleHometownForm: function () {
    this.setState({
      editing: true,
    });
  }
});

module.exports = IntroIndex;


// var intro = {
//   description: '',
//   company: '',
//   position: '',
//   location: '',
//   hometown: ''
// };
