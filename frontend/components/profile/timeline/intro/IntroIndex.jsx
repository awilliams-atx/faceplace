var React = require('react'),
    IntroItemDescription = require('./IntroItemDescription'),
    IntroItemWork = require('./IntroItemWork'),
    IntroItemSchool = require('./IntroItemSchool'),
    IntroItemSingle = require('./IntroItemSingle');

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
                <IntroItemSingle
                  authorizedToEdit={this.props.authorizedToEdit}
                  item='location'
                  prompt='Where do you live?'
                  placeholder='Location' />
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
  }
});

module.exports = IntroIndex;
