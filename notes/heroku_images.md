wrap images in scss in asset_path e.g.

```CSS
  #intro-work-img {
    background-image: url(asset_path('sam_in_the_bahamas.png'));
  }
```

use Rails.root in production to specify seed image paths e.g.

```Ruby
  david.profile_pic =
    File.open("#{Rails.root}/app/assets/images/david_on_harley_davidson.jpg")
```
set production env variables (aws keys) via figaro. refer to the docs.
https://github.com/laserlemon/figaro

(for the lazy: figaro heroku:set -e production)
