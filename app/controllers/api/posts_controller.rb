class Api::PostsController < ApplicationController
  def index

    if params[:profilePosts]
      user = User.find(params[:user_id])
      @posts = user.timeline_posts.includes(:author, :profile_owner, :tagged_friends)
    else
    end
    render 'api/posts/index'
  end

  def create
    @post = Post.new(author_id: current_user.id, body: post_params[:body])

    taggings = []
    post_params[:tagged_ids] && post_params[:tagged_ids].each do |user_id|
      tagging = Tagging.new(tagged_id: user_id)
      taggings << tagging
    end

    profile_owner_id = post_params[:profile_owner_id]
    if profile_owner_id.to_i != current_user.id
      timeline_posting = TimelinePosting.new(
      profile_owner_id: profile_owner_id,
      author_id: current_user.id
      )
    end

    @post.save!
    @post.taggings = taggings
    @post.timeline_posting = timeline_posting if timeline_posting

    @time = @post.created_at.localtime
    render 'api/posts/show'
  end

  private

  def post_params
    params.require(:post).permit(:body, :profile_owner_id, :tagged_ids => [])
  end
end
