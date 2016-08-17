[User, Post].each { |klass| klass.destroy_all }

lebowski_friends = [];

andrew = User.create(first_name: "Andrew", last_name: "Williams", email: "andrew", password: "starwars")

andrew.description = 'New York City software developer with experience in Rails, JavaScript, and React.js'
andrew.location = 'Manhattan'
andrew.hometown = 'New Braunfels, Texas'
andrew.school = 'The University of Texas at Austin'
andrew.major = 'French'
andrew.profile_pic = File.open("#{Rails.root}/app/assets/images/andrew_williams_profile_pic.jpg")
andrew.cover_photo = File.open("#{Rails.root}/app/assets/images/andrew_williams_cover_photo.jpg")
andrew.save!

lebowski_friends << andrew

jeffrey = User.create(first_name: "Jeffrey", last_name: "Lebowski", email: "jeff", password: "starwars")

jeffrey.description = 'I\'m just the dude, man'
jeffrey.location = 'Los Angeles'
jeffrey.profile_pic = File.open("#{Rails.root}/app/assets/images/jeffrey_lebowski_profile_pic.jpg")
jeffrey.cover_photo = File.open("#{Rails.root}/app/assets/images/jeffrey_lebowski_cover_photo.jpg")
jeffrey.save!

lebowski_friends << jeffrey


walter = User.create(first_name: "Walter", last_name: "Sobchak", email: "walter", password: "starwars")

walter.description = 'US veteran and avid bowler'
walter.location = 'Los Angeles'
walter.profile_pic = File.open("#{Rails.root}/app/assets/images/walter_sobchak_profile_pic.jpg")
walter.cover_photo = File.open("#{Rails.root}/app/assets/images/walter_sobchak_cover_photo.jpg")
walter.save!

lebowski_friends << walter

donny = User.create(first_name: "Donny", last_name: "Kerabatsos", email: "donny", password: "starwars")

donny.description = 'Bowler and all-around lovable guy'
donny.location = 'Los Angeles'
donny.profile_pic = File.open("#{Rails.root}/app/assets/images/donald_kerabatsos_profile_pic.png")
donny.cover_photo = File.open("#{Rails.root}/app/assets/images/donald_kerabatsos_cover_photo.jpg")
donny.save!

lebowski_friends << donny

jeff_sr = User.create(first_name: "Jeffrey", last_name: "Lebowski", email: "jeff_sr", password: "starwars")

jeff_sr.description = 'Enterpreneur and US veteran'
jeff_sr.location = 'Los Angeles'
jeff_sr.company = 'Lebowski Corp.'
jeff_sr.position = 'CEO'
jeff_sr.profile_pic = File.open("#{Rails.root}/app/assets/images/jeffrey_lebowski_sr_profile_pic.jpg")
jeff_sr.cover_photo = File.open("#{Rails.root}/app/assets/images/jeffrey_lebowski_sr_cover_photo.jpg")
jeff_sr.save!

lebowski_friends << jeff_sr

maude = User.create(first_name: "Maude", last_name: "Lebowski", email: "maude", password: "starwars")

maude.description = 'Artist and norm-challenger'
maude.location = 'Los Angeles'
maude.position = 'Painter'
maude.profile_pic = File.open("#{Rails.root}/app/assets/images/maude_lebowski_profile_pic.jpg")
maude.cover_photo = File.open("#{Rails.root}/app/assets/images/maude_lebowski_cover_photo.jpg")
maude.save!

lebowski_friends << maude

jesus = User.create(first_name: "Jesus", last_name: "Quintana", email: "jesus", password: "starwars")

jesus.description = 'Bowler'
jesus.location = 'Los Angeles'
jesus.profile_pic = File.open("#{Rails.root}/app/assets/images/jesus_quintana_profile_pic.png")
jesus.cover_photo = File.open("#{Rails.root}/app/assets/images/jesus_quintana_cover_photo.jpg")
jesus.save!

brandt = User.create(first_name: "Brandt", last_name: "Bjergsen", email: "brandt", password: "starwars")

brandt.description = 'Personal assistant and faithful employee'
brandt.location = 'Los Angeles'
brandt.position = 'Personal assistant'
brandt.company = 'Lebowski Corp.'
brandt.profile_pic = File.open("#{Rails.root}/app/assets/images/brandt_bjergsen_profile_pic.jpg")
brandt.cover_photo = File.open("#{Rails.root}/app/assets/images/brandt_bjergsen_cover_photo.jpg")
brandt.save!

lebowski_friends << brandt

oh_brother_friends = []

daniel = User.create(first_name: "Daniel", last_name: "Teague", email: "daniel", password: "starwars")

daniel.location = 'Mississippi'
daniel.position = 'Bible salesman'
daniel.profile_pic = File.open("#{Rails.root}/app/assets/images/daniel_teague_profile_pic.jpg")
daniel.cover_photo = File.open("#{Rails.root}/app/assets/images/daniel_teague_cover_photo.png")
daniel.save!

oh_brother_friends << andrew
oh_brother_friends << daniel

