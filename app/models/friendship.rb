class Friendship < ActiveRecord::Base
  def create
  end

  def destroy
  end

  private

  def friendship_params
    params.require(:friendship).permit(:acceptor, :rejected)
  end
end
