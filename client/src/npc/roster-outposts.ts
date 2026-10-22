// The three claimable outposts. Small, hard places at the edge of each of the
// worst regions, staffed by people who chose to be there or could not leave.

import { look, type RosterNpc } from "./types";

// ------------------------------------------------------------------ Ashwatch
// Ember Wastes. Ashwatch was twelve scouts; three are left. Sable is one.
const ASHWATCH: RosterNpc[] = [
  {
    id: "dunmore-vey", name: "Dunmore Vey", title: "Keeper of the Ashwatch roll",
    home: "ashwatch", role: "scout", gender: "male",
    look: look("char", "ember", "s3", "grey"),
    portrait: "Rangy man in his fifties, hands and forearms a lattice of old burn scars, ash-grey scarf, notebook on a lanyard, eyes narrowed against grit.",
    ties: ["sable", "rook"],
    secret: "The three lines he drew were scouts he sent ahead on his own judgement, against Sable's order. She has never asked, because she already knows.",
    history: [
      "Fire investigator. I walked through burned houses and told families which socket it started at. I was good at reading what fire leaves.",
      "I am one of the three left of Ashwatch. I keep the roll. Twelve names. Sable drew six of the lines. I drew the other three. I ask her nothing.",
    ],
    world: "Fire here does not behave. It keeps what it burns standing and walking. Twenty years of knowing fire, and I had to learn it again from nothing.",
    detail: "Dunmore keeps the Ashwatch roll and reads the Wastes' fires for what started them.",
    voices: {
      greeting: [
        "Stand out of the wind. Ash in the eyes is how we lost a good scout.",
        "You came by the wayfire. Sensible. The walk kills more than the Tyrant does.",
        "Gloves off. Let me see your hands. No burns. Then you are new, or careful.",
      ],
      idle: [
        "Nine lines on the roll. I say the names at the cook fire. Rook listens. He does not know any of them.",
        "The smoke column to the north is the wrong grey. Something is burning that should not burn.",
      ],
      farewell: [
        "Walk the pale ash. Glowing ground is not ground.",
        "Report to Sable if you see the columns join. She will want it before I do.",
      ],
      hint: [
        "Sable's trail runs five relic-bearers, then the Tyrant. Drop the five and its road opens.",
        "The Ash Tyrant hits twice as hard as anything near it. Do not trade. Strike and be gone.",
      ],
      wounded: [
        "Burn or bite? Burn. Sit. I know burns better than I know my own name.",
        "That will blister, then it will kill you slowly. Get to a medic who can purge it.",
      ],
      reaction: [
        "That is how Ashwatch did it, when there were twelve.",
        "I will add it to the log. Under the roll, not on it.",
      ],
    },
  },
  {
    id: "imre-sol", name: "Imre Sol", title: "Ashwatch water-master",
    home: "ashwatch", role: "official", gender: "male",
    look: look("sand", "sky", "s4", "white"),
    portrait: "Spare precise man in his sixties, measuring cup on a chain at his belt, cracked lips, sun-leathered skin, calm arithmetic stare.",
    ties: ["sable"],
    secret: "He has a sealed cistern of four hundred litres under the outpost floor that not even Sable knows of. It is for the day he judges the post lost.",
    history: [
      "Quartermaster, mountain rescue. I packed for other people's emergencies. I always packed too much water. They laughed. They stopped.",
      "Three of us are left from the twelve. I am the one who counts the water. Eleven litres a day for the post. I have never been wrong by a cup.",
    ],
    world: "People think the Wastes kill with fire. They kill with thirst and arithmetic. The fire is only what you see while it happens.",
    detail: "Imre rations Ashwatch's water to the cup and decides how far a patrol can go.",
    voices: {
      greeting: [
        "How much water are you carrying? Show me. No. Not enough. Sit. I will top you up.",
        "You look dry. People do not feel it until they fall. Drink this. All of it.",
        "Welcome. Do not wash anything. I mean anything.",
      ],
      idle: [
        "Eleven litres. Four people, a cook pot, and a dog that is not on the roll. I make it stretch.",
        "Sable takes a half ration and thinks I do not see. I pour it back into her flask at night.",
      ],
      farewell: [
        "Drink before you are thirsty. After is too late.",
        "Turn back at half your water. Not a swallow past.",
      ],
      hint: [
        "A rest refills your flasks. Take one at the outpost before the long push, not after it.",
        "Claim the outpost and build its cook fire. Two raw cuts become a meal worth more than a flask.",
      ],
      wounded: [
        "Drink first. Blood is mostly water, and you have been pouring it out.",
        "You are grey. That is shock or thirst. Either way, sit and drink.",
      ],
      reaction: [
        "Efficient. Nothing wasted. I admire that above most things.",
        "And you came back with water in the flask. Excellent.",
      ],
    },
  },
  {
    id: "vesna-karr", name: "Vesna Karr", title: "Crust-walker guide",
    home: "ashwatch", role: "scout", gender: "female",
    look: look("rust", "copper", "s5", "dark"),
    portrait: "Sun-browned woman in her forties, dark ponytail under a cracked hard hat with a faded university crest, steel probing rod, heat-reddened cheeks, intent downward gaze.",
    ties: ["lio", "sable"],
    secret: "Her survey shows the vents trace the outline of a buried structure the size of a town square. She has matched its plan to a Civic Works drawing and told no one.",
    history: [
      "Volcanologist. I had a doctorate and a hard hat, and I told governments when to move towns. They moved them late, every time.",
      "The lava broke the highway and I was the only one who knew what the ground was doing. So I walk ahead with a rod and people follow my feet.",
    ],
    world: "This is not a natural field. Vents do not open in rows. Something under the Wastes is laid out like pipework, and it is running hot.",
    detail: "Vesna guides travelers across the Ember Wastes' crust and reads the ground for what lies under it.",
    voices: {
      greeting: [
        "Stop. There. Not one step. Now come left. Left. Good. You were standing on a skin.",
        "Tap before you tread. Listen. Hollow means run. That is the whole lesson.",
        "Ah. A walker. You are heavier than you look. Mind the black crust.",
      ],
      idle: [
        "Three new vents since the moon turned. In a line. Nature does not do lines.",
        "The prospector by the split basalt wants crystal sites. I give him the safe ones. He is cross about it.",
      ],
      farewell: [
        "Pale ash is cool. Glow is not ground. Say it back.",
        "Go the way I showed you. Not the way that looks shorter.",
      ],
      hint: [
        "Magma slimes punish anyone who stands still. Hit one and keep your feet moving.",
        "The Cinder Vault opens northeast of Ashwatch. The ground there is firm. That worries me more.",
      ],
      wounded: [
        "A burn. Sit on the grey stone. It is cold. That needs a purge, not a bandage.",
        "You are shaking. Heat shock. Shade, water, and do not argue with a doctor of rocks.",
      ],
      reaction: [
        "Good footing. Good judgement. Same thing, out here.",
        "You read that correctly. I am impressed, and I am rarely that.",
      ],
    },
  },
  {
    id: "tully-moss", name: "Tully Moss", title: "Keeper of the Ashwatch cook fire",
    home: "ashwatch", alsoFits: ["road"], role: "cook", gender: "male",
    look: look("clay", "red", "s4", "brown"),
    portrait: "Round cheerful man in his forties, apron scorched black at the hem, bandana, ladle raised, sweat and soot and a huge gap-toothed smile.",
    ties: ["rook", "imre-sol"],
    secret: "His stew is thick because he seasons it with ember crystal dust. It makes people warm and bold, and he has not noticed that nobody at the post dreams any more.",
    history: [
      "Fry cook. Roadside place, The Skillet, off the old highway. Truckers drove forty miles past better food for my hash.",
      "Now I cook for Ashwatch on a fire that is already everywhere. I can do forty things with imp-singed meat, and I will not tell you what it was.",
    ],
    world: "People out here stop tasting. It is the first thing that goes. I keep them tasting. Someone who can complain about supper is still a person.",
    detail: "Tully keeps Ashwatch's cook fire and turns whatever the patrols bring into a real meal.",
    voices: {
      greeting: [
        "Sit! Eat! Do not ask! Asking ruins it.",
        "You are skin and grit. Here. Bowl. It is hot and it was recently something.",
        "Smell that? Onions. Real ones. A trader owed me. Do not tell the others.",
      ],
      idle: [
        "Rook never says if he likes it. He eats it all and looks at the pot. I count that as a review.",
        "The dog gets the bones. There is no dog on the roll. There is a dog.",
      ],
      farewell: [
        "Take a wrap for the road. It keeps two days or it keeps forever, depending.",
        "Come back hungry! That is how I know you are alive.",
      ],
      hint: [
        "Two raw cuts on a cook fire make one strong meal. Save your meat for a fire. Do not eat it raw.",
        "A lantern on the watchtower brings more meat and loot off kills near the post. Build it early.",
      ],
      wounded: [
        "Oh, that is cooked. Sorry. Bad joke. Sit, sit. I have burn fat. It works.",
        "You need a medic and a meal. I can do one of those very well.",
      ],
      reaction: [
        "Ha! That is worth seconds.",
        "Beautiful. I am naming the stew for you. Tonight it is yours.",
      ],
    },
  },
  {
    id: "brannoch-eze", name: "Brannoch Eze", title: "Ashfever medic",
    home: "ashwatch", role: "healer", gender: "male",
    look: look("pine", "bone", "s7", "black"),
    portrait: "Broad tired man in his forties, medic's satchel cross-slung, cloth mask pulled down round his neck, dark circles, steady capable hands.",
    ties: ["ilyan", "sable"],
    secret: "His immunity is not immunity. The black glass is still growing in him, slowly. He hears a faint ringing when the wind is from the vault, and it is getting louder.",
    history: [
      "Army medic, two tours. Then a burns unit. I have smelled this before. That is the only reason I can stand here.",
      "I caught ashfever in the first month and lived. One in five does. It left me the cough and an immunity, so I am the one who treats it.",
    ],
    world: "Ashfever is not a fever. It is the soot learning your lungs. I have opened nine who died of it. The inside of the chest is black glass.",
    detail: "Brannoch treats ashfever and burns at Ashwatch and is one of the few to have survived the fever himself.",
    voices: {
      greeting: [
        "Breathe in. Out. Again. Hm. You are clean. For now. Sit.",
        "Cloth over your mouth out there. I am not asking. I am tired of asking.",
        "You have the look. Behind the eyes. When did the headache start? Be exact.",
      ],
      idle: [
        "Three days of cough means go to Greyhaven and have Voss purge it. I can hold it. I cannot clear it.",
        "I still cough black in the mornings. It is company, of a kind.",
      ],
      farewell: [
        "Cloth. Mouth. Every time.",
        "If your eyes ache and the light hurts, turn back. That is the first sign and the only warning.",
      ],
      hint: [
        "Ashfever and burns do not pass on their own. A purge at a clinic clears them. Doctor Voss sells it.",
        "An Ember Ward Charm makes you proof against burning. Nothing else out here does.",
      ],
      wounded: [
        "On the cot. A burn over a wound. Worst of both. Hold still. This will hurt.",
        "I have done this under fire. You are easy. Stop talking and hold still.",
      ],
      reaction: [
        "Clean work. No casualties. That is my favourite kind of report.",
        "Nobody burned. I can sleep tonight.",
      ],
    },
  },
  {
    id: "glint-harrow", name: "Glint Harrow", title: "Crawler prospector",
    home: "ashwatch", alsoFits: ["road"], role: "trader", gender: "male",
    look: look("wine", "brass", "s2", "blond"),
    portrait: "Weaselly handsome man in his forties gone to seed, goggles, a gold tooth, an expensive coat ruined by ash, restless guilty hands.",
    ties: ["lio", "cora"],
    secret: "He has driven the crawler to within sight of Lio's camp eleven times and turned round every time. Under the seat is a letter he has rewritten forty times.",
    history: [
      "Prospector. Before that, a car salesman, and before that, a liar in general. I am being honest so you will believe the next part.",
      "I took the crawler when the storm hit. Lio was out on the basalt. I told myself he was already dead. I have told myself that every day since.",
    ],
    world: "Ember crystal is worth more than gold and it knows it. It sings to you. You start hearing what you want. I wanted to live. So that is what I heard.",
    detail: "Glint prospects ember crystal from an armored crawler and avoids one particular camp.",
    voices: {
      greeting: [
        "Easy. I am friendly. Mostly. I am friendly at this distance.",
        "You have been by the split basalt? Do not tell me who is there. No. Tell me. Is he alive?",
        "Buying, selling, or judging? I get a lot of the third.",
      ],
      idle: [
        "The crawler runs fine. That is the worst of it. It ran fine the whole way back.",
        "I have his half of the claim money in a tin. I have not spent a coin of it. That must count.",
      ],
      farewell: [
        "Stay off the orange seams. I am many things, but I do not want you dead.",
        "If you see Lio Venn, say—no. Say nothing. Say the crawler still runs.",
      ],
      hint: [
        "Wastes creatures only drop ember crystal while Lio's contract is active. Take his job first.",
        "Three crystals bind into one core. Then it goes to Cora Flint in Greyhaven. Nobody else can temper it.",
      ],
      wounded: [
        "Whoa. Sit. In the crawler, out of the ash. I have a kit. A very good kit. It was his.",
        "You are hurt badly. I have left one person out here. I am not making it two.",
      ],
      reaction: [
        "Huh. You came back for it. I would not have. I mean that as praise.",
        "Clean. You are better than me. That is not hard, but still.",
      ],
    },
  },
  {
    id: "ngozi-okonkwo", name: "Ngozi Okonkwo", title: "Tender of the signal fire",
    home: "ashwatch", role: "scout", gender: "female",
    look: look("navy", "ember", "s8", "grey"),
    portrait: "Tall serene woman in her fifties, long coat, brass spyglass, grey-threaded locs tied back, firelight on a calm watchful face.",
    ties: ["sable"],
    secret: "One of the three posts that stopped answering has started again, at the wrong hours, in a pattern that is not the code. She answers it anyway.",
    history: [
      "Lighthouse keeper. The last one on that coast. Everyone said it was a dead trade. I said the sea did not know that.",
      "I keep the Ashwatch signal fire and the wayfire. Smoke by day, flame by night. Other posts answer. Fewer than last year. I keep a tally.",
    ],
    world: "A light does one thing. It says: here. Somebody is here. In all my years I have never found a better sentence.",
    detail: "Ngozi tends the Ashwatch signal fire and wayfire and counts how many other posts still answer.",
    voices: {
      greeting: [
        "I saw you an hour off. I see everything an hour off. It is restful.",
        "Welcome. Stand by the fire. It will not burn you. This one is ours.",
        "You woke a wayfire to get here. Good. I felt it take.",
      ],
      idle: [
        "Seven posts answered last spring. Four this spring. I still light for all seven.",
        "The columns to the east join at dusk now. Sable watches them. I watch her watch them.",
      ],
      farewell: [
        "Come home by the wayfire. I keep it for exactly that.",
        "Go well. If you are lost, look for the tallest smoke. That is me.",
      ],
      hint: [
        "A wayfire wakes when its region is cleared. Wake them all and no road is long.",
        "A watchtower lantern lights the post and improves what the dead drop nearby. I would build it first.",
      ],
      wounded: [
        "Sit by the fire. It keeps things back. The medic is coming. I signalled when you crested the ridge.",
        "You are hurt, and you walked in anyway. Good. Sit. You have done the hard part.",
      ],
      reaction: [
        "I saw it from here. Well done. I built the fire a little higher for you.",
        "I will signal it down the line. Whoever is left will know.",
      ],
    },
  },
];

