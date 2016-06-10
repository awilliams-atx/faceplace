class Api::UsersController < ApplicationController
  def index
    @users = User.all
    if params[:search]
      @users = @users.reject do |user|
        user.id == current_user.id
      end
      render 'api/users/search'
    else
      render 'api/users/index'
    end
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

  def friends_for_tagging
    @friends = current_user.friends
    render 'api/friends/tagging_search_results'
  end

  def most_recently_added
    @profile_owner_id = params[:id]
    @users = User.find(params[:id]).most_recently_added
    render 'api/users/most_recently_added'
  end

  def search
    search_string = params[:search_string]
    @users = User.search(search_string)

    render 'api/users/search_index'
  end

  def update_cover_photo
    current_user.cover_photo = params[:user][:cover_photo]
    current_user.save
    render 'api/users/cover_photo'
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
