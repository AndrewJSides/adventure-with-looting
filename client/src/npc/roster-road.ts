// The road: people with no fixed home, who can be seeded at any wayfire or
// camp. Several carry a piece of the larger story without knowing it.

import { look, type RosterNpc } from "./types";

const ANYWHERE = ["hearthglen", "greyhaven", "ashwatch", "rimewatch", "blackwater"] as const;

export const ROAD_ROSTER: RosterNpc[] = [
  {
    id: "brother-dob", name: "Brother Dob", title: "Peddler of blessings",
    home: "road", alsoFits: [...ANYWHERE], role: "faith", gender: "male",
    look: look("umber", "cream", "s2", "brown"),
    portrait: "Plump cheerful man in his thirties, patched brown robe hitched over road boots, tin cup on a string, tonsure growing out, hopeful eyebrows.",
    ties: ["vale", "maro"],
    secret: "He carries the chapel's consecrated oil, taken the night he fled. Father Vale believes it was lost. Dob is too ashamed to bring the last of it back.",
    history: [
      "Novice at the downtown chapel, under Father Vale. I was a very poor novice. I liked the wine and the singing and not the getting up.",
      "When the city fell I ran, and I have been running in a slow, friendly way ever since. I sell blessings. They are sincere. They are also for sale.",
    ],
    world: "People need to be told it will be all right by someone in a robe. I have a robe. I do not see the harm. I see quite a lot of the good.",
    detail: "Brother Dob wanders the wayfires selling blessings and carrying news between settlements.",
    voices: {
      greeting: [
        "Bless you, friend! That one is free. The next is two coins.",
        "A traveler! Sit, sit. Have you been blessed today? This week? Ever?",
        "Peace upon your road. And if you have any bread, peace upon that also.",
      ],
      idle: [
        "Father Vale would have me back. That is the trouble. He would, and be kind about it.",
        "I blessed a mule on Tuesday. It was the best listener I have had all year.",
      ],
      farewell: [
        "Go with a light heart and a full flask. I can only help with the first.",
        "Blessings on your boots! That one is also free. I am feeling generous.",
      ],
      hint: [
        "A wayfire is a holy thing, I say. Clear its region and it wakes, and carries you home in a step.",
        "Maro pays best for what you do not need. Patch in Greyhaven never closes. Sell before you starve.",
      ],
      wounded: [
        "Oh, my friend. Sit. I will pray, and also press on this. The pressing does most of it.",
        "You need a healer more than a blessing. I say that at some cost to my trade.",
      ],
      reaction: [
        "Praise be! And well done you, which is much the same.",
        "A miracle! Or competence. I have never been sure of the difference.",
      ],
    },
  },
  {
    id: "asha-verity", name: "Asha Verity", title: "Stone-rubbing pilgrim",
    home: "road", alsoFits: [...ANYWHERE, "old-greyhaven"], role: "wanderer", gender: "female",
    look: look("sand", "sage", "s6", "black"),
    portrait: "Earnest young woman in her twenties, curly hair tied back, charcoal-smudged cheeks, a leather tube of rolled papers on her back, round glasses, stubborn pointed chin.",
    ties: ["edda", "veiled", "min-seo"],
    secret: "Laid edge to edge, her three rubbings leave a gap shaped exactly like a fourth. When she holds them toward Hearthglen, the charcoal lines warm under her fingers.",
    history: [
      "Archaeology student. Third year. I was writing about floor mosaics. I had a grant, a little brush, and a supervisor who hated me.",
      "I take rubbings now. Charcoal on paper. I have found the same carving under three ruined cities. A spiral. Nobody has asked what I think it is.",
    ],
    world: "It is older than the cities. Each city was built over it, on purpose or by luck. I do not believe in that much luck.",
    detail: "Asha walks between ruins taking charcoal rubbings of a spiral carving she keeps finding.",
    voices: {
      greeting: [
        "Careful where you put your feet. I mean generally. People do not look down.",
        "Hello. May I see the soles of your boots? No reason. Yes, a reason. Old stone leaves a dust.",
        "You have been in cellars. Deep ones. I can tell by how you blink in daylight.",
      ],
      idle: [
        "Three rubbings. Same hand, same depth of cut, a thousand miles apart. Laid together, they match.",
        "There is a fourth. There has to be. Do not ask me how I know. I do not know how I know.",
      ],
      farewell: [
        "If you find carved stone under a floor, do not lift it alone. Send for me.",
        "Walk well. Look down sometimes.",
      ],
      hint: [
        "The storyteller in Greyhaven knows the spiral on the Regent's seal. Ask her before you ask me.",
        "The great dead each carry a relic, and each relic is part of one thing. That much I am sure of.",
      ],
      wounded: [
        "I have water and clean paper. Paper makes a fair dressing. I have had practice.",
        "You are bleeding on my rubbings. It is all right. Sit. They are only three years of my life.",
      ],
      reaction: [
        "Oh. That fits. That fits with something. Let me write it down.",
        "Thank you. Truly. Nobody ever brings me anything back.",
      ],
    },
  },
  {
    id: "tova-strand", name: "Tova Strand", title: "Caravan guard",
    home: "road", alsoFits: [...ANYWHERE], role: "guard", gender: "female",
    look: look("char", "copper", "s2", "blond"),
    portrait: "Tall athletic woman in her forties, black hair in a single tight braid, leather jack with steel plates, two fingers missing on the left hand, flat assessing stare.",
    ties: ["maro"],
    secret: "The clean cuts on the harness are hers. She sells the caravan routes to someone who pays in gold stamped with a civic crest, and she has not asked who.",
    history: [
      "Bouncer. Then close protection. I stood near rich people and looked at doors. I have not been surprised by a person since I was nineteen.",
      "I walk beside whichever cart is paying. Maro, when he will have me. I have never lost a client. I have lost two fingers and a tooth.",
    ],
    world: "The dead are easy. They want one thing and walk straight at it. It is the living on the road you have to read, and they have got worse.",
    detail: "Tova guards caravans between the settlements and sizes up everyone she meets as a threat.",
    voices: {
      greeting: [
        "Hands. Thanks. Habit. Sit where I can see you.",
        "You move well. Left shoulder is slow. Old break? Thought so.",
        "Evening. I have watched you for a quarter mile. You are all right.",
      ],
      idle: [
        "Maro talks so I do not have to. A good arrangement. He thinks he is charming me.",
        "Three carts hit on the Mire road this season. Not by the dead. Clean cuts on the harness.",
      ],
      farewell: [
        "Check behind you at the tree line. Always the tree line.",
        "Stay sharp. Dull people do not get old out here.",
      ],
      hint: [
        "A brute or a shieldbearer hits harder than three of the others. Deal with it first or last, not between.",
        "Elites take far more killing than they look. Count on it, and save a flask.",
      ],
      wounded: [
        "I have done this in a moving car. Hold still. It will hurt. I do not care.",
        "You are compromised. Find a healer. I will watch the road while you do.",
      ],
      reaction: [
        "Solid work. I would stand next to you.",
        "No wasted movement. I noticed.",
      ],
    },
  },
  {
    id: "rosalind-achebe", name: "Rosalind Achebe", title: "Travelling tooth-puller",
    home: "road", alsoFits: [...ANYWHERE], role: "healer", gender: "female",
    look: look("teal", "cream", "s7", "black"),
    portrait: "Bright beaming woman in her fifties, spotless white scarf, dental pliers in a holster at her hip, magnifying spectacles, a terrifyingly kind smile.",
    ties: ["lark", "maro"],
    secret: "In the jaw of a man she treated at Mosslight she found a tooth that was not a tooth: a shard of ember crystal grown into the bone. He had never been to the Wastes.",
    history: [
      "Dental surgeon. A lovely practice. A fish tank, soft music, a hygienist called Brenda. I was gentle. I was known for it.",
      "Now it is pliers by a campfire and a man sitting on your chest. I am still gentle. It is only that gentle has had to become a great deal louder.",
    ],
    world: "The end of the world is hard on teeth. Nobody mentions it. They talk about the dead, and they are all walking about with abscesses.",
    detail: "Rosalind pulls teeth at the wayfires and is cheerfully certain everyone needs her.",
    voices: {
      greeting: [
        "Smile for me. Wider. Oh dear. Oh, that back one is not happy at all.",
        "Hello! Sit down, open up. No? Later, then. They always come back later.",
        "A new mouth! I mean face. Lovely to meet you.",
      ],
      idle: [
        "Fourteen extractions this week. One was a horse. The horse was the better patient.",
        "I miss Brenda. She held the little mirror. Nobody holds the little mirror now.",
      ],
      farewell: [
        "Chew on the other side! And come and find me when it starts to throb. It will.",
        "Go safely. Rinse with salt water. I mean it. I will be able to tell.",
      ],
      hint: [
        "A flask is for the fight. A rest fills them again after. I see too many people saving the wrong one.",
        "Do not carry a wound into the night. More of them come out after dark, and they see you sooner.",
      ],
      wounded: [
        "Oh! Not teeth, for once. Sit. I am a surgeon, you know. Mouths, but the principle carries.",
        "That is nasty. I can stitch it. I shall be very gentle. Bite on this.",
      ],
      reaction: [
        "Marvellous! A clean result. I do so love a clean result.",
        "Well done! Have a peppermint. It is my last. No, do. I insist.",
      ],
    },
  },
  {
    id: "idris-bellamy", name: "Idris Bellamy", title: "Weather-reader",
    home: "road", alsoFits: [...ANYWHERE], role: "wanderer", gender: "male",
    look: look("navy", "sky", "s6", "silver"),
    portrait: "Trim silver-haired man in his sixties, the wreck of a good blue suit under a rain cape, weathervane badge, a broadcaster's smooth reassuring smile.",
    ties: ["maro"],
    secret: "He has charted the wrong weather for a year. Every freak fog and ashfall centres, to the mile, on one of the great named dead.",
    history: [
      "Television weatherman. Regional. I had a blue suit and a clicker, and I was wrong in a very reassuring voice.",
      "I read it properly now. Sky, wind, the ache in my left knee. I walk ahead of the caravans and tell them when to tie things down.",
    ],
    world: "The weather has stopped being weather. Fog that arrives against the wind. Ash that falls on a clear day. Somebody is steering it, badly.",
    detail: "Idris reads the weather for caravans and insists it has stopped behaving like weather.",
    voices: {
      greeting: [
        "Good evening, and here is the outlook: you, tired. Becoming less tired by the fire.",
        "Ah! A front moving in from the west. That is you. Welcome.",
        "Feel that? Pressure dropping. Either rain or company. It was company.",
      ],
      idle: [
        "Fog tomorrow in the Mire, heavy, against the wind. I cannot explain it. I explained things for a living.",
        "Knee says snow. Sky says clear. I trust the knee. The knee never had a producer.",
      ],
      farewell: [
        "Outlook for your road: changeable, with teeth. Wrap up.",
        "Back to you in the studio. Sorry. Go safely.",
      ],
      hint: [
        "Fog in the Mire hides spitters. If you cannot see far, slow down and watch the reeds.",
        "Each region is hard its own way: heat in the Wastes, cold in Frostfall, sickness in the Mire.",
      ],
      wounded: [
        "Oh, that is a severe weather warning if ever I saw one. Sit. Somebody find a healer.",
        "You are going pale. A cold front across the face. Sit down at once.",
      ],
      reaction: [
        "Bright spells ahead! I mean it this time.",
        "And that is a clear and settled outlook. Well done.",
      ],
    },
  },
  {
    id: "queenie-harker", name: "Queenie Harker", title: "Mule driver",
    home: "road", alsoFits: [...ANYWHERE], role: "trader", gender: "female",
    look: look("wheat", "ash", "s1", "white"),
    portrait: "Leathery upright woman of seventy, silver hair in a neat bun, tweed hacking jacket gone to rags, a riding crop she never uses, a large grey mule's ears looming behind her shoulder.",
    ties: ["maro", "veiled"],
    secret: "The Senator will not go within a mile of anywhere the Veiled One has stood. Queenie has mapped his refusals. They make a trail from Frostfall to Hearthglen.",
    history: [
      "I bred show ponies. Ribbons, rosettes, little girls in jodhpurs crying. I was vicious on a judging panel.",
      "Now it is one mule. The Senator. Bought him for a sack of oats. He has carried me across four regions and bitten every trader in them.",
    ],
    world: "A mule will not walk onto bad ground. Cannot be made to. I have stopped trusting maps, scouts and my own eyes. I trust the Senator.",
    detail: "Queenie hauls goods between settlements with one ill-tempered mule she trusts above any scout.",
    voices: {
      greeting: [
        "Stand to his front. Not behind. Not beside. He has opinions about beside.",
        "Well. You have a sensible walk. The Senator has not put his ears back. High praise.",
        "Afternoon. Do not offer him anything. He will take the hand as well.",
      ],
      idle: [
        "He would not cross the old tram line yesterday. Stood four hours. I sat and waited. He was right.",
        "Sixteen years old and never once done a thing he did not want to. I am seventy and cannot say the same.",
      ],
      farewell: [
        "If your animal will not go forward, neither should you.",
        "Mind how you go. The Senator will be judging.",
      ],
      hint: [
        "A dog that follows you is worth feeding. It fights, and it gets better at it.",
        "Sell your spare weight. Maro on the road, Patch in Greyhaven. A light pack walks farther.",
      ],
      wounded: [
        "Down, you fool. No, away from him. He bites the injured. He thinks it is helping.",
        "That wants a healer. Up on the pack saddle. He will carry you. He will resent it.",
      ],
      reaction: [
        "Well handled. The Senator would nod, if he did that.",
        "Blue rosette. I do not give those lightly.",
      ],
    },
  },
  {
    id: "zora-petrakis", name: "Zora Petrakis", title: "Knife-juggler",
    home: "road", alsoFits: [...ANYWHERE], role: "entertainer", gender: "female",
    look: look("wine", "red", "s3", "dark"),
    portrait: "Lithe quick woman in her thirties, dark curls under a red scarf, a bandolier of mismatched knives, scars across both palms, a performer's dazzling practised grin.",
    ties: ["lark", "odalys-finch"],
    secret: "She was performing in the square on the day of the fall, and saw Captain Rusk carry a small figure wrapped in a coat out of Civic Hall's side door toward the west gate.",
    history: [
      "Street performer. Knives, fire, a hat on the pavement. I worked the square outside Civic Hall. Good pitch. Lawyers tip well when they have won.",
      "Same act, new pavement. I juggle at the wayfires for supper. The difference is that now, when I throw one for real, people clap that too.",
    ],
    world: "An audience is an audience. Frightened people watch a knife go up and for three seconds think about nothing else. That is the whole gift.",
    detail: "Zora juggles knives at the wayfires for her supper and throws them for real when she must.",
    voices: {
      greeting: [
        "Stand there. Perfect. Do not move. I am joking. Mostly. Hello.",
        "A crowd! Of one! My favourite size. Nobody heckles.",
        "You have steady hands. I can tell. Catch. Good. We could work together.",
      ],
      idle: [
        "Seven knives last night without a drop. Then a moth. I do not want to talk about the moth.",
        "Lark gives me the rhythm and I give him the gasp. We split the hat. He thinks sixty-forty is half.",
      ],
      farewell: [
        "Keep your blade oiled and your exits open!",
        "Go on. And if you must throw something, follow through.",
      ],
      hint: [
        "A machete is fast and short. A katana is the one that rewards a clean, well-timed cut.",
        "Bats weave. Do not chase the weave. Wait where it ends.",
      ],
      wounded: [
        "I have stitched my own hands often enough. Yours will be a nice change.",
        "You are bleeding. That is not part of the act. Sit down.",
      ],
      reaction: [
        "Bravo! The hat is on the ground, if you are feeling generous.",
        "Now that was a finish. I felt that in the back row.",
      ],
    },
  },
  {
    id: "nolan-royce", name: "Nolan Royce", title: "Former Civic Works courier",
    home: "road", alsoFits: [...ANYWHERE], role: "courier", gender: "male",
    look: look("slate", "bone", "s2", "brown"),
    portrait: "Thin unshaven man in his forties, a courier's satchel with the civic crest cut off, road-worn shoes, eyes that plead before he has spoken.",
    ties: ["maro", "tamsin"],
    secret: "He kept one case. He could not hand over the last. It is buried under a milestone on the west road, and on still nights the stone is warm.",
    history: [
      "Courier, Civic Works, bonded. I carried sealed cases between buildings, signed nothing and asked nothing. That was the job. It paid very well.",
      "I handed the last crates to a trader at the west road and watched him haul them east. They hummed. I was courier nineteen. There were twenty.",
    ],
    world: "I delivered whatever it was, piece by piece, for two years. I did not know. I say that to everyone. I hope one day to believe it.",
    detail: "Nolan once carried sealed cases for Civic Works and now carries anything for anyone, to make up for it.",
    voices: {
      greeting: [
        "I can take that for you. Wherever it is going. No charge. I do not charge now.",
        "Hello. I am a courier. I was a courier. I carry things. Do you have a thing?",
        "You have been east. Did you see crates? Grey, banded, about so big? No. Good. Never mind.",
      ],
      idle: [
        "Twenty couriers. I have found four. Three will not speak to me. One did not know me, or anything.",
        "Maro took the last load off my hands. I never told him what I think was in it. He has been kind to me.",
      ],
      farewell: [
        "If you have a letter, a parcel, anything, find me. I will get it there.",
        "Go safely. I will be on the road. I am always on the road.",
      ],
      hint: [
        "Anything stamped Civic Works should go to Tamsin in Greyhaven. Do not open it on the way.",
        "Ember crystals call to each other. Three can be bound into a core. Loose, they are only dangerous.",
      ],
      wounded: [
        "Let me carry your pack. Let me carry you. I am good at carrying.",
        "You are hurt. I will go for help. I am fast. It is the one thing I am.",
      ],
      reaction: [
        "Delivered. Safe and whole. That is all I ever want to hear.",
        "Thank you. You do not know what it means to see something arrive.",
      ],
    },
  },
  {
    id: "severin-thrace", name: "Severin Thrace", title: "Relic hunter",
    home: "road", alsoFits: [...ANYWHERE, "old-greyhaven"], role: "scavenger", gender: "male",
    look: look("dusk", "brass", "s1", "dark"),
    portrait: "Fastidious man in his fifties, a travelling coat cut too well for the road, white gloves, jeweller's loupe, the thin smile of someone pricing you.",
    ties: ["veiled", "cora"],
    secret: "He is not collecting relics to sell. He means to bring them all together in one place to learn what they do, and he has already found out what happens with three.",
    history: [
      "Auction house. Authentication. I told people whether their treasure was real. It usually was not. I enjoyed that more than I should have.",
      "Relic steel is the only genuine article left. I track the great dead, wait for someone braver to kill them, and I am very quick afterward.",
    ],
    world: "Everything the named dead carry is a piece of one object. I have handled four. They pull toward each other in the hand. Gently. Like a tide.",
    detail: "Severin tracks the named dead for the relics they carry and lets others do the killing.",
    voices: {
      greeting: [
        "Ah. The one who actually kills them. I have been two days behind you for a month.",
        "Good evening. You are carrying something old. Do not show me. I will only want it.",
        "We are in the same trade, you and I. You do the half with the risk in it.",
      ],
      idle: [
        "A gold chest where the Colossus fell, they say. I got there second. Second is a very expensive place.",
        "I do not sell what I find. People assume I do. I have stopped correcting them. It is safer.",
      ],
      farewell: [
        "Do try not to die before the next one. I have plans for its relic.",
        "Good hunting. I shall be along shortly after.",
      ],
      hint: [
        "A golden chest appears where one of the great dead falls. Take it before someone like me does.",
        "Relics come only from the named dead, and each does something unique. Wear them. Do not sell them.",
      ],
      wounded: [
        "Oh, no, no. You are far too useful to bleed out. Sit. I have a kit. A good one.",
        "Be sensible. Find a healer. I cannot follow a corpse to its next kill.",
      ],
      reaction: [
        "Superb. Truly. I shall be quoting your method to nobody.",
        "Authentic. The real thing. I do not say that lightly. It was my job not to.",
      ],
    },
  },
];