// ----------------------------------------------------------------- Rimewatch
// Frostfall Peaks. Rimewatch withdrew from the high shelter after losing six
// people to tracks that led the wrong way. Suri Kest stayed up there alone.
const RIMEWATCH: RosterNpc[] = [
  {
    id: "halla-brekke", name: "Captain Halla Brekke", title: "Rimewatch commander",
    home: "rimewatch", role: "guard", gender: "female",
    look: look("steel", "frost", "s1", "blond"),
    portrait: "Tall severe woman in her fifties, wind-burned face, white-blond braid under a fur hood, avalanche probe slung like a rifle, pale hard eyes.",
    ties: ["suri", "ysra"],
    secret: "The six were following a lone woman's tracks, heading north under a heavy load. Halla had seen her pass the post two days earlier, and let her through.",
    history: [
      "Ski patrol captain. Avalanche control. I set charges to bring the mountain down on purpose so it would not come down on people.",
      "I ordered Rimewatch off the high shelter after we lost the six. Suri Kest refused the order and stayed. I have not forgiven her. I check her smoke daily.",
    ],
    world: "Command is choosing who is cold. I chose. Six people walked after tracks I let them follow, because the tracks looked like ours.",
    detail: "Captain Brekke commands Rimewatch and ordered its retreat from the high shelter.",
    voices: {
      greeting: [
        "Close the door. Then report. In that order. Heat first.",
        "You came up the south face in that kit. Either you are tougher than you look or nobody warned you.",
        "State your route. I want to know which slope you loaded on the way.",
      ],
      idle: [
        "Suri's smoke was up at dawn. Good. I mean, noted.",
        "Six hooks on that wall. I ordered them left. The watch thinks it is sentiment. It is a warning.",
      ],
      farewell: [
        "Do not follow tracks. Follow broken snow. Ysra will tell you the difference.",
        "Dismissed. Come down before dark or dig in. There is no third choice.",
      ],
      hint: [
        "Ice-manes in a pack run faster and flank wider. Kill them down to one and the last is easy.",
        "A troll marks the snow where its slam will land. Leave the ring and it hits nothing.",
      ],
      wounded: [
        "Inside. Now. You will not feel that properly until you are warm. Then you will.",
        "That is a casualty. Stove, blankets, medic. Move.",
      ],
      reaction: [
        "Well done. I do not say it often. Do not expect it twice.",
        "That slope is safer tonight because of you.",
      ],
    },
  },
  {
    id: "anton-fisk", name: "Anton Fisk", title: "Bellwright of the pass",
    home: "rimewatch", role: "smith", gender: "male",
    look: look("umber", "brass", "s1", "grey"),
    portrait: "Small neat man in his sixties, fur cap with earflaps, a clockmaker's loupe frozen to his brow, coils of rope, fingers nimble despite the cold.",
    ties: ["suri", "iona-bell"],
    secret: "A tenth bell hangs high above the pass that he neither cast nor hung. It rings on windless nights, nineteen minutes apart, and it is drawing the wolves uphill.",
    history: [
      "Clock repairer. Tower clocks. I spent my life inside the works of things people only looked at the face of.",
      "I hang and tune the avalanche bells. Nine along the pass. Suri keeps the high ones free of ice. I have not seen her in two winters. I know her knots.",
    ],
    world: "The mountain speaks before it kills you. A bell is only a way of making it speak a language people will stop and listen to.",
    detail: "Anton hangs and tunes the avalanche bells along the Frostfall pass.",
    voices: {
      greeting: [
        "Hush. Hear that? Third bell, flat. Ice in the mouth. Sorry. Hello.",
        "Come in out of it. Mind the ropes. Each one is a bell, and each bell is somebody's life.",
        "You walked up under my bells. Did any ring as you passed? Think. It matters.",
      ],
      idle: [
        "The founder in Greyhaven cast these true. I only keep them honest.",
        "The high rope was retied last week. A hitch I did not teach. Suri is still up there, then.",
      ],
      farewell: [
        "If two bells ring together, get under stone. One is wind. Two is the mountain.",
        "Go quietly below the cornice. Do not shout. Not even for joy.",
      ],
      hint: [
        "If the snow goes silent, get under stone. Suri says it, and she is still alive to say it.",
        "Help Suri Kest hold her shelter against the three hunters, and the pass stays watched.",
      ],
      wounded: [
        "By the stove. I will ring for the surgeon. One long, two short.",
        "You are hurt and cold. The cold is hiding the hurt. Sit before it stops hiding it.",
      ],
      reaction: [
        "That rang true.",
        "I shall ring the low bell once. It means: well done.",
      ],
    },
  },
  {
    id: "kaya-tulugaq", name: "Kaya Tulugaq", title: "Sled-dog handler",
    home: "rimewatch", role: "hunter", gender: "female",
    look: look("teal", "bone", "s5", "black"),
    portrait: "Compact woman in her forties, long black braid, fur-ruffed parka, sun goggles pushed up, harness lines looped over one shoulder, a husky's nose under her arm.",
    ties: ["frida-hart", "ysra"],
    secret: "The two dogs that left run with the ice-manes now. She has seen them at the tree line, larger than they were, with frost growing in their coats.",
    history: [
      "I raced dogs. Long distance, a thousand miles of snow. I came fourth once in the big one. Fourth is a good place. Nobody bothers fourth.",
      "I run the Rimewatch team. Eight dogs. They pull the supply sled, and they tell me about wolves an hour before the scouts do.",
    ],
    world: "Wolves and dogs are one animal that made different choices. The ice-manes still remember it. They call to my team at night. Two have gone.",
    detail: "Kaya runs Rimewatch's sled dogs and reads the wolf packs through them.",
    voices: {
      greeting: [
        "Let them come to you. Do not reach. Good. They say you are all right.",
        "You smell of dog. You have one? Then we are friends already.",
        "Quiet. Lead dog is listening. There. East ridge. Six of them.",
      ],
      idle: [
        "Eight in the traces. Ten last winter. They did not die. They went. That is worse.",
        "The lead dog will not face north any more. I harness her last so she does not have to look.",
      ],
      farewell: [
        "Feed your dog before yourself. That is not kindness. It is sense.",
        "If the wolves sing and your dog answers, hold its collar and walk away.",
      ],
      hint: [
        "A dog fights beside you and grows stronger with every level. Keep it alive and it repays you.",
        "Ice-manes only run fast with company. Pick off the stragglers and the last one slows.",
      ],
      wounded: [
        "Down. Stay. Good. That is for you, not the dogs. The surgeon is in the long hut.",
        "You are bleeding into the snow. They will smell it from the ridge. Inside.",
      ],
      reaction: [
        "Good run. Clean line. The dogs would follow you.",
        "Hah. Fourth place would be proud.",
      ],
    },
  },
  {
    id: "pernille-aas", name: "Pernille Aas", title: "Keeper of the Rimewatch stove",
    home: "rimewatch", role: "cook", gender: "female",
    look: look("plum", "rose", "s1", "white"),
    portrait: "Tiny bent woman in her eighties in six layers of knitted wool, iron poker in hand, face like a walnut, shrewd kind eyes in the stove-glow.",
    ties: ["halla-brekke"],
    secret: "She lets the stove burn low for one hour each night on purpose. In that hour she can hear singing from under the ice, and she has come to look forward to it.",
    history: [
      "I kept a mountain hut for hikers. Forty beds, one stove, and soup at six whether you had earned it or not.",
      "It is the same work. Fewer hikers. I keep the Rimewatch stove alight. It has not gone out in eleven hundred nights. I sleep in a chair beside it.",
    ],
    world: "Cold is patient and it is polite. It asks very quietly if you would like to sit down a moment. Never sit down. That is all I know.",
    detail: "Pernille keeps the Rimewatch stove burning and has not let it go out in three years.",
    voices: {
      greeting: [
        "In. Boots off. Socks off. Here are dry ones. Do not argue with an old woman.",
        "You are blue round the mouth. Soup. Then you may tell me your name.",
        "Close it, close it! You are letting the warm out and it is the only one we have.",
      ],
      idle: [
        "Eleven hundred and nine nights. I feed it birch at midnight. It likes birch.",
        "The Captain does not eat until the watch has. I put hers aside. She pretends to find it by accident.",
      ],
      farewell: [
        "Dry socks in your pack. Two pair. That is the whole secret of the mountain.",
        "Come down before dark. I will keep a bowl hot till you do.",
      ],
      hint: [
        "Cold makes a wound go quiet. Check yourself by a fire, every time, before you call it nothing.",
        "A cooked meal mends more than a red heart. Bring raw meat to a cook fire and see.",
      ],
      wounded: [
        "Oh, child. By the stove. Not too near. Slowly, or the warm will hurt worse than the cold.",
        "Drink this. It is hot and it is sweet and you will keep it down.",
      ],
      reaction: [
        "There. I knew you had it in you. Have more soup.",
        "Now you have earned the big bowl.",
      ],
    },
  },
  {
    id: "viggo-ansgar", name: "Viggo Ansgar", title: "Frostbite surgeon",
    home: "rimewatch", role: "healer", gender: "male",
    look: look("slate", "sky", "s1", "grey"),
    portrait: "Lanky stooped man in his fifties, wire spectacles fogged at the edges, surgeon's roll under his arm, greying beard iced at the tips, gentle rueful smile.",
    ties: ["ilyan"],
    secret: "Nine cold-lung patients, and all nine had been within sight of the blue shelf where Frostmaul walks. In his private notes he has stopped calling it a disease.",
    history: [
      "Orthopaedic surgeon. Ski injuries. I rebuilt the knees of the rich and they sent me wine at Christmas.",
      "Now I take fingers. Toes. I have a jar. I am not proud of the jar, but I keep count in it, and it reminds me to go slowly.",
    ],
    world: "There is a cough up here I do not understand. Cold-lung. The breath comes out with frost in it, in a warm room. I have seen it nine times.",
    detail: "Viggo treats frostbite and cold-lung at Rimewatch and keeps count of what he has had to cut.",
    voices: {
      greeting: [
        "Hands. Both. Wiggle them. Good. All ten. I do like to start with good news.",
        "Sit by the lamp. I want to see the colour of your nose. Do not laugh. It is diagnostic.",
        "Ah. Somebody with all their fingers. You are a holiday to look at.",
      ],
      idle: [
        "Three toes this week. One man. He walked back alone. I told him he was lucky. He agreed.",
        "Doctor Voss writes that cold-lung hides under frostbite. He is right. I wish he were not.",
      ],
      farewell: [
        "Move your fingers every hundred steps. Count it. Counting keeps you alive up here.",
        "If it stops hurting, come back at once. Pain is the good sign.",
      ],
      hint: [
        "Numb is not healed. Frostfall hides a wound from the one carrying it. Check, then check again.",
        "A trauma kit sets you fully right. Doctor Voss in Greyhaven is the one who has them.",
      ],
      wounded: [
        "Table. Now. No, keep your boots on. I will cut them off if I need to.",
        "That is deeper than you feel. The cold is lying to you. Lie down.",
      ],
      reaction: [
        "Well done. And with every finger. Splendid.",
        "I shall add nothing to the jar tonight.",
      ],
    },
  },
  {
    id: "ren-halloran", name: "Ren Halloran", title: "Last of the lost patrol",
    home: "rimewatch", role: "scout", gender: "male",
    look: look("dusk", "frost", "s2", "brown"),
    portrait: "Hollow-eyed man in his thirties, snow goggles hanging unused at his throat, bitten nails, wool hat pulled low, always half-turned to look behind.",
    ties: ["ysra", "halla-brekke"],
    secret: "He did not stop to fix a binding. He heard a woman's voice behind him say his name, turned round, and that is the only reason he is alive. He has never placed the voice.",
    history: [
      "Mountain guide. Day trips. Families. I carried other people's children over streams and they tipped me in chocolate.",
      "I was seventh in the line that followed the tracks. I stopped to fix a binding. When I looked up there were six sets of prints, and no one in them.",
    ],
    world: "People say the tracks walked backward. They did not. They were ordinary. That is what I cannot make anyone understand. Perfectly ordinary.",
    detail: "Ren is the only survivor of the patrol Rimewatch lost to the tracks, and will not go above the tree line.",
    voices: {
      greeting: [
        "Did you come up alone? Did you check behind you? I mean it. Did you look?",
        "Hello. Sorry. I count people when they come in. One. Just you. Good.",
        "You walked in your own prints coming down, I hope. Tell me you did.",
      ],
      idle: [
        "Six sets going up. I have drawn them. Left, right, left, right. Nothing wrong with them. Nothing.",
        "Ysra says trust broken snow. I trust nothing white. I do the stores now.",
      ],
      farewell: [
        "Do not follow prints. Not even your own. Especially not your own.",
        "Look back every fifty steps. Humour me.",
      ],
      hint: [
        "Trust broken snow, not tracks. Ysra Pike says it, and she was right before any of us listened.",
        "Frostmaul keeps to the ground below the blue shelf. The air goes colder before you see it.",
      ],
      wounded: [
        "You are hurt. Sit. I will stay. I will not go and fix anything. I will stay right here.",
        "Inside. Please. I am not losing sight of anyone today.",
      ],
      reaction: [
        "You came back. All of you. One of one. Good.",
        "That is—yes. Good. I counted. Still one.",
      ],
    },
  },
  {
    id: "sorrel-venn", name: "Sorrel Venn", title: "Ice surveyor",
    home: "rimewatch", role: "scout", gender: "female",
    look: look("navy", "frost", "s3", "auburn"),
    portrait: "Sharp brisk woman in her forties, fair hair in a frosted braid, ice-core auger over her shoulder, frost on her eyelashes, her brother's narrow clever face.",
    ties: ["lio", "suri"],
    secret: "Her deepest core struck something that was not ice: a sealed metal casing stamped with a spiral. She refroze the borehole and marked the site on no map.",
    history: [
      "Venn and Venn, mineral survey. My brother had the nose for it. I had the maths. We argued about every claim and were each right about half.",
      "After the freeze I came north to core the ice. Lio went south for ember crystal. We split the instruments. He got the good compass.",
    ],
    world: "I have cored forty metres down. There is ash in the ice at thirty. A neat band. Something burned up here, very hot, and was packed in snow on purpose.",
    detail: "Sorrel surveys the Frostfall ice and is the estranged sister of the prospector Lio Venn.",
    voices: {
      greeting: [
        "Do not stand there. That is a core site. There. Thank you. Hello.",
        "You have come from the far south? Did you see a prospector? Thin, talks to rocks?",
        "Ah. A pair of working legs. Hold this. No, level. Level.",
      ],
      idle: [
        "Ash at thirty metres. In a glacier. I have checked the core four times. It is still there.",
        "He will be out of water by now and too proud to say so. He was always like that. About everything.",
      ],
      farewell: [
        "If you see Lio Venn, tell him I want the compass. He will know I mean come home.",
        "Mind the blue ice. It looks solid because it has decided to.",
      ],
      hint: [
        "Rimehold Depths opens below the southern ledge. It will not open without an Ancient Key.",
        "Frostmaul's icicles fly out in a ring. Move across the ring, not away down a line of it.",
      ],
      wounded: [
        "Sit on the sled. I have a kit and steady hands. Survey work. Hold still. I am precise.",
        "You are hurt. Do not be stoic. My brother is stoic, and look where that got him.",
      ],
      reaction: [
        "Hm. Accurate. I value accurate.",
        "Well done. That is a result I can plot.",
      ],
    },
  },
];

