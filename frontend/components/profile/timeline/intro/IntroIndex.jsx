var React = require('react'),
    ProfileStore = require('../../../../stores/profile'),
    IntroItemDescription = require('./IntroItemDescription'),
    IntroItemWork = require('./IntroItemWork'),
    IntroItemSchool = require('./IntroItemSchool'),
    IntroItemLocation = require('./IntroItemLocation'),
    IntroItemHometown = require('./IntroItemHometown');

var IntroIndex = React.createClass({
  render: function () {
    console.log('IntroIndex#render');
    return (
      <div id='intro-index'>
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
                <IntroItemWork
                  authorizedToEdit={this.props.authorizedToEdit} />
              </td>
            </tr>

            <tr>
              <td className='intro-img' id='intro-school-img'></td>
              <td>
                <IntroItemSchool
                  authorizedToEdit={this.props.authorizedToEdit} />
              </td>
            </tr>

            <tr>
              <td className='intro-img' id='intro-location-img'></td>
              <td>
                <IntroItemLocation
                  authorizedToEdit={this.props.authorizedToEdit} />
              </td>
            </tr>

            <tr>
              <td className='intro-img' id='intro-hometown-img'></td>
              <td>
                <IntroItemHometown
                  authorizedToEdit={this.props.authorizedToEdit} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    );
  }
});

module.exports = IntroIndex;
