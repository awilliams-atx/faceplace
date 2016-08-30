var React = require('react'),
    ErrorStore = require('../stores/error'),
    ErrorActions = require('../actions/error_actions'),
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
          <aside className='error-container sign-up-error'
            id='first-name-error-container'>
            {this.state.errors.first_name}
          </aside>
        );
      } else {
        firstNameError = <div id='empty-first-name-error' />;
      }

      if (errors.last_name) {
        lastNameError = (
          <aside className='error-container sign-up-error'
            id='last-name-error-container'>
            {this.state.errors.last_name}
          </aside>
        );
      } else {
        lastNameError = <div id='empty-last-name-error' />;
      }

      if (errors.email) {
        emailError = (
          <aside className='error-container sign-up-error'
            id='email-error-container'>
            {this.state.errors.email}
          </aside>
        );
      } else {
        emailError = <div id='empty-email-error' />;
      }

      if (errors.password) {
        passwordError = (
          <aside className='error-container sign-up-error'
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
          <div id='sign-up-header'>
            <h1>Sign Up</h1>
            <div id="consolation">It's free and you pretty much have no choice.</div>
          </div>
          <form
            id="sign-up-form"
            onSubmit={this._handleSubmit}>

            <div className='sign-up-input-container group'
              id='first-name-input-container'>
              <input onChange={this.onFirstNameChange}
                     value={this.state.firstName}
                     placeholder='First name'
                     onBlur={this.onFirstNameBlur}
                     ref='first_name'
              />
              {firstNameError}
            </div>

            <div className='sign-up-input-container group'
              id='last-name-input-container'>
              <input onChange={this.onLastNameChange}
                     value={this.state.lastName}
                     placeholder='Last name'
                     onBlur={this.onLastNameBlur}
                     ref='last_name'
              />
              {lastNameError}
            </div>

            <div className='sign-up-input-container group'
              id='email-input-container'>
              <input onChange={this.onEmailChange}
                     value={this.state.email}
                     id='email'
                     placeholder='Email'
                     onBlur={this.onEmailBlur}
                     ref='email'
              />
              {emailError}
            </div>

            <div className='sign-up-input-container group'
              id='password-input-container'>
              <input type='password'
                     onChange={this.onPasswordChange}
                     value={this.state.password}
                     placeholder='Password'
                     onBlur={this.onPasswordBlur}
                     ref='password'
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
    this.blurListener = this.blurListener || function blurListener (e) {
      var noBlurClassNames =
        ['sign-up-input', 'error-container sign-up-error'];
      if (!noBlurClassNames.includes(e.target.className)) {
        ErrorActions.clearErrors('signUp');
        document.removeEventListener('click', this.blurListener);
      }
    }.bind(this);
  },
  componentWillUnmount: function () {
    this.errorListener.remove();
  },
  focusErrorInputField: function () {
    var fields = ['first_name', 'last_name', 'email', 'password'];
    for (var i = 0; i < fields.length; i++) {
      if (this.state.errors[fields[i]]) {
        this.refs[fields[i]].focus();
        return;
      }
    }
  },
  onErrorStoreChange: function () {
    this.setState({errors: ErrorStore.errors('signUp')}, function () {
      if (ErrorStore.lastAction('SIGN_UP_ERRORS_RECEIVED')) {
        document.addEventListener('click', this.blurListener);
        this.focusErrorInputField();
      }
    }.bind(this));
  },
  onEmailBlur: function () {
    ErrorActions.clearSignUpError('email');
  },
  onEmailChange: function (e) {
    this.setState({email: e.target.value});
  },
  onFirstNameBlur: function () {
    ErrorActions.clearSignUpError('first_name');
  },
  onFirstNameChange: function (e) {
    this.setState({firstName: e.target.value});
  },
  onLastNameBlur: function () {
    ErrorActions.clearSignUpError('last_name');
  },
  onLastNameChange: function (e) {
    this.setState({lastName: e.target.value});
  },
  onPasswordBlur: function () {
    ErrorActions.clearSignUpError('password');
  },
  onPasswordChange: function (e) {
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
