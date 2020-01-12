# README

# Database construction

## users_table
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|email|string|null: false, unique: true|

### users_association
- has_many :messages
- has_many :members
- has_many :groups, through: :members

## groups_table
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|

### groups_association
- has_many :messages
- has_many :members
- has_many :users, through: :members

## messages_table
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### messages_association
- belongs_to :group
- belongs_to :user

## members_table
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### members_association
- belongs_to :group
- belongs_to :user
