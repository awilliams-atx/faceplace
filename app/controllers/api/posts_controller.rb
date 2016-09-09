class Api::PostsController < ApplicationController
  before_action :require_login
  after_action :push_notifications, only: :create

  def index
    if params[:user_id]
      user = User.find(params[:user_id])
      @posts = user.timeline_posts.includes(:author, :profile_owner,
        :tagged_friends).limit(10).offset(params[:offset])
    else
      @posts = Post.all.limit(10).order(created_at: :desc).offset(params[:offset])
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
    @post.add_tags = post_params[:add_tags]
    @post.remove_tags = post_params[:remove_tags]
    @post.add_images = post_params[:add_images]
    @post.remove_images = post_params[:remove_images]
    @post.update(body: post_params[:body])
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
    params.require(:post).permit(:add_tags, :id, :body, :profile_owner_id, :remove_images, :remove_tags, :tagged_ids, :add_images => [], :uploaded_images => [])
  end
end
