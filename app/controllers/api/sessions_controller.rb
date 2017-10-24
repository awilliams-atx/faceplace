class Api::SessionsController < ApplicationController
  before_action :require_login, only: :destroy

  def new
  end

  def create
    @user = User.find_by_credentials(user_params)
    if @user
      log_in(@user)
      render 'api/users/current_user'
    else
      render json: {
        login: "Incorrect email or password"
      }, status: 401
    end
  end

  def omniauth_create
    @user = User.find_or_create_by_auth_hash(auth_hash)

    log_in(@user)

    redirect_to root_url + '#/'
  end

  def destroy
    log_out
    render json: {}
  end

  def show
    @user = current_user
    @developer = User.find_by(first_name: 'Andrew', last_name: 'Williams')
    if current_user
      render 'api/users/current_user'
    else
      render json: {}
    end
  end

  private

  def auth_hash
    request.env['omniauth.auth']
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
