json.user_name @message.user.name
json.time @message.created_at.to_s
json.body @message.body
json.image @message.image_url