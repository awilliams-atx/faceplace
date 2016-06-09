
```Ruby
has_attached_file :profile_pic, styles:
  { search_result: '36x36#', post: '38x38#', notifications: '48x48#', thumb: '100x100#' }, default_url: "default_:style_profile_pic.png"
validates_attachment_content_type :profile_pic, content_type: /\Aimage\/.*\Z/
```

for default images, provide a separate image file for each style, e.g...

default_notifications_profile_pic.jpg
default_post_profile_pic.jpg
default_search_result_profile_pic.jpg
default_thumb_profile_pic.jpg
