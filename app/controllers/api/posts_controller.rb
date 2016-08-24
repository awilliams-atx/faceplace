class Api::PostsController < ApplicationController
  before_action :require_login
  after_action :add_watchings, only: :create

  def index
    if params[:profilePosts]
      user = User.find(params[:user_id])
      @posts = user.timeline_posts.includes(:author, :profile_owner,
        :tagged_friends)
    end
    render 'api/posts/index'
  end

  def create
    @post = Post.new(author_id: current_user.id, body: post_params[:body])
    @post.save!

    if post_params[:tagged_ids]
      post_params[:tagged_ids].each do |user_id|
        tagging = Tagging.new(tagged_id: user_id, post_id: @post.id)
        tagging.save!
        tagging.make_notification(notifier_id: current_user.id,
          notified_user_id: user_id)
        Pusher.trigger('notifications_' + user_id, 'notification_received', {})
      end
    end

    profile_owner_id = post_params[:profile_owner_id]
    if profile_owner_id.to_i != current_user.id
      timeline_posting =
        TimelinePosting.new(profile_owner_id: profile_owner_id,
          post_id: @post.id)
      timeline_posting.save!
      timeline_posting.make_notification(notifier_id: current_user.id,
        notified_user_id: profile_owner_id)
      Pusher.trigger('notifications_' + profile_owner_id, 'notification_received', {})
    end

    @time = @post.created_at.localtime
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

  def add_watchings
    users = [@post.author] + @post.tagged_friends
    users << @post.profile_owner if @post.profile_owner
    users.uniq.each do |user|
      Watching.create(watchable_id: @post.id, watchable_type: 'Post',
        watcher_id: user.id)
    end
  end

  def post_params
    params.require(:post).permit(:id, :body, :profile_owner_id,
      :tagged_ids => [])
  end
end
