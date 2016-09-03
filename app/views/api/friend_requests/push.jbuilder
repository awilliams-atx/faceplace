json.id @request.id
json.accepted @request.accepted
json.checked @request.checked
json.acceptance_checked @request.acceptance_checked
json.receiver_id @request.receiver_id
json.maker_id @request.maker_id
json.name @request.maker.full_name
json.profile_pic_url asset_path(@request.maker.profile_pic.url)
