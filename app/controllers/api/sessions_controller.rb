class Api::SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_credentials(user_params)
    if @user
      log_in(@user)
      render 'api/users/current_user'
    else
      render json: {
        base: "Incorrect email or password"
      }, status: 401
    end
  end

  def omniauth_create
    debugger
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
    if current_user
      render 'api/users/current_user'
    else
      render json: {}
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def auth_hash
    request.env['omniauth.auth']
  end
end
