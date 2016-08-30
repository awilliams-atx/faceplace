class Api::WatchingsController < ApplicationController
  def create
    current_user = { id: 100000 }
    watching = Watching.create!(watching_params.merge(watcher_id:
      current_user[:id]))
    render json: { watcher_id: watching.watcher_id, watchable_type:
      watching.watchable_type, watchable_id: watching.watchable_id }
  end

  def destroy
    current_user = { id: 100000 }
    watching = Watching.find_by(watching_params.merge(watcher_id:
      current_user[:id]))
    watching.destroy
    render json: { watcher_id: watching.watcher_id, watchable_type:
      watching.watchable_type, watchable_id: watching.watchable_id }
  end

  private

  def watching_params
    params.require(:watching).permit(:watchable_id, :watchable_type)
  end
end