ulysses = User.create(first_name: "Ulysses", last_name: "McGill", email: "ulysses", password: "starwars")

ulysses.location = 'Mississippi'
ulysses.position = 'Lawyer'
ulysses.profile_pic = File.open("#{Rails.root}/app/assets/images/ulysses_everett_mcgill_profile_pic.jpg")
ulysses.cover_photo = File.open("#{Rails.root}/app/assets/images/ulysses_everett_mcgill_cover_photo.jpg")
ulysses.save!

oh_brother_friends << ulysses

pete = User.create(first_name: "Pete", last_name: "Hogwallop", email: "pete", password: "starwars")

pete.description = 'Loyal to my kin and friends'
pete.location = 'Mississippi'
pete.position = '(Future) maitre d\''
pete.company = 'The Hogwallop Inn'
pete.profile_pic = File.open("#{Rails.root}/app/assets/images/pete_hogwallop_profile_pic.jpg")
pete.cover_photo = File.open("#{Rails.root}/app/assets/images/pete_hogwallop_cover_photo.png")
pete.save!

oh_brother_friends << pete

delmar = User.create(first_name: "Delmar", last_name: "Odonnell", email: "delmar", password: "starwars")

delmar.description = 'Small-time crook'
delmar.location = 'Mississippi'
delmar.profile_pic = File.open("#{Rails.root}/app/assets/images/delmar_odonnell_profile_pic.jpeg")
delmar.cover_photo = File.open("#{Rails.root}/app/assets/images/delmar_odonnell_cover_photo.jpg")
delmar.save!

oh_brother_friends << delmar

tommy = User.create(first_name: "Tommy", last_name: "Johnson", email: "tommy", password: "starwars")

tommy.location = 'Mississippi'
tommy.description = 'Simple man, musician, guitarist'
tommy.position = 'Guitarist'
tommy.profile_pic = File.open("#{Rails.root}/app/assets/images/tommy_johnson_profile_pic.jpg")
tommy.cover_photo = File.open("#{Rails.root}/app/assets/images/tommy_johnson_cover_photo.png")
tommy.save!

oh_brother_friends << tommy

pappy = User.create(first_name: "Pappy", last_name: "O'Daniel", email: "pappy", password: "starwars")

pappy.location = 'Mississippi'
pappy.description = 'Upstanding statesman'
pappy.position = 'Governor of Mississippi'
pappy.profile_pic = File.open("#{Rails.root}/app/assets/images/pappy_odaniel_profile_pic.jpg")
pappy.cover_photo = File.open("#{Rails.root}/app/assets/images/pappy_odaniel_cover_photo.jpg")
pappy.save!

oh_brother_friends << pappy

lebowski_friends.permutation(2).each do |user_1, user_2|
  Friendship.create(user_id: user_1.id, friend_id: user_2.id)
end

oh_brother_friends.permutation(2).each do |user_1, user_2|
  Friendship.create(user_id: user_1.id, friend_id: user_2.id)
end

# -----------------------------------POSTS----------------------------------- #

post = Post.new
post.author = walter
post.body = 'Who wants to go bowling?'
post.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = donny
tagging.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = jeffrey
tagging.save!



post = Post.new
post.author = walter
post.body = 'Does anyone follow the rules anymore?'
post.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = donny
tagging.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = jeffrey
tagging.save!



post = Post.new
post.author = walter
post.body = 'This is what happens when you find a stranger in the Alps!'
post.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = donny
tagging.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = jeffrey
tagging.save!



post = Post.new
post.author = walter
post.body = 'You are entering a world of pain!'
post.save!

timeline_posting = TimelinePosting.new
timeline_posting.post = post
timeline_posting.profile_owner = jesus
timeline_posting.save!



post = Post.new
post.author = walter
post.body = 'You are entering a world of pain!'
post.save!

timeline_posting = TimelinePosting.new
timeline_posting.post = post
timeline_posting.profile_owner = jesus
timeline_posting.save!



post = Post.new
post.author = walter
post.body = 'OVER THE LINE!'
post.save!

timeline_posting = TimelinePosting.new
timeline_posting.post = post
timeline_posting.profile_owner = jesus
timeline_posting.save!



post = Post.new
post.author = donny
post.body = 'Phone\'s ringing, Dude.'
post.save!

timeline_posting = TimelinePosting.new
timeline_posting.post = post
timeline_posting.profile_owner = jeffrey
timeline_posting.save!



post = Post.new
post.author = jeffrey
post.body = 'That\'s just, like, your opinion, man.'
post.save!

timeline_posting = TimelinePosting.new
timeline_posting.post = post
timeline_posting.profile_owner = jesus
timeline_posting.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = donny
tagging.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = walter
tagging.save!



post = Post.new
post.author = walter
post.body = 'Forget it Donny, you\'re out of your element.'
post.save!

timeline_posting = TimelinePosting.new
timeline_posting.post = post
timeline_posting.profile_owner = donny
timeline_posting.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = jeffrey
tagging.save!



