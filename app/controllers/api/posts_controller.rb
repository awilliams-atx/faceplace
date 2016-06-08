class Api::PostsController < ApplicationController
  def index

    if params[:profilePosts]
      @author = User.find(params[:user_id])
      @posts = @author.posts
        .order("posts.updated_at DESC")
        .limit(10)

        render 'api/posts/profile_posts_index'
    else
      render 'api/posts/index'
    end
  end

  def create
    @post = Post.create(author_id: current_user.id, body: post_params[:body])
    @time = @post.created_at.localtime
    render 'api/posts/show'
  end

  private

  def post_params
    params.require(:post).permit(:body)
  end
end
