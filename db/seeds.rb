[User, Post].each { |klass| klass.destroy_all }

friends = [];

andrew = User.create(first_name: "Andrew", last_name: "Williams", email: "andrew", password: "starwars")

andrew.profile_pic = File.open("#{Rails.root}/app/assets/images/andrew_williams_profile_pic.jpg")
andrew.cover_photo = File.open("#{Rails.root}/app/assets/images/andrew_williams_cover_photo.jpg")
andrew.save!

friends << andrew

sam = User.create(first_name: "Sam", last_name: "Johns", email: "sam", password: "starwars")

sam.profile_pic = File.open("#{Rails.root}/app/assets/images/sam_johns_profile_pic.jpg")
sam.cover_photo = File.open("#{Rails.root}/app/assets/images/sam_johns_cover_photo.jpg")
sam.save!

friends << sam

david = User.create(first_name: "David", last_name: "McIlroy", email: "david", password: "starwars")

david.profile_pic = File.open("#{Rails.root}/app/assets/images/david_mcilroy_profile_pic.jpg")
david.cover_photo = File.open("#{Rails.root}/app/assets/images/david_mcilroy_cover_photo.jpg")
david.save!

friends << david

jeffrey = User.create(first_name: "Jeffrey", last_name: "Lebowski", email: "jeff", password: "starwars")

jeffrey.profile_pic = File.open("#{Rails.root}/app/assets/images/jeffrey_lebowski_profile_pic.jpg")
jeffrey.cover_photo = File.open("#{Rails.root}/app/assets/images/jeffrey_lebowski_cover_photo.jpg")
jeffrey.save!

friends << jeffrey


walter = User.create(first_name: "Walter", last_name: "Sobchak", email: "walter", password: "starwars")

walter.profile_pic = File.open("#{Rails.root}/app/assets/images/walter_sobchak_profile_pic.jpg")
walter.cover_photo = File.open("#{Rails.root}/app/assets/images/walter_sobchak_cover_photo.jpg")
walter.save!

friends << walter

donny = User.create(first_name: "Donny", last_name: "Kerabatsos", email: "donny", password: "starwars")

donny.profile_pic = File.open("#{Rails.root}/app/assets/images/donald_kerabatsos_profile_pic.png")
donny.cover_photo = File.open("#{Rails.root}/app/assets/images/donald_kerabatsos_cover_photo.jpg")
donny.save!

friends << donny

jeff_sr = User.create(first_name: "Jeffrey", last_name: "Lebowski", email: "jeff_sr", password: "starwars")

jeff_sr.profile_pic = File.open("#{Rails.root}/app/assets/images/jeffrey_lebowski_sr_profile_pic.jpg")
jeff_sr.cover_photo = File.open("#{Rails.root}/app/assets/images/jeffrey_lebowski_sr_cover_photo.jpg")
jeff_sr.save!

friends << jeff_sr

maude = User.create(first_name: "Maude", last_name: "Lebowski", email: "maude", password: "starwars")

maude.profile_pic = File.open("#{Rails.root}/app/assets/images/maude_lebowski_profile_pic.jpg")
maude.cover_photo = File.open("#{Rails.root}/app/assets/images/maude_lebowski_cover_photo.jpg")
maude.save!

friends << maude

jesus = User.create(first_name: "Jesus", last_name: "Quintana", email: "jesus", password: "starwars")

jesus.profile_pic = File.open("#{Rails.root}/app/assets/images/jesus_quintana_profile_pic.png")
jesus.cover_photo = File.open("#{Rails.root}/app/assets/images/jesus_quintana_cover_photo.jpg")
jesus.save!

brandt = User.create(first_name: "Brandt", last_name: "Bjergsen", email: "brandt", password: "starwars")

brandt.profile_pic = File.open("#{Rails.root}/app/assets/images/brandt_bjergsen_profile_pic.jpg")
brandt.cover_photo = File.open("#{Rails.root}/app/assets/images/brandt_bjergsen_cover_photo.jpg")
brandt.save!

friends << brandt

friends.permutation(2).each do |user_1, user_2|
  Friendship.create(user_id: user_1.id, friend_id: user_2.id)
end
