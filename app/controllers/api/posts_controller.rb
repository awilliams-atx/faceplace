class Api::PostsController < ApplicationController
  def create
    @post = Post.create(user_id: current_user.id, body: post_params[:body])
    @time = @post.created_at.localtime
    render 'api/posts/show'
  end

  private

  def post_params
    params.require(:post).permit(:body)
  end
end
