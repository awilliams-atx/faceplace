json.extract! @user,
:id,
:first_name,
:last_name
else

if @intro
  json.extract! @user,
  :description,
  :company,
  :position,
  :location,
  :hometown
end
