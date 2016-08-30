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
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      errors: ErrorStore.errors('signUp')
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
          <div id='sign-up-header'>
            <h1>Sign Up</h1>
            <div id="consolation">It's free and you pretty much have no choice.</div>
          </div>
          <form id="sign-up-form" onSubmit={this.onSubmit}>
            <div className='sign-up-input-container group'>
              <input onBlur={this.onFirstNameBlur}
                onChange={this.onFirstNameChange}
                placeholder='First name'
                ref='first_name'
                value={this.state.first_name} />
              {this.renderError('first_name')}
            </div>

            <div className='sign-up-input-container group'>
              <input onBlur={this.onLastNameBlur}
                onChange={this.onLastNameChange}
                placeholder='Last name'
                ref='last_name'
                value={this.state.last_name} />
              {this.renderError('last_name')}
            </div>

            <div className='sign-up-input-container group'>
              <input id='email'
                onBlur={this.onEmailBlur}
                onChange={this.onEmailChange}
                placeholder='Email'
                ref='email'
                value={this.state.email} />
              {this.renderError('email')}
            </div>

            <div className='sign-up-input-container group'>
              <input onBlur={this.onPasswordBlur}
                onChange={this.onPasswordChange}
                placeholder='Password'
                ref='password'
                type='password'
                value={this.state.password} />
              {this.renderError('password')}
            </div>

            <button>Give In</button>
          </form>
        </section>
      </div>
    );
  },
  renderError: function (errorName) {
    if (this.state.errors && this.state.errors[errorName]) {
      return (
        <aside className='error-container sign-up-error' >
          {this.state.errors[errorName]}
        </aside>
      );
    }
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
    this.setState({first_name: e.target.value});
  },
  onLastNameBlur: function () {
    ErrorActions.clearSignUpError('last_name');
  },
  onLastNameChange: function (e) {
    this.setState({last_name: e.target.value});
  },
  onPasswordBlur: function () {
    ErrorActions.clearSignUpError('password');
  },
  onPasswordChange: function (e) {
    this.setState({password: e.target.value});
  },
  onSubmit: function (e) {
    e.preventDefault();
    UserApiUtil.signUp({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    }, function () {
      this.context.router.push('/users/' + SessionStore.currentUser().id);
    }.bind(this));

  }
});

module.exports = SignUpForm;
