class Api::PostsController < ApplicationController
  def index

    if params[:profilePosts]
      @author = User.find(params[:user_id])
      @posts = @author.posts
        .order("posts.updated_at DESC")
        .limit(10)

    else
    end
    render 'api/posts/index'
  end

  def create
    @post = Post.new(author_id: current_user.id, body: post_params[:body])

    taggings = []

    post_params[:tagged_ids].each do |user_id|
      tagging = Tagging.new(tagged_id: user_id)
      taggings << tagging
    end

    @post.save!
    @post.taggings = taggings

    @time = @post.created_at.localtime
    render 'api/posts/show'
  end

  private

  def post_params
    params.require(:post).permit(:body, :tagged_ids => [])
  end
end
