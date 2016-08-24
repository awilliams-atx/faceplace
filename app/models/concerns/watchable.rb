module Watchable
  extend ActiveSupport::Concern
  included do
    after_create :add_watching
    after_destroy :remove_watching
  end
end
