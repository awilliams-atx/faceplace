var React = require('react'),
    IntroItemDescription = require('./IntroItemDescription'),
    IntroItemDouble = require('./IntroItemDouble'),
    IntroItemSingle = require('./IntroItemSingle'),
    PolyIntroItem = require('./PolyIntroItem');

var IntroIndex = React.createClass({
  render: function () {
    return (
      <section id='intro-index'
        className='profile-aside-item subcontent-container'>
        <img src={window.intro_icon} className='icon'/>
        <h2>Intro</h2>
        <div className='intro-line'>
          <IntroItemDescription
            authorizedToEdit={this.props.authorizedToEdit} />
        </div>
        <hr />
        <table>
          <tbody>
            <tr>
              <td className='intro-img' id='intro-work-img'></td>
              <td>
                <IntroItemDouble
                  authorizedToEdit={this.props.authorizedToEdit}
                  item1='position'
                  placeholder1='Position'
                  item2='company'
                  placeholder2='Company'
                  toFormattedString={this.formattedWorkString} />
              </td>
            </tr>
            <tr>
              <td className='intro-img' id='intro-school-img'></td>
              <td>
                <IntroItemDouble
                  authorizedToEdit={this.props.authorizedToEdit}
                  item1='major'
                  placeholder1='Major'
                  item2='school'
                  placeholder2='School'
                  toFormattedString={this.formattedSchoolString} />
              </td>
            </tr>
            <tr>
              <td className='intro-img' id='intro-location-img'></td>
              <td>
                <PolyIntroItem
                  authorizedToEdit={this.props.authorizedToEdit}
                  items={[{ name: 'location', placeholder: 'Location' }]} toFormattedString={this.formatLocation} />
              </td>
            </tr>
            <tr>
              <td className='intro-img' id='intro-hometown-img'></td>
              <td>
                <IntroItemSingle
                  authorizedToEdit={this.props.authorizedToEdit}
                  item='hometown'
                  prompt='Where are you from?'
                  placeholder='Hometown' />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  },
  formatLocation: function (state) {
    if (state.location) {
      return state.location;
    } else {
      return 'Where do you live?';
    }
  },
  formattedSchoolString: function (state) {
    if (state.major && state.school) {
      return state.major + ' at ' + state.school;
    } else if (state.major) {
      return state.major;
    } else if (state.school) {
      return state.school;
    } else {
      return 'What\'s your education?';
    }
  },
  formattedWorkString: function (state) {
    if (state.position && state.company) {
      return state.position + ' at ' + state.company;
    } else if (state.position) {
      return state.position;
    } else if (state.company) {
      return state.company;
    } else {
      return 'Where do you work?';
    }
  }
});

module.exports = IntroIndex;
