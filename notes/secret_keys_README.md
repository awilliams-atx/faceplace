# AMAZON WEB SERVICES

```YAML
development:
  s3_bucket: 'DEVELOPMENT-BUCKET-NAME'

production:
  s3_bucket: 'PRODUCTION-BUCKET-NAME'

s3_region: 'us-east-1'
s3_access_key_id: 'XXXX'
s3_secret_access_key: 'XXXX'
```

# FACEBOOK

```YAML
FACEBOOK_KEY: 'XXXX'
FACEBOOK_SECRET: 'XXXX'
```

# README

These environment variables are set up on the server when the app is runs. They give access to things like Amazon Web Services and Facebook omniauth. They are gitignored (via the Figaro gem) so that trolls cannot steal them on Github and make charges to my bank account.

When starting up a new project, make a template copy of this file called 'secret_keys_APP_NAME' with all the key-value pair above that you need. Fill out everything **that isn't security sensitive--don't fill in the secret keys in the template Leave them as 'XXXX'**.

 Every time you set up the project for development, after running 'bundle install', run 'bundle exec figaro install' and copy the template you have made into the newly created config/application.yml. Fill it out. With Figaro, config/application.rb will always be git-ignored, so as long as no one has access to your computer while developing or wherever you have stored your secret keys, the secret keys will be secure.
