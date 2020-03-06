json.array! @messages do |message|
  json.body message.body
  json.image message.image_url
  json.time message.created_at.to_s
  json.user_name message.user.name
  json.id message.id
end
