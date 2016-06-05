class Api::UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    render 'api/users/show'
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      render 'api/users/current_user'
    else
      render json: @user.errors, status: 422
    end
  end

  def update
    @user = current_user
    @user.update(profile_params)
    render 'api/users/show'
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :password, :email,)
  end

  def profile_params
    params.require(:profile)
      .permit(:description,
        :company,
        :position,
        :school,
        :major,
        :hometown,
        :location
        )
  end

  def search_params
    params.require(:search).permit(:search_string)
  end
end
