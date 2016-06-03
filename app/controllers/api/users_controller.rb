class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      render 'api/users/current_user'
    else
      render json: @user.errors, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    render 'api/users/show'
  end

  def update
    @user = current_user
    current_user.update(intro_params)
    render 'api/users/show'
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :password, :email,)
  end

  def intro_params
    params.require(:intro)
      .permit(:description,
        :company,
        :position,
        :school,
        :major,
        :hometown,
        :location
        )
  end
end
