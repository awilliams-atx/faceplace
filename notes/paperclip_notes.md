#### Paperclip image styles
To provide to views various image sizes given a single image, declare the styles on the models.

```ruby
has_attached_file :cover_photo, styles: { cover: '851x315#' }, default_url: "default_:style_cover_photo.png"
validates_attachment_content_type :cover_photo, content_type: /\Aimage\/.*\Z/
```

#### Default Paperclip images
Given a user model with several image styles, provide each size of the default image in assets/images. E.g, for the model users with these styles for a  'profile_pic'...

```ruby
# models/user.rb

has_attached_file :profile_pic, styles:
  { search_result: '36x36#', post: '38x38#', notifications: '48x48#', thumb: '100x100#' }, default_url: "default_:style_profile_pic.png"
validates_attachment_content_type :profile_pic, content_type: /\Aimage\/.*\Z/
```

...provide a default image file for each individual style:

```ruby
# app/assets/images

default_notifications_profile_pic.jpg
default_post_profile_pic.jpg
default_search_result_profile_pic.jpg
default_thumb_profile_pic.jpg
```

#### Accessing images from Rails
Refer to images via 'asset_path' to access images, e.g...

###### From .scss files

```css
/* stylesheets/intro.css.scss */

#intro-work-img { background-image: url(asset_path('intro_work.png')); }
```

###### In jbuilder views

```ruby
# views/users/current_user.json.jbuilder

json.id @user.id
json.first_name @user.first_name
json.last_name @user.last_name
json.postPicUrl asset_path(@user.profile_pic.url)
json.postPicUrl asset_path(@user.profile_pic.url(:post)) # Paperclip style
```

#### Accessing images in the asset pipeline on Heroku

###### In seed data
Use `Rails.root`, e.g....

```ruby
  # seeds.rb

  david.profile_pic =
    File.open("#{Rails.root}/app/assets/images/david_on_harley_davidson.jpg")
```
