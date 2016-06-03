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
end
