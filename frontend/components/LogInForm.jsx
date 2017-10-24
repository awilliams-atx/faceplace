var React = require('react'),
    SessionApiUtil = require('../util/session_api_util'),
    SignUpForm = require('./SignUpForm'),
    ErrorActions = require('../actions/error_actions'),
    ErrorStore = require('../stores/error'),
    SessionStore = require('../stores/session');

var LogInForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {
      email: "",
      password: "",
      errors: ErrorStore.errors('login'),
      loginInputClass: 'login-input'
    };
  },
  render: function () {
    var logInButton = <button className='login-button'>Log In</button>;
    if (this.state.email === "" && this.state.password === "") {
      logInButton = (
        <button onClick={this.onGuestLogin} className='login-button'>
          Guest
        </button>
      );
    }

    var errorsContent;

    if (this.state.errors) {
      errorsContent = (
        <aside className='error-container'
          id='login-errors-container'>
          {this.state.errors.login}
        </aside>
      );
    } else {
      errorsContent = <div id='empty-errors-content' />;
    }

    return (
      <div className='content'>
        <header className='welcome-header'>
          <nav className='welcome-header-nav group'>
            <a href="/"><img src={window.logoUrl} className='header-logo' /></a>
            <form onSubmit={e => this.onSubmit(e)}
                  className='log-in-form'>
              <table>
                <thead>
                  <tr>
                    <td>
                      <label htmlFor="email" ref='autoFocus'>Email</label>
                    </td>
                    <td><label htmlFor="password">Password</label></td>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td><input onChange={this.emailChange}
                      onFocus={this.onFocusLoginInput}
                      value={this.state.email}
                      id="email"
                      className={this.state.loginInputClass} /></td>
                    <td><input type="password"
                      onChange={this.passwordChange}
                      onFocus={this.onFocusLoginInput}
                      value={this.state.password}
                      id="password"
                      className={this.state.loginInputClass} /></td>
                    <td>{logInButton}</td>
                  </tr>
                </tbody>
              </table>
              {errorsContent}
            </form>
          </nav>
        </header>
        <SignUpForm />
      </div>
    );
  },
  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this.onErrorStoreChange);
    this.refs.autoFocus.focus();
    this.blurListener = this.blurListener || function blurListener (e) {
      var noBlurClassNames =
        ['login-input-error', 'error-container'];
      if (!noBlurClassNames.includes(e.target.className)) {
        ErrorActions.clearErrors('login');
        document.removeEventListener('click', this.blurListener);
      }
    }.bind(this);
  },
  componentWillUnmount: function () {
    this.errorListener.remove();
  },
  emailChange: function (e) {
    this.setState({email: e.target.value}, function () {
      if (this.state.loginInputClass === 'login-input-error') {
        this.setState({
          loginInputClass: 'login-input'
        }, function () {
          ErrorActions.clearErrors('login');
        });
      }
    });
  },
  passwordChange: function (e) {
    this.setState({password: e.target.value}, function () {
      if (this.state.loginInputClass === 'login-input-error') {
        this.setState({
          loginInputClass: 'login-input'
        }, function () {
          ErrorActions.clearErrors('login');
        });
      }
    });
  },
  onErrorStoreChange: function () {
    var errors = ErrorStore.errors('login');
    var loginInputClass = errors ? 'login-input-error' : 'login-input';
    this.setState({
      errors: errors,
      loginInputClass: loginInputClass
    }, function () {
      if (ErrorStore.lastAction('LOGIN_ERRORS_RECEIVED')) {
        document.addEventListener('click', this.blurListener);
        this.refs.autoFocus.focus();
      }
    }.bind(this));
  },
  onGuestLogin: function (e) {
    this.onSubmit(e, {
      credentials: { email: 'jeff', password: 'starwars' }
    });
  },
  onSubmit: function (e, options) {
    var credentials = {};
    e.preventDefault();

    if (options) {
      credentials = options.credentials;
    } else {
      credentials.email = this.state.email;
      credentials.password = this.state.password;
    }
    this.setState({ email: '', password: '' }, function () {
      SessionApiUtil.login(credentials, this.redirectToMain);
      ErrorActions.clearErrors();
    }.bind(this))
  },
  redirectToMain: function () {
    this.context.router.push('/');
  }
});

module.exports = LogInForm;