// ---------------------------------------------------------------- Blackwater
// Gloam Mire. The bridges sank, the water stopped reflecting faces, and
// something very large moves under the open pools.
const BLACKWATER: RosterNpc[] = [
  {
    id: "bo-tanager", name: "Bo Tanager", title: "Reed-cutter",
    home: "blackwater", role: "farmer", gender: "male",
    look: look("moss", "lichen", "s3", "brown"),
    portrait: "Short wiry man in his fifties, a scythe-like reed hook over his shoulder, straw hat, legs wet to the thigh, slow unhurried eyes.",
    ties: ["fen"],
    secret: "He has found reed in the east beds growing in a spiral. He cut one stem, and it bled something black and warm. He has not been back.",
    history: [
      "Thatcher. I put roofs on rich people's cottages so they could feel rustic. Reed is reed. I know reed.",
      "I cut for Blackwater now. Mats, walls, the causeway. I work the edges only. The good reed is in open water, and nobody cuts the good reed.",
    ],
    world: "The Mire grows faster than it should. I cut a channel on Monday and by Thursday it has closed. As if something wants the water covered.",
    detail: "Bo cuts reed for Blackwater's walls and causeways and knows where the Mire's edges will hold.",
    voices: {
      greeting: [
        "Mind the blade. It is longer than me. Morning.",
        "You have come along the causeway. Did it give at all? Under the left foot?",
        "Well now. A visitor. Mind the mats. They are drying.",
      ],
      idle: [
        "Reed is up a foot since the new moon. That is not weather. Weather does not hurry.",
        "Fen will not cross to the east beds. I do not ask a ferryman why he will not cross water.",
      ],
      farewell: [
        "Keep to the mats. Where I have laid mat, it holds.",
        "Go on, then. Roots, not water. Fen will have told you.",
      ],
      hint: [
        "Spitters stand off in the fog and reach you. Where the reeds bend, something is aiming.",
        "The Mire's water carries mire-rot. A purge at a clinic clears it. Do not wait for it to pass.",
      ],
      wounded: [
        "Sit on the bundle. Dry reed. It will soak that up. I will fetch the leech-woman.",
        "That is bleeding into the water. Out. Onto the boards. Quick.",
      ],
      reaction: [
        "Well cut.",
        "That is a tidy job. I like a tidy job.",
      ],
    },
  },
  {
    id: "marguerite-voclain", name: "Marguerite Voclain", title: "Leech-doctor",
    home: "blackwater", role: "healer", gender: "female",
    look: look("teal", "bone", "s1", "silver"),
    portrait: "Elegant weary woman in her fifties, silver-streaked chignon, rubber apron over a once-fine blouse, glass jar in hand, precise sceptical mouth.",
    ties: ["ilyan", "fen"],
    secret: "Every patient who recovered reports the same dream: standing in open water while something vast turns over beneath them. She has had it twice herself, and was never ill.",
    history: [
      "Haematologist. Blood disorders. I was published. I had a parking space with my name on it.",
      "Mire-rot kills by thickening the blood. Leeches thin it. It is medieval and it works, and I have stopped being embarrassed in front of myself.",
    ],
    world: "The rot is not an infection. Nothing grows in the samples. The blood simply decides to stop. I have never seen a thing so much like an instruction.",
    detail: "Marguerite treats mire-rot at Blackwater with leeches and has stopped apologising for it.",
    voices: {
      greeting: [
        "Roll up your sleeve. No, I am not putting one on you. I am looking at your veins.",
        "Good day. Do not be alarmed by the jars. They are colleagues.",
        "You waded. I can smell it. Sit. Let me see your ankles.",
      ],
      idle: [
        "Fourteen cases this season. Eleven walking. The leeches die afterwards. I find that I mind.",
        "Doctor Voss calls it mire-rot too. He does not know why it stops at the tree line. Nor do I.",
      ],
      farewell: [
        "Keep your cuts dry. The Mire comes in through anything open.",
        "If your fingers go dark at the tips, come back that day. Not the next.",
      ],
      hint: [
        "Mire-rot rides the water. Keep to the roots, and have a clinic purge it if it takes hold.",
        "Shieldbearers and brutes hit hardest in the Mire. Do not let one drive you into the bog.",
      ],
      wounded: [
        "On the table. That wound has Mire in it. I need to clean it before the blood notices.",
        "Arm out. Yes, now I am putting one on you. Do not look.",
      ],
      reaction: [
        "Elegant. I do not often get to say that here.",
        "A clean result. I shall write it up, for nobody.",
      ],
    },
  },
  {
    id: "perrin-drake", name: "Perrin Drake", title: "Stilt scout",
    home: "blackwater", role: "scout", gender: "male",
    look: look("wine", "cream", "s2", "red"),
    portrait: "Long-limbed stubbled man in his thirties on tall reed-wrapped stilts, patched harlequin waistcoat under a mud-stiff coat, spyglass, a showman's grin gone thin.",
    ties: ["fen"],
    secret: "From the top of the old pylon he has seen the whole Mire at once. The channels form a spiral, and the open water at its centre is perfectly round.",
    history: [
      "Circus. Stilt-walker, third generation. I juggled fire nine feet up for people eating candy floss. I was never once afraid of falling.",
      "On stilts I can cross water the others cannot, and see over the reed. Blackwater calls it scouting. It is the act, with a worse audience.",
    ],
    world: "From nine feet up you can see the Mire has a shape. The channels all curve the same way, toward the middle. Like a drain.",
    detail: "Perrin scouts the Gloam Mire on stilts and sees over the reed beds to what moves beyond.",
    voices: {
      greeting: [
        "Down here! No. Up here. Hello. Sorry about the angle.",
        "Mind the poles. I am taller than I am clever.",
        "You came by the low path? Brave. I watched you from above. You missed two.",
      ],
      idle: [
        "Fog at knee height. My knees. So, well over your head.",
        "Something large went under the east channel at dawn. It made no wake. It made the opposite of one.",
      ],
      farewell: [
        "Keep to the roots. I will walk beside you to the edge. Above you. Beside you, above.",
        "Go carefully. I cannot catch you from up here. I have tried.",
      ],
      hint: [
        "Spitters wait where the fog is thickest. If you cannot see across a channel, assume one is there.",
        "The Gloam Mire has spitters and shieldbearers. Bring a gun for one and patience for the other.",
      ],
      wounded: [
        "Hold on. Coming down. This takes a moment. Do not bleed faster on my account.",
        "You are hurt. Lean on the pole. No, the other one. That one is my leg.",
      ],
      reaction: [
        "Bravo! I would throw you a rose. I have a reed.",
        "Now that deserved a bigger crowd.",
      ],
    },
  },
  {
    id: "jubilee-sweet", name: "Mama Jubilee", title: "Eel-smoker",
    home: "blackwater", role: "cook", gender: "female",
    look: look("ochre", "red", "s8", "grey"),
    portrait: "Big warm woman in her sixties, bright head tie, smoke-stained apron, a string of eels over one shoulder, laugh lines and an iron spoon.",
    ties: ["fen", "marguerite-voclain"],
    secret: "The eels from the deep channel have begun coming up with marks along their sides: a row of tiny, perfect spirals. She smokes those separately and serves them to no one.",
    history: [
      "I had a food truck. Jubilee's. Fried catfish, hush puppies, sweet tea. A line round the block on Sundays after church.",
      "Now it is eel. The Mire gives eel and not much else. I smoke them over wet alder. Folks cross the causeway just for a string.",
    ],
    world: "A hot supper is a kind of defiance. That thing out in the water can have the dark. It cannot have my Sunday.",
    detail: "Mama Jubilee smokes eel at Blackwater and feeds the whole outpost on Sundays.",
    voices: {
      greeting: [
        "Well, look at you. Half drowned and all skinny. Sit yourself down, baby.",
        "You hungry? That was not a question. You are hungry.",
        "Wipe your feet on the reed. I keep a clean smokehouse and a dirty mouth.",
      ],
      idle: [
        "Eels are running deep this week. Deep means something scared them down. I wonder what scares an eel.",
        "Fen says grace over my cooking. Only time that man says ten words together.",
      ],
      farewell: [
        "Take a string for the road. Smoked eel keeps better than you will.",
        "You come back Sunday. I mean it. I set a place.",
      ],
      hint: [
        "Raw meat is no good to you raw. Cook two cuts on a fire and you have a meal that mends.",
        "Build the cook fire when you claim an outpost. A fed fighter outlasts a brave one.",
      ],
      wounded: [
        "Oh, baby, no. Sit. Sit. Marguerite! Bring your nasty little jars!",
        "You are bleeding on my clean floor and I do not even care. Sit down.",
      ],
      reaction: [
        "Now that is what I am talking about! Sunday plate for you.",
        "Mm. That was done right. Like somebody raised you.",
      ],
    },
  },
  {
    id: "casimir-wolfe", name: "Casimir Wolfe", title: "Bridge engineer",
    home: "blackwater", role: "tinker", gender: "male",
    look: look("umber", "ash", "s1", "silver"),
    portrait: "Upright silver-moustached man in his seventies, waders over a tweed waistcoat, surveyor's staff, rolled drawings under his arm, undefeated jaw.",
    ties: ["fen", "marguerite-voclain"],
    secret: "His survey shows the piers were pulled toward one point under the central pool. The force lines make the same figure as the seal on a Civic Works drainage plan he once approved.",
    history: [
      "Structural engineer. Bridges. My name is on a plaque over a river three hundred miles from here. I assume the plaque is still there.",
      "The Blackwater bridges did not collapse. I have surveyed the piers. They were pulled. Downward. Evenly. I am going to rebuild them anyway.",
    ],
    world: "Everyone here has decided the water wins. I have a set square and forty years. I do not accept the premise.",
    detail: "Casimir is determined to rebuild the sunken Blackwater bridges and has measured exactly how they fell.",
    voices: {
      greeting: [
        "Do not step on the string line. It took me a morning. Hello.",
        "You have crossed. Good. How much did the third span move under you? In inches.",
        "Ah. An extra pair of hands. Hold the staff upright. Upright. That is not upright.",
      ],
      idle: [
        "The piles for the first span sit four inches lower than last week. Nothing settles that fast.",
        "Fen ferried people for a coin a head. I am going to put him out of business. He says he hopes so.",
      ],
      farewell: [
        "Walk the causeway centre. I built the centre. I did not build the edges.",
        "Go on. Bring me iron bolts if you find any. Any size. I will make them the right size.",
      ],
      hint: [
        "Shieldbearers block shots from the front. Break the guard or get round the side.",
        "A spike ring round an outpost wounds whatever crosses it. Build it before a raid, not during.",
      ],
      wounded: [
        "Sit on the beam. It is level. I checked. I will fetch the doctor and her horrible jars.",
        "You are losing structural integrity. Sit down. That is a professional opinion.",
      ],
      reaction: [
        "Sound. Structurally and otherwise.",
        "Well built. I mean well done. Same thing.",
      ],
    },
  },
  {
    id: "nix-calder", name: "Nix Calder", title: "Salvage diver",
    home: "blackwater", role: "scavenger", gender: "male",
    look: look("char", "sky", "s2", "dark"),
    portrait: "Thickset silent man in his forties, patched dry-suit rolled to the waist, coiled rope, old brass dive lamp, pale eyes that have looked at dark too long.",
    ties: ["fen"],
    secret: "On the smooth floor he found a hatch with a wheel. It was warm. Somebody had turned it recently, from the inside, and left wet handprints on the outside.",
    history: [
      "Commercial diver. Oil rigs. Cold black water and good money. I liked it down there. Nobody talks.",
      "I dive the sunk road for Blackwater. Cars, mostly. Tins. Once a safe. I go alone, on a rope, with a lamp that reaches about an arm.",
    ],
    world: "There is a floor down there that is not mud. Smooth. Warm. It runs farther than my rope. I swam along it for a minute. I have not done it again.",
    detail: "Nix dives the drowned road beneath the Mire for salvage and has touched what lies under it.",
    voices: {
      greeting: [
        "Hm.",
        "You are dry. Stay that way.",
        "Sit if you want. I do not talk much. It is not you.",
      ],
      idle: [
        "Pulled a crate today. Stamped CITY WORKS. Did not open it. Put it back.",
        "It is quiet down there. Then it is a different kind of quiet. You learn to come up at the second kind.",
      ],
      farewell: [
        "Stay off the water.",
        "If your rope goes slack, it is not slack. Something took up the other end.",
      ],
      hint: [
        "Spitters keep their distance in the fog. Break their line of sight before you close in.",
        "Gold keys come off the great dead. There is a gold chest wherever one of them falls.",
      ],
      wounded: [
        "Pressure. There. I will get the doctor.",
        "That is bad. Do not go near the water like that.",
      ],
      reaction: [
        "Good.",
        "Clean dive. So to speak.",
      ],
    },
  },
  {
    id: "wilf-peat", name: "Wilf Peat", title: "Keeper of the firefly lamps",
    home: "blackwater", role: "resident", gender: "male",
    look: look("pine", "lichen", "s1", "grey"),
    portrait: "Round-faced bearded man in his sixties, old hotel porter's jacket with tarnished buttons, a jar of green light cupped in both hands, dreamy half-smile.",
    ties: ["fen"],
    secret: "The fireflies now blink in unison every nineteen minutes. He has begun timing his breathing to it without noticing, and no longer sleeps.",
    history: [
      "Night porter at a hotel. Twenty years of other people's sleep. I liked the lobby at four in the morning. It belonged to me and the fish tank.",
      "Oil is scarce and the Mire eats a flame. So I keep fireflies. Jars of them along the causeway. They are not bright. They are enough.",
    ],
    world: "The big dark thing out there does not like them. I do not know why. Where my jars hang, the water stays flat. So I hang more jars.",
    detail: "Wilf lights Blackwater's causeway with jars of fireflies and tends them every dusk.",
    voices: {
      greeting: [
        "Oh. Hello. Softly, please. They dim if you shout.",
        "You found the path by my jars. That makes me very happy. Come and sit.",
        "Good evening. It is always evening here, really. I do not mind.",
      ],
      idle: [
        "Two hundred and six jars. I let a third go each morning and catch new at dusk. Fair is fair.",
        "They all blinked together last night. All of them. Once. I have never seen that.",
      ],
      farewell: [
        "Follow the green lights out. Where they stop, do not go.",
        "Good night. Walk between the jars.",
      ],
      hint: [
        "A flashlight slows each of the dead the first time its beam finds them. Use it after dusk.",
        "Night sends packs out after you. If you must cross the Mire, cross it by day.",
      ],
      wounded: [
        "Oh dear. Oh, you are hurt. Sit by the jars. They are calming. I will fetch the doctor.",
        "Stay in the light. Please. Nothing comes into the light.",
      ],
      reaction: [
        "That was lovely. They glowed. Did you see? They glowed for you.",
        "Oh, well done. Gently done.",
      ],
    },
  },
];

export const OUTPOST_ROSTER: RosterNpc[] = [...ASHWATCH, ...RIMEWATCH, ...BLACKWATER];
