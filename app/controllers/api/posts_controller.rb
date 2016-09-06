class Api::PostsController < ApplicationController
  before_action :require_login
  after_action :push_notifications, only: :create

  def index
    offset = params[:offset] ? params[:offset] : 0
    if params[:user_id]
      user = User.find(params[:user_id])
      @posts = user.timeline_posts.includes(:author, :profile_owner,
        :tagged_friends).limit(10).offset(offset)
    else
      @posts = Post.all.limit(10).order(created_at: :desc).offset(offset)
    end
    render 'api/posts/index'
  end

  def create
    @post = Post.new(post_params.merge(author_id: current_user.id))
    @post.global = true unless post_params[:profile_owner_id]
    @post.save!
    render 'api/posts/show'
  end

  def update
    @post = Post.find(post_params[:id])

    @post.update(body: post_params[:body])

    taggings = []

    post_params[:tagged_ids] && post_params[:tagged_ids].each do |user_id|
      tagging = Tagging.new(tagged_id: user_id)
      taggings << tagging
    end

    @post.taggings = taggings

    render 'api/posts/show'
  end

  def destroy
    @post = Post.destroy(params[:id])
    render 'api/posts/show'
  end

  def tagged_friends
    @friends = Post.find(params[:id]).tagged_friends
    render 'api/tags/tagging_search_results'
  end

  private

  def push_notifications
    @post.taggings.each do |tagging|
      next unless tagging.notification
      @notification = tagging.notification
      rendered = render_to_string('api/notifications/show')
      Pusher.trigger("notifications_#{@notification.notified_id}", 'received',
      rendered)
    end
    if @post.profile_owner_id
      @notification = @post.timeline_posting.notification
      rendered = render_to_string('api/notifications/show')
      Pusher.trigger("notifications_#{@notification.notified_id}", 'received',
        rendered)
    end
  end

  def post_params
    params.require(:post).permit(:id, :body, :profile_owner_id,
      :tagged_ids => [])
  end
end
