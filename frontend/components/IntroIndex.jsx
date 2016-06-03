var React = require('react'),
    IntroStore = require('../stores/intro'),
    IntroItem = require('./IntroItem'),
    IntroApiUtil = require('../util/intro_api_util'),
    IntroItemDouble = require('./IntroItemDouble');

var IntroIndex = React.createClass({
  getInitialState: function () {
    var intro = IntroStore.intro();
    return {intro: {}};
  },
  componentDidMount: function () {
    this.introListener = IntroStore.addListener(this._onChange);
    IntroApiUtil.fetchIntro();
  },
  componentWillUnmount: function () {
    this.introListener.remove();
  },
  render: function () {
    var intro = this.state.intro;
    return (
      <div id='intro-index'>
        <img src={window.intro_icon} className='icon'/>
        <h2>Intro</h2>

        <div className='intro-description'>
          <IntroItem itemType='description'
                     item={intro.description}
                     prompt={'Tell everyone about yourself.'} />
        </div>

        <hr />

        <div className='intro-work'>
          <div className='intro-img' id='intro-work-img'></div>
          <IntroItemDouble itemType='work'
                     firstItem={this.state.intro.position}
                     secondItem={this.state.intro.company}
                     firstPrompt={'What do you do?'}
                     secondPrompt={'Where do you work?'} />
        </div>

        <div className='intro-school'>
          <div className='intro-img' id='intro-school-img'></div>
          <IntroItemDouble itemType='study'
                     firstItem={this.state.intro.major}
                     secondItem={this.state.intro.school}
                     firstPrompt={'What did you study?'}
                     secondPrompt={'Where did you go to school?'} />
        </div>

        <div className='intro-location'>
          <div className='intro-img' id='intro-location-img'></div>
          <IntroItem itemType='location'
                     item={this.state.intro.location}
                     prompt={'Where do you live?'} />
        </div>

        <div className='intro-hometown'>
          <div className='intro-img' id='intro-hometown-img'></div>
          <IntroItem itemType='hometown'
                     item={this.state.intro.hometown}
                     prompt={'Where are you from?'} />
        </div>
      </div>

    );
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
