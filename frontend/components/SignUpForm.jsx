var React = require('react'),
    UserApiUtil = require('../util/user_api_util');

var SignUpForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  },
  render: function () {
    return (
      <div id='sign-up-content' className='group'>
        <section id='propaganda'>
          <h1>Face it. You pretty much have to use this website.</h1>
            <div className='propaganda-line group'>
              <div className='propaganda-image'>
                <img src={window.feedUrl}/>
              </div>
              <div className='propaganda-text'>
                <span className='bold-text'>Faces </span> to feed on.
              </div>
            </div>
            <div className='propaganda-line group'>
              <div className='propaganda-image'>
                <img src={window.timelineUrl}/>
              </div>
              <div className='propaganda-text'>
                <span className='bold-text'>Face</span> the sands of time.
              </div>
            </div>
            <div className='propaganda-line group'>
              <div className='propaganda-image'>
                <img src={window.searchUrl}/>
              </div>
              <div className='propaganda-text'>
                <span className='bold-text'>The perfect face </span> is one search away.
              </div>
            </div>
        </section>

        <section id='sign-up'>
          <h1>Sign Up</h1>
          <div id="consolation">It's free and you pretty much have no choice.</div>
          <form id="sign-up-form" onSubmit={this._handleSubmit}>

            <input onChange={this._firstNameChange}
                   value={this.state.firstName}
                   placeholder='First name'
            />

            <input onChange={this._lastNameChange}
                   value={this.state.lastName}
                   placeholder='Last name'

            />

            <input onChange={this._emailChange}
                   value={this.state.email}
                   id='email'
                   placeholder='Email'
            />

            <input type='password'
                   onChange={this._passwordChange}
                   value={this.state.password}
                   placeholder='Password'
            />

            <button>Give In</button>
          </form>
        </section>
      </div>
    );
  },
  _firstNameChange: function (e) {
    this.setState({firstName: e.target.value});
  },
  _lastNameChange: function (e) {
    this.setState({lastName: e.target.value});
  },
  _emailChange: function (e) {
    this.setState({email: e.target.value});
  },
  _passwordChange: function (e) {
    this.setState({password: e.target.value});
  },
  _handleSubmit: function (e) {
    console.log("signUpForm#_handleSubmit");
    e.preventDefault();
    UserApiUtil.signUp({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }, function () {
      this.context.router.push('/main');
    }.bind(this));

  }
});

module.exports = SignUpForm;
