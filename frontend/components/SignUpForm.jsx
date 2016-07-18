var React = require('react'),
    ErrorStore = require('../stores/error'),
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
      errors: ErrorStore.errors('signUp')
    });
  },
  render: function () {
    var firstNameError;
    var lastNameError;
    var emailError;
    var passwordError;

    if (this.state.errors) {
      var errors = this.state.errors;
      if (errors.first_name) {
        firstNameError = (
          <aside className='error-container'
            id='first-name-error-container'>
            {this.state.errors.first_name}
          </aside>
        );
      } else {
        firstNameError = <div id='empty-first-name-error' />;
      }


      if (errors.last_name) {
        lastNameError = (
          <aside className='error-container'
            id='last-name-error-container'>
            {this.state.errors.last_name}
          </aside>
        );
      } else {
        lastNameError = <div id='empty-last-name-error' />;
      }

      if (errors.email) {
        emailError = (
          <aside className='error-container'
            id='email-error-container'>
            {this.state.errors.email}
          </aside>
        );
      } else {
        emailError = <div id='empty-email-error' />;
      }

      if (errors.password) {
        passwordError = (
          <aside className='error-container'
            id='password-error-container'>
            {this.state.errors.password}
          </aside>
        );
      } else {
        passwordError = <div id='empty-password-error' />;
      }
    }

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

            <div className='sign-up-input-container group'
              id='first-name-input-container'>
              <input onChange={this._firstNameChange}
                     value={this.state.firstName}
                     placeholder='First name'
              />
              {firstNameError}
            </div>

            <div className='sign-up-input-container group'
              id='last-name-input-container'>
              <input onChange={this._lastNameChange}
                     value={this.state.lastName}
                     placeholder='Last name'
              />
              {lastNameError}
            </div>

            <div className='sign-up-input-container group'
              id='email-input-container'>
              <input onChange={this._emailChange}
                     value={this.state.email}
                     id='email'
                     placeholder='Email'
              />
              {emailError}
            </div>

            <div className='sign-up-input-container group'
              id='password-input-container'>
              <input type='password'
                     onChange={this._passwordChange}
                     value={this.state.password}
                     placeholder='Password'
              />
              {passwordError}
            </div>

            <button>Give In</button>
          </form>
        </section>
      </div>
    );
  },
  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this.onErrorStoreChange);
  },
  componentWillUnmount: function () {
    this.errorListener.remove();
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
  onErrorStoreChange: function () {
    this.setState({errors: ErrorStore.errors('signUp')});
  },
  _passwordChange: function (e) {
    this.setState({password: e.target.value});
  },
  _handleSubmit: function (e) {
    e.preventDefault();
    UserApiUtil.signUp({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }, function () {
      this.context.router.push('/users/' + SessionStore.currentUser().id);
    }.bind(this));

  }
});

module.exports = SignUpForm;
