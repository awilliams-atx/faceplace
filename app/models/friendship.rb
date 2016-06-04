class Friendship < ActiveRecord::Base
  def create
    @requester = friendship_params[:acceptor]
    @acceptor = current_user
  end

  def destroy
    @rejector = current_user
    @rejected = friendship_params[:rejected]
  end

  private

  def friendship_params
    params.require(:friendship).permit(:acceptor, :rejected)
  end
end
