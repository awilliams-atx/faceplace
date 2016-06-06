json.profileOwnerId @profile_owner_id

json.friends do
  json.array! @users, partial: 'api/users/thumb', as: :user
end