post = Post.new
post.author = jeffrey
post.body = 'That\'s just, like, your opinion, man.'
post.save!

timeline_posting = TimelinePosting.new
timeline_posting.post = post
timeline_posting.profile_owner = jesus
timeline_posting.save!



post = Post.new
post.author = jesus
post.body = 'You might fool the freaks in the league office, but you don\'t fool the Jesus.'
post.save!

timeline_posting = TimelinePosting.new
timeline_posting.post = post
timeline_posting.profile_owner = walter
timeline_posting.save!



post = Post.new
post.author = jeffrey
post.body = 'No, Walter, it did NOT look like Larry was about to crack!'
post.save!

timeline_posting = TimelinePosting.new
timeline_posting.post = post
timeline_posting.profile_owner = walter
timeline_posting.save!



post = Post.new
post.author = maude
post.body = 'My art has been commended as being strongly visceral which bothers some men. The word itself makes some men uncomfortable. Visceral.'
post.save!

timeline_posting = TimelinePosting.new
timeline_posting.post = post
timeline_posting.profile_owner = jeffrey
timeline_posting.save!



post = Post.new
post.author = jeff_sr
post.body = 'I didn\'t blame anyone for the loss of my legs. Some Chinaman took them from me in Korea.'
post.save!

timeline_posting = TimelinePosting.new
timeline_posting.post = post
timeline_posting.profile_owner = jeffrey
timeline_posting.save!



post = Post.new
post.author = jeff_sr
post.body = 'Your revolution is over, Mr. Lebowski. Condolences. The bums lost.'
post.save!

timeline_posting = TimelinePosting.new
timeline_posting.post = post
timeline_posting.profile_owner = jeffrey
timeline_posting.save!



post = Post.new
post.author = jeffrey
post.body = 'Where\'s the freaking money, Lebowski?'
post.save!

timeline_posting = TimelinePosting.new
timeline_posting.post = post
timeline_posting.profile_owner = jeff_sr
timeline_posting.save!



post = Post.new
post.author = tommy
post.body = 'I had to be up at that there crossroads last midnight, to sell my soul to the devil.'
post.save!

timeline_posting = TimelinePosting.new
timeline_posting.post = post
timeline_posting.profile_owner = ulysses
timeline_posting.save!



post = Post.new
post.author = ulysses
post.body = 'Pete, it\'s a fool that looks for logic in the chambers of the human heart.'
post.save!

timeline_posting = TimelinePosting.new
timeline_posting.post = post
timeline_posting.profile_owner = pete
timeline_posting.save!



post = Post.new
post.author = ulysses
post.body = 'I\'m surprised at you, Pete, I gave you credit for more brains than Delmar.'
post.save!

timeline_posting = TimelinePosting.new
timeline_posting.post = post
timeline_posting.profile_owner = pete
timeline_posting.save!



post = Post.new
post.author = pete
post.body = 'I\'ve always wondered, what\'s the devil look like?'
post.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = tommy
tagging.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = ulysses
tagging.save!



post = Post.new
post.author = tommy
post.body = 'The devil\'s white, as white as you folks, with empty eyes and a big hollow voice. He likes to travel around with a mean old hound. That\'s right.'
post.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = pete
tagging.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = ulysses
tagging.save!



post = Post.new
post.author = delmar
post.body = 'The preacher says all my sins is warshed away, including that Piggly Wiggly I knocked over in Yazoo.'
post.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = pete
tagging.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = ulysses
tagging.save!



post = Post.new
post.author = delmar
post.body = 'Can\'t you see it, Everett? Them sirens did this to Pete. They loved him up and turned him into a... horny toad.'
post.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = pete
tagging.save!

timeline_posting = TimelinePosting.new
timeline_posting.post = post
timeline_posting.profile_owner = ulysses
timeline_posting.save!



post = Post.new
post.author = daniel
post.body = 'Thank you boys for throwin\' in that fricassee. I\'m a man of large appetite, and even with lunch under my belt, I was feelin\' a mite peckish.'
post.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = delmar
tagging.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = ulysses
tagging.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = pete
tagging.save!



post = Post.new
post.author = pappy
post.body = 'By way of endorsing my candidacy, the Soggy Bottom Boys are gonna lead us all in a rousing chorus of "You Are My Sunshine."'
post.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = delmar
tagging.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = ulysses
tagging.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = pete
tagging.save!



post = Post.new
post.author = pappy
post.body = 'Holey moley! These boys are a hit!'
post.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = delmar
tagging.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = ulysses
tagging.save!

tagging = Tagging.new
tagging.post = post
tagging.tagged = pete
tagging.save!



post = Post.new
post.author = pappy
post.body = 'We ain\'t one-at-a-timin\' here. We\'re MASS communicating!'
post.save!



post = Post.new
post.author = pappy
post.body = 'I invented moral fibre!'
post.save!

u = User.find_by(last_name: 'Kerabatsos')
u.cover_photo = File.open("#{Rails.root}/app/assets/images/donald_kerabatsos_cover_photo.jpg")
u.save!
