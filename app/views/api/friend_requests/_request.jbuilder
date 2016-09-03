json.id req.id
json.accepted req.accepted
json.checked req.checked
json.acceptance_checked req.acceptance_checked
json.receiver_id req.receiver_id
json.maker_id req.maker_id
if req.maker === current_user
  json.name req.receiver.full_name
  json.profile_pic_url asset_path(req.receiver.profile_pic.url)
else
  json.name req.maker.full_name
  json.profile_pic_url asset_path(req.maker.profile_pic.url)
end
