// Hearthglen: a palisade village of forty-odd people who survived the first
// night together. Tight, practical, wary of strangers, held together by food.

import { look, type RosterNpc } from "./types";

export const HEARTHGLEN_ROSTER: RosterNpc[] = [
  {
    id: "hesper-dunn", name: "Hesper Dunn", title: "Hearthglen gatewright",
    home: "hearthglen", role: "resident", gender: "female",
    look: look("umber", "copper", "s3", "grey"),
    portrait: "Woman in her fifties, grey-streaked hair pinned up with sawdust in it, carpenter's pencil behind one ear, steady appraising squint.",
    ties: ["orin", "mara", "tomas"],
    secret: "The first gate failed because she left one brace unpinned to finish by dusk. Mara's Tomas died in that gap. Only Orin knows; he forged the pin she never fitted.",
    history: [
      "Cabinet-maker. Dovetails, veneers, a waiting list eight months long. Nobody waits eight months for anything now.",
      "I built the first south gate out of barn doors. It held nineteen minutes. The one standing now has held four years. I count both.",
    ],
    world: "Every wall is a guess about what will hit it. I walk the palisade each dawn and argue with my guesses.",
    detail: "Hesper keeps Hearthglen's gates standing and knows which approaches the dead favor.",
    voices: {
      greeting: [
        "Wipe your feet. Not for manners. I want to see what mud you walked through.",
        "You came in by the south gate. Did the hinge sing? Left side?",
        "Stand there. No, you are fine. I am measuring the post behind you.",
      ],
      idle: [
        "Nineteen minutes. I have rebuilt that gate in my head four thousand times.",
        "Oak for the bar, ash for the brace. Never pine. Pine is a promise you cannot keep.",
      ],
      farewell: [
        "Latch it behind you. Lift, then push.",
        "Go out the way the gate swings. It is faster than you think.",
      ],
      hint: [
        "A charger runs a line, not a person. Step off the line and it passes like a cart.",
        "A spike ring on an outpost bleeds whatever crosses it. Worth the gold before a raid.",
      ],
      wounded: [
        "You are sagging on the left like a bad door. Mara, now.",
        "I have seen what happens to things that keep bearing load once they crack. Off your feet.",
      ],
      reaction: [
        "Square and true. Good.",
        "That will hold. I would put my name on it.",
      ],
    },
  },
  {
    id: "bram-tolliver", name: "Bram Tolliver", title: "Night bell-ringer",
    home: "hearthglen", role: "guard", gender: "male",
    look: look("navy", "brass", "s2", "white"),
    portrait: "Stout old man, wild white eyebrows, one hand cupped behind his right ear, bell-rope scar across his palm, delighted grin.",
    ties: ["elowen"],
    secret: "He was not ringing a warning that first night. He was too frightened to stop. The six hours people praise him for was panic, and he has let the legend stand.",
    history: [
      "Church organist. Forty years of weddings. Then I rang the outbreak bell for six hours and it took the hearing on my left clean off.",
      "They gave me the night watch because I cannot hear the dead, so I never stop looking. Works a treat. Speak to my right side.",
    ],
    world: "Dark is not empty, it is only impolite. I ring the hour so people know somebody is awake and annoyed about it.",
    detail: "Bram rings Hearthglen's night bell and watches the dark hours from the palisade.",
    voices: {
      greeting: [
        "WHO GOES—oh. You. Come round to my good ear.",
        "Evening! Or morning. I ring them, I do not keep track of them.",
        "You walk loud. I like that in a person. I can find you.",
      ],
      idle: [
        "Quiet night. I assume. Somebody would wave if it was not.",
        "I still hear the organ some nights. Left ear only. The broken one. Explain that.",
      ],
      farewell: [
        "Mind how you go! I said MIND HOW—never mind.",
        "If the bell rings fast, run toward it, not away.",
      ],
      hint: [
        "After dark they spot you from farther off. A flashlight beam slows the first thing it lands on.",
        "Night brings packs that were not there by day. Never count on a road staying clear.",
      ],
      wounded: [
        "You are bleeding! I can see that perfectly well. I am deaf, not blind!",
        "Mara's is the house with the lamp. GO.",
      ],
      reaction: [
        "Ha! Ring the bell for that one!",
        "Well done. I did not hear a word of it, but well done.",
      ],
    },
  },
  {
    id: "wren-abbot", name: "Wren Abbot", title: "Self-appointed village counter",
    home: "hearthglen", role: "child", gender: "female",
    look: look("wheat", "sky", "s4", "dark"),
    portrait: "Girl of about ten, dark hair in two plaits, serious dark eyes, a knotted tally cord around her neck, chalk dust on her fingers.",
    ties: ["kael", "elowen", "mara"],
    secret: "She keeps a second, hidden tally of people who left and were never crossed out, because no one would tell her they died. She still counts them at supper.",
    history: [
      "I was six before. I had a bedroom with stars on the ceiling. I do not remember the color of the walls and it bothers me.",
      "Now I am the counter. I count the chickens, the arrows, and the people who come back. Somebody has to, and grown-ups round up.",
    ],
    world: "There are forty-four of us. There were forty-six in spring. I do not round.",
    detail: "Wren counts everything in Hearthglen and notices who and what has gone missing.",
    voices: {
      greeting: [
        "You are number forty-five if you stay for supper. Are you staying for supper?",
        "Did you kill any today? How many? Exactly how many?",
        "Your boot has a hole. That is one hole. I am writing it down.",
      ],
      idle: [
        "Eleven chickens. One is hiding. I know which.",
        "Kael said a bad word at the forge. I counted that too.",
      ],
      farewell: [
        "Come back so I do not have to cross you out.",
        "Bye. That is your third time leaving this week.",
      ],
      hint: [
        "The big ones with names do not come back after. The little ones do. I checked.",
        "Elowen says spitters stand behind the slow ones. So look behind the slow ones.",
      ],
      wounded: [
        "You have a lot of red on you. More than last time.",
        "Mara says sit, so sit. I will count to a hundred with you.",
      ],
      reaction: [
        "That is a new record. I will tell everyone.",
        "I am putting a star by your name. A big one.",
      ],
    },
  },
  {
    id: "dova-kerrow", name: "Dova Kerrow", title: "Keeper of the common pot",
    home: "hearthglen", role: "cook", gender: "female",
    look: look("clay", "cream", "s5", "grey"),
    portrait: "Plump motherly woman in her sixties, grey curls pinned under a kerchief, sleeves rolled past the elbow, ladle held like a sceptre, flushed kind face.",
    ties: ["tomas", "mara", "maro"],
    secret: "The pot is fuller than the stores allow because she stopped eating supper herself a year ago.",
    history: [
      "School canteen, thirty years. Four hundred children a day and not one of them grateful. I miss every single one.",
      "The first winter I made soup from boot leather and a lie about what was in it. Nobody asked. That is how I knew we would make it.",
    ],
    world: "You can tell how a town is doing by who comes for seconds and who says they already ate. The liars are the ones I watch.",
    detail: "Dova feeds Hearthglen from one pot and knows exactly who is going without.",
    voices: {
      greeting: [
        "You are thin. Do not argue, I have eyes. Bowl is there.",
        "Smells like you have been somewhere awful. Wash, then eat.",
        "In, in. I do not ask where the meat came from if you do not ask what is in the stew.",
      ],
      idle: [
        "Onions from Tomas, salt from Maro, and whatever the hunters did not lose. That is supper.",
        "Mara has not eaten since yesterday. I am taking her a bowl and she can glare at me.",
      ],
      farewell: [
        "Take bread. No, take it. You will thank me by the creek.",
        "Come back for supper. I am counting bowls.",
      ],
      hint: [
        "Bring raw meat home. Two cuts on a cook fire make a meal that heals better than a red heart.",
        "An outpost with a watchtower lantern turns up more meat and loot nearby. Light it.",
      ],
      wounded: [
        "Oh, look at you. Mara first, then soup. In that order. I am not a monster.",
        "You can bleed or you can stand. Not both. Down. This instant.",
      ],
      reaction: [
        "There. Now you look like a person.",
        "Eat while it is hot. Praise me later.",
      ],
    },
  },
  {
    id: "pell-okoro", name: "Pell Okoro", title: "Palisade beekeeper",
    home: "hearthglen", role: "farmer", gender: "male",
    look: look("ochre", "bone", "s7", "black"),
    portrait: "Lean bearded man in his forties, beekeeper's veil pushed back on a straw hat, calm half-smile, a bee resting unbothered on his knuckle.",
    ties: ["mara", "veiled"],
    secret: "One hive has started building comb in a spiral instead of rows. He has told nobody, and has begun sleeping beside it.",
    history: [
      "I sold phones. Eleven years in a bright shop telling people their lives were in the wrong size of rectangle. The bees were my uncle's.",
      "Three hives came through the first winter. I talk to them every morning. They are the only ones here who still plan for next year.",
    ],
    world: "Bees do not grieve a lost forager. They fly the route again tomorrow. I am not saying we should be like that. I am saying it works.",
    detail: "Pell keeps the hives on the palisade and trades honey, wax, and quiet observations.",
    voices: {
      greeting: [
        "Slowly, please. The girls do not like sudden people.",
        "Ah. You smell of smoke. They will forgive you. I am less sure.",
        "Good day. Stand in the sun a moment. You look like you have forgotten it.",
      ],
      idle: [
        "They went quiet at noon yesterday. Two hours later the west fence had company.",
        "Wax for Mara's salves, honey for the pot. Everything here is owed to somebody.",
      ],
      farewell: [
        "Walk gently. It costs nothing.",
        "Go well. Come back before the clover shuts.",
      ],
      hint: [
        "Honey will not mend you. A rest will, and it fills your flasks again. Do not skip rests.",
        "Bats never fly straight at you. Let them finish the weave before you strike.",
      ],
      wounded: [
        "You are hurt. Be still. Even the bees know when to stay in the hive.",
        "Go to Mara. I will bring honey for after. It helps the taking of medicine.",
      ],
      reaction: [
        "That was well done, and quietly. My favorite kind.",
        "The girls approve. They are dancing, anyway.",
      ],
    },
  },
  {
    id: "ines-calloway", name: "Ines Calloway", title: "Village schoolteacher",
    home: "hearthglen", role: "storyteller", gender: "female",
    look: look("teal", "cream", "s3", "brown"),
    portrait: "Young woman, hair pinned up with a pencil, chalk on her cuff, firm patient gaze, a battered atlas under one arm.",
    ties: ["edda", "wren-abbot"],
    secret: "She is teaching the children the road to Greyhaven as a counting rhyme, because she does not believe Hearthglen will see another winter.",
    history: [
      "I was training to teach when the schools closed for good. I had one term of practice and a folder of lesson plans about the water cycle.",
      "Edda Marr taught me my letters in the old city. Now I teach six children theirs from tin labels. They can all spell condensed.",
    ],
    world: "Children ask what the world was for. I tell them it was for arguing about small things, and that this was a luxury worth getting back.",
    detail: "Ines teaches Hearthglen's children and keeps the village's only shelf of books.",
    voices: {
      greeting: [
        "Good. A visitor. Children, this is what a primary source looks like.",
        "Boots off the mat, please. Thank you. See, it is not hard.",
        "You have news of outside? Tell it slowly. I will be quizzed on it later.",
      ],
      idle: [
        "Six pupils, four slates, one atlas with the oceans torn out. We manage.",
        "Wren corrected my arithmetic today. She was right. I have not recovered.",
      ],
      farewell: [
        "Come back and tell them about the mountains. I only have a picture.",
        "Mind your grammar and your flanks.",
      ],
      hint: [
        "The map fills in only where you have walked. Unexplored is not the same as empty.",
        "Each region breeds its own dead. Learn one before you cross into the next.",
      ],
      wounded: [
        "Sit down. That is not a request. That is a classroom voice.",
        "You are frightening the children. See Mara, then come and frighten them properly with a story.",
      ],
      reaction: [
        "Full marks. I do not give those.",
        "Very good. Now explain how you did it, in a complete sentence.",
      ],
    },
  },
  {
    id: "garrick-shaw", name: "Garrick Shaw", title: "Ration clerk",
    home: "hearthglen", role: "official", gender: "male",
    look: look("slate", "bone", "s2", "grey"),
    portrait: "Thin man in his fifties, wire spectacles mended with twine, ledger clutched to his chest, expression of permanent polite regret.",
    ties: ["dova-kerrow", "tomas"],
    secret: "His ledger has two columns nobody else has seen: what the village thinks is in the granary, and what is. The gap is Dova.",
    history: [
      "Insurance adjuster. I assessed risk for a living. I was very good, which is why I was not surprised. Only disappointed.",
      "I keep the stores ledger now. Every sack, every candle. People think I am mean. I am the reason there was bread in March.",
    ],
    world: "I have run the figures. We have a one in three chance of another harvest. I do not share that. I just lock the granary properly.",
    detail: "Garrick keeps Hearthglen's stores ledger and can tell you precisely how bad things are.",
    voices: {
      greeting: [
        "Name and purpose. I am joking. I wrote both down when you came through the gate.",
        "Ah. The variable. Every time you leave, my forecasts get worse and then better.",
        "If you are here to ask for extra, the answer is a number, and the number is no.",
      ],
      idle: [
        "Forty-one days of grain at current burn. Thirty-three if the kitchen stays generous.",
        "I underwrote a man's boat once. He sank it on purpose. I miss that scale of problem.",
      ],
      farewell: [
        "Try to return. You are an asset, and I mean that as warmly as I can.",
        "Statistically, you will be fine. Statistically.",
      ],
      hint: [
        "The trunk at your house holds what you cannot carry. Use it. Dead weight gets people killed.",
        "Gold from a kill climbs with distance from home. So do the odds you never spend it.",
      ],
      wounded: [
        "You are a poor risk in that condition. See Mara.",
        "I have written off better assets for less blood than that. Go.",
      ],
      reaction: [
        "That is a favorable outcome. I will note it.",
        "My projections improve. Slightly. Do not let it go to your head.",
      ],
    },
  },
  {
    id: "sunniva-brae", name: "Sunniva Brae", title: "Last shepherd",
    home: "hearthglen", role: "farmer", gender: "female",
    look: look("moss", "ash", "s2", "blond"),
    portrait: "Weathered woman in her forties, long fair plait under a wool cap, crook across her shoulders, amused crow's-feet, a goat butting into frame.",
    ties: ["nell-farrow", "dova-kerrow"],
    secret: "There were fourteen in the flock. She traded three to a caravan for fever medicine and told the village that wolves took them.",
    history: [
      "Long-haul dispatcher. I knew every road in three counties by its number. Never touched a sheep until one followed me out of a ditch.",
      "Eleven head now. I named them for highways. Route Nine is the clever one. The Bypass is exactly what you would expect.",
    ],
    world: "A flock teaches you the dead are not clever, only patient. Anything that keeps moving and stays together mostly lives.",
    detail: "Sunniva grazes Hearthglen's last flock beyond the fence and reads the meadow's moods.",
    voices: {
      greeting: [
        "Mind the Bypass. She will eat your bootlace and look you in the eye doing it.",
        "Afternoon. You are upwind. The flock thanks you.",
        "Seen anything on four legs out there that was not mine? Count carefully.",
      ],
      idle: [
        "Route Nine would not graze the south slope today. I do not graze where she will not.",
        "Wool for the seamstress, milk for the pot. The rest is keeping eleven idiots alive.",
      ],
      farewell: [
        "Close the hurdle behind you or I am chasing the Interstate till dark.",
        "Keep to open ground. Long grass hides things, and also holes.",
      ],
      hint: [
        "Chargers turn wide. Step across late and they go past like a truck missing its exit.",
        "A dog is worth adopting. It follows, it fights, and it gets better the longer it lives.",
      ],
      wounded: [
        "You are limping like the Bypass after the fence. Go and see Mara.",
        "I have splinted worse on a goat, and the goat complained less. Hold still.",
      ],
      reaction: [
        "Well herded.",
        "That will do. High praise. Ask the sheep.",
      ],
    },
  },
  {
    id: "lew-thorn", name: "Lew Thorn", title: "Palisade spearman",
    home: "hearthglen", role: "guard", gender: "male",
    look: look("rust", "sage", "s3", "brown"),
    portrait: "Round-faced man in his thirties, spear propped in the crook of his arm, mid-anecdote grin, apron still tied on under a padded jerkin.",
    ties: ["elowen", "orin", "garrick-shaw"],
    secret: "He was on the south gate the first night, and he ran. The whole cheerful-gossip act is built on top of that.",
    history: [
      "Bartender. I knew everybody's business then and I know it now. The skills transfer better than you would think.",
      "Elowen tried to teach me the bow. I hit a chicken. Our chicken. So they gave me a spear and the stretch of wall nearest the kitchen.",
    ],
    world: "Out there is teeth. In here is people, which is worse but more interesting. I will take in here.",
    detail: "Lew holds a stretch of Hearthglen's wall and knows every rumor inside it.",
    voices: {
      greeting: [
        "There you are! Sit, sit. Tell me everything and I will tell you twice as much.",
        "You missed it. Orin laughed. Out loud. We are still discussing it.",
        "Do not tell Elowen I am leaning on the spear. It is resting. I am resting it.",
      ],
      idle: [
        "The candles got counted twice today. Something is short. Mark me.",
        "Quiet on my stretch. I credit my fearsome reputation with chickens.",
      ],
      farewell: [
        "Bring back gossip! Or loot. Gossip is lighter.",
        "Off you go. I will tell everyone you looked very brave.",
      ],
      hint: [
        "A firefighter's axe is slow, but it hits every zombie inside the swing. Good against a crowd.",
        "Shoot the spitter first. Always the spitter. Everything else has to walk to you.",
      ],
      wounded: [
        "Oh, that is nasty. Mara! No, do not look at it. I looked. Do not.",
        "Here, by me. I will talk at you till Mara comes. You will wish you had fainted.",
      ],
      reaction: [
        "Ha! Wait till I tell the kitchen.",
        "Brilliant. That is going straight into circulation.",
      ],
    },
  },
  {
    id: "tilda-reyes", name: "Tilda Reyes", title: "Midwife and herbalist",
    home: "hearthglen", role: "healer", gender: "female",
    look: look("pine", "lichen", "s5", "silver"),
    portrait: "Stocky woman in her sixties, herb-stained fingers, grey braid over one shoulder, shrewd warm eyes, dried yarrow at her belt.",
    ties: ["mara", "dane-whitlock"],
    secret: "A fourth baby did not live, nor did the mother. Tilda buried both outside the fence at night and wrote it up as a family that left for Greyhaven.",
    history: [
      "Midwife. Two hundred and six babies, all breathing. People forget that most of medicine is waiting and clean hands.",
      "Three born inside this fence since the dead rose. I delivered the last by candle with a horde at the west post. She is called Hope. Obviously.",
    ],
    world: "Mara stitches what the world tears. I look after what the world has not got to yet. We argue about willow bark. She is wrong.",
    detail: "Tilda delivers Hearthglen's babies, grows its medicine, and disagrees with Mara on principle.",
    voices: {
      greeting: [
        "Let me see your tongue. Hm. You are not sleeping. Do not tell me you are.",
        "Mind the drying racks. That is a year of fever tea you are about to walk into.",
        "You have a look. Sit. Either you tell me or your knees will.",
      ],
      idle: [
        "Yarrow is coming up early. The ground knows something.",
        "Three babies in four years. I would call that defiance, if babies could be accused of it.",
      ],
      farewell: [
        "Drink water. Real water. Not whatever is in that flask.",
        "Go on. And eat something green before you die of heroism.",
      ],
      hint: [
        "A flask buys you one breath in a fight. A rest gives them all back. Know which you need.",
        "Burning does not stop when you leave the fire. Get it treated, or carry an Ember Ward.",
      ],
      wounded: [
        "Mara will stitch it and I will make sure you do not rot after. Team effort. Lie back.",
        "Look at the state of you. Lie down before I have to deliver you to a grave.",
      ],
      reaction: [
        "There. Done properly. Mara would have used too much thread.",
        "Now go and sleep, for once in your life.",
      ],
    },
  },
  {
    id: "corwin-ashby", name: "Corwin Ashby", title: "Well keeper",
    home: "hearthglen", role: "resident", gender: "male",
    look: look("steel", "frost", "s2", "grey"),
    portrait: "Gaunt man in his fifties holding a jar of water up to the light, deep-set eyes, careful hands, rope burn on one wrist.",
    ties: ["mara"],
    secret: "He did not pass that cistern by mistake. He was tired, skipped the test, and signed the sheet. He has never told Mara why he taught her to boil twice.",
    history: [
      "Water board inspector. Clipboard, test strips, a van. I closed swimming pools. People hated me. I slept beautifully.",
      "I lost my wife and both boys to a cistern I had passed as clean. I test this well at dawn, noon and dusk. I have not missed one.",
    ],
    world: "The dead are loud about killing you. Water is quiet about it. I know which one I respect.",
    detail: "Corwin guards Hearthglen's well and tests its water three times a day.",
    voices: {
      greeting: [
        "Do not fill that here until I have looked at it. Hold it to the light.",
        "You crossed the ford? Did the water smell of metal? Think before you answer.",
        "Morning. Well is sweet today. I checked. I always check.",
      ],
      idle: [
        "Dawn, noon, dusk. Eleven hundred and four days. Clean every time.",
        "Mara says boil twice. I taught her that. She does not say so.",
      ],
      farewell: [
        "Do not drink from anything still. Not out there.",
        "Fill up before you go. I will not have you trusting a puddle.",
      ],
      hint: [
        "The Mire spreads sickness through water and the Wastes through soot. A medic can purge both.",
        "Refill your flasks with a rest before a long walk, not after it.",
      ],
      wounded: [
        "That wants washing. Clean water. I will draw it myself.",
        "Go to Mara. Tell her the bucket by her door is from this morning.",
      ],
      reaction: [
        "That is one thing in this world done correctly.",
        "Thank you. I mean that. I do not get to say it often.",
      ],
    },
  },
  {
    id: "nell-farrow", name: "Nell Farrow", title: "Village seamstress",
    home: "hearthglen", role: "resident", gender: "female",
    look: look("plum", "rose", "s1", "auburn"),
    portrait: "Slight woman in her forties, pins held between her lips, tape measure round her neck, gentle downturned eyes, thimble glinting.",
    ties: ["sunniva-brae", "mara"],
    secret: "She has already stitched a collar with the player's name. It is in a drawer with the others she made too early.",
    history: [
      "Bridal alterations. I spent ten years taking in waists and telling women they looked perfect. They mostly did.",
      "I make coats from tents now. I stitch a name inside every collar. It began so we could tell who we were burying. People ask for it anyway.",
    ],
    world: "Everything that keeps us alive is a seam somewhere: a gate, a bandage, a promise. I just work in the kind you can see.",
    detail: "Nell sews Hearthglen's clothing from salvage and stitches a name into every collar.",
    voices: {
      greeting: [
        "Hold still. Your shoulder seam is going. I can hear it from here.",
        "Oh, you have torn that again. Give it here. No, the whole thing.",
        "Come in. Mind the pins. They are the last pins in the valley.",
      ],
      idle: [
        "Forty-four collars. I can recite them. It is a strange sort of rosary.",
        "The wool came in. It smells of goat and it will outlast all of us.",
      ],
      farewell: [
        "Bring it back if it tears. Bring yourself back regardless.",
        "Your name is in the collar. Just so you know. Just in case.",
      ],
      hint: [
        "Armor is only stitched leather and luck until the heavy ones reach you. Then it is everything.",
        "A dash gets you out of a swing you cannot block. Do not spend it just to arrive sooner.",
      ],
      wounded: [
        "You have bled through that. Mara for you, then I will see what can be saved of the coat.",
        "You are swaying like a hem in wind, dear. Down you go. Gently.",
      ],
      reaction: [
        "There. Good as new, which these days is saying something.",
        "Lovely. That will hold.",
      ],
    },
  },
  {
    id: "jory-pike", name: "Jory Pike", title: "Silverrun fisherman",
    home: "hearthglen", alsoFits: ["road"], role: "hunter", gender: "male",
    look: look("teal", "bone", "s2", "blond"),
    portrait: "Lanky man in his thirties, patched waders, rod over one shoulder, sunburnt nose, easy smile that does not reach worried eyes.",
    ties: ["ysra", "maro"],
    secret: "The last three letters from his sister were written by Maro, who could not bring himself to say there had been no word from the mountain.",
    history: [
      "I worked the ski lifts with my sister. She mapped the runs. I sat in a booth and waved at people. We were both happy.",
      "When the freeze came she went up the mountain and I came down to the river. Ysra sends word with Maro twice a year. It is always four words.",
    ],
    world: "A river forgets everything by the next bend. I find that restful. My sister says it is why I am no good in a crisis.",
    detail: "Jory fishes Silverrun Ford for Hearthglen and carries news between the river and the village.",
    voices: {
      greeting: [
        "Morning. Trout are sulking. Do not take it personally. They are like that with everyone.",
        "You have been north? Did you pass Rimewatch? Tall woman, never smiles?",
        "Sit. Fish do not bite for people who stand.",
      ],
      idle: [
        "Water is low for the season. Something upstream is drinking a great deal, or damming it.",
        "Four words in the last letter. Still alive. Stop asking. That is her being affectionate.",
      ],
      farewell: [
        "If you see Ysra Pike, tell her the river is fine. She will know what I mean.",
        "Mind the ford stones. The third one rolls.",
      ],
      hint: [
        "Up in Frostfall the ice-manes run as a pack. Ysra says thin them to one and it slows.",
        "A wayfire wakes when its region is cleared. After that, the walk home is one step.",
      ],
      wounded: [
        "That is a lot of blood for someone still upright. Village is that way. Go.",
        "Sit on the bank. I will fetch Mara. Do not fall in. I am not fishing you out.",
      ],
      reaction: [
        "Nicely done. That is a keeper.",
        "Wait till I write to Ysra. I will use five words.",
      ],
    },
  },
  {
    id: "otti-brandt", name: "Ottoline Brandt", title: "Radio listener",
    home: "hearthglen", role: "tinker", gender: "female",
    look: look("dusk", "sky", "s1", "white"),
    portrait: "Bird-thin woman in her seventies, headphones round her neck, cardigan with burn holes, fierce pale eyes, pencil poised over a logbook.",
    ties: ["patch", "veiled", "edda"],
    secret: "The pattern on her radio strengthens whenever the Veiled One stands near the player's house. She has traced it to that floor and told no one.",
    history: [
      "Air traffic control. Thirty-one years of telling very large things where not to be. I do not rattle easily.",
      "I keep a crank radio and a logbook. Mostly static. But the static repeats every nineteen minutes, and nature does not keep time that well.",
    ],
    world: "Somebody is transmitting. Not words. A pattern. I have filled six logbooks with it and I would dearly like to be wrong.",
    detail: "Ottoline listens to a hand-crank radio every night and logs a pattern nobody else can hear.",
    voices: {
      greeting: [
        "Shh. No. It has gone again. Sit down. You might as well. You have ruined the count.",
        "You have been near the big ones, the named ones. Did your teeth ache first?",
        "Come in. Do not touch the dial. I will know.",
      ],
      idle: [
        "Nineteen minutes, four seconds. It was nineteen flat last year. It is slowing, or we are.",
        "Patch Merrin sold me these valves. Robbed me. They are perfect, the swine.",
      ],
      farewell: [
        "If you find a working set out there, I do not care what else you carry. Bring that.",
        "Go on. And listen, now and then. Properly.",
      ],
      hint: [
        "The hordes do not wander, whatever people say. They turn together. Watch for the turn.",
        "Each of the named dead carries a relic. Edda in Greyhaven can tell you why that matters.",
      ],
      wounded: [
        "You are bleeding on my logbook. Mara. Go. The pattern will keep and you will not.",
        "Head down. Breathe. I have talked pilots through worse, though none had been bitten.",
      ],
      reaction: [
        "Well. That is the first good news on any frequency this year.",
        "Noted in the log. In ink.",
      ],
    },
  },
  {
    id: "dane-whitlock", name: "Dane Whitlock", title: "Sexton of the burn-yard",
    home: "hearthglen", role: "resident", gender: "male",
    look: look("char", "sage", "s2", "grey"),
    portrait: "Tall stooped man in his sixties, spade in hand, sapling tucked under one arm, lined gentle face, earth under every fingernail.",
    ties: ["tomas", "mara"],
    secret: "The third oak stands over an empty grave. Mara's Tomas was never recovered from the gate. Dane burned a coat and let her believe.",
    history: [
      "Landscape gardener. Lawns, mostly. Rich people's lawns. I made a great deal of grass very flat for a living.",
      "The dead have to burn or they get up. Somebody had to keep the yard. I plant a sapling for each one. We have a small wood now.",
    ],
    world: "People think my work is about the dead. It is about making sure the living only have to do this once for each person.",
    detail: "Dane tends Hearthglen's burn-yard and the grove planted over it.",
    voices: {
      greeting: [
        "Afternoon. No, I am not measuring you. That is a joke. I only ever make the one.",
        "Welcome. Mind the saplings on the left. Those are from the spring.",
        "You look well. I say that to everyone, and I notice when it stops being true.",
      ],
      idle: [
        "Fifty-three trees. The oaks are the gate. The birches were the fever.",
        "Tomas Reed waters the third oak himself. I let him think I have not seen.",
      ],
      farewell: [
        "Come back on your feet. I have enough digging.",
        "Walk safe. I would rather know you than plant you.",
      ],
      hint: [
        "What falls gets up again in time, even a few of the great named ones. A cleared field does not stay cleared.",
        "Finish the fight before you loot it. More people die bending down than standing up.",
      ],
      wounded: [
        "You are closer to my yard than I like. Mara is that way.",
        "Breathe. Slowly. I am not ready to pick a tree for you.",
      ],
      reaction: [
        "That was done right. Thank you.",
        "One less I will be planting for. I am grateful.",
      ],
    },
  },
  {
    id: "rhea-castellan", name: "Rhea Castellan", title: "Hearthglen trapper",
    home: "hearthglen", alsoFits: ["road"], role: "hunter", gender: "female",
    look: look("moss", "copper", "s4", "dark"),
    portrait: "Lean woman in her forties, auburn braid under a shapeless ranger hat, snare wire coiled at her hip, unreadable face, eyes already on the tree line.",
    ties: ["elowen"],
    secret: "She found a torn Civic Works collar near Moonfang two winters ago and kept it. She knows Gloomfang was somebody's trained guard animal, and pities it.",
    history: [
      "Park ranger. I told families not to feed the bears, and the families fed the bears.",
      "I run forty snares from here to the pines. Elowen watches the road. I watch everything that does not use one.",
    ],
    world: "There is a print by Moonfang Clearing as wide as a wash basin. The fur is rubbed thin at the neck, like a collar sat there once.",
    detail: "Rhea traps and tracks around Hearthglen and reads what the big predators are doing.",
    voices: {
      greeting: [
        "You walk on your heels. Everything within a mile knows.",
        "Hm. You. Stand downwind of the hides.",
        "Back. Good. I found your trail twice and lost you once. You are improving.",
      ],
      idle: [
        "Snares came up empty east. Empty means something bigger ate the route.",
        "Elowen counts the dead. I count what hunts them. The second number worries me more.",
      ],
      farewell: [
        "Heel to toe. Try it.",
        "If the woods go quiet, so do you.",
      ],
      hint: [
        "Gloomfang howls for its pups before it charges. Kill the pups or move. Do not stand admiring it.",
        "A snare trap grabs the nearest thing and slows it hard. Lay one where you will be backing up.",
      ],
      wounded: [
        "You are leaving sign a child could follow. Mara. Go.",
        "Bind it. Tight. I will walk behind you and cover the trail.",
      ],
      reaction: [
        "Clean.",
        "Good kill. I would have done it quieter. Still good.",
      ],
    },
  },
  {
    id: "ambrose-kettle", name: "Ambrose Kettle", title: "Village distiller",
    home: "hearthglen", role: "trader", gender: "male",
    look: look("wine", "ember", "s1", "red"),
    portrait: "Jolly man in his fifties, singed eyebrows, corked bottle raised in salute, safety goggles pushed up into thinning ginger hair.",
    ties: ["mara", "pell-okoro"],
    secret: "The potato peelings ran out months ago. He is fermenting something the bees will not go near, and he does not know what it grew on.",
    history: [
      "Chemistry teacher. Bored children, Bunsen burners. I was reprimanded twice for making the lessons too interesting.",
      "I make two things in this shed: gin from peelings, and disinfectant from the same still. The label is on the bottom. Check the bottom.",
    ],
    world: "The world ended and people still want a drink on a Friday. I find that the single most hopeful fact I know.",
    detail: "Ambrose distills Hearthglen's spirits and its disinfectant, usually in separate bottles.",
    voices: {
      greeting: [
        "Aha! A customer, or a witness. Either way, have a taste.",
        "Do not sniff that one. That one is for wounds. This one is for the memory of wounds.",
        "Welcome to the only laboratory left in the valley. Mind the hose.",
      ],
      idle: [
        "Mara takes the strong batch for her needles. Says it is the only honest thing I make.",
        "I teach the children fractions with it. Measures. Purely measures.",
      ],
      farewell: [
        "To your health, which I mean literally and urgently.",
        "Go carefully. I have only just learned your name.",
      ],
      hint: [
        "A flask is a fast fix, not a cure. Once the charges are gone, only a rest brings them back.",
        "A locked chest wants the right key. Iron for the plain ones. Never waste gold on iron.",
      ],
      wounded: [
        "Good grief. Sit. This will sting, and then I will give you the other bottle.",
        "Mara! I have disinfected the outside of them. The rest is yours.",
      ],
      reaction: [
        "Marvellous! I shall name a batch after you.",
        "A toast, then. To things going right for once.",
      ],
    },
  },
  {
    id: "lisbet-arnow", name: "Lisbet Arnow", title: "Village runner",
    home: "hearthglen", alsoFits: ["road"], role: "courier", gender: "female",
    look: look("slate", "red", "s3", "brown"),
    portrait: "Wiry teenage girl, long hair in two windblown braids, message tube slung across her back, chin lifted, trying very hard to look unimpressed.",
    ties: ["sable", "kael"],
    secret: "Sable has refused her twice, in writing. Lisbet carried both notes herself, read them on the road, and delivered neither.",
    history: [
      "I was eleven. I ran cross-country for my school. I came second at the county meet. I still think about the girl who beat me.",
      "I carry messages to the Mosslight camp and back. Forty minutes. Sable does not look up when I arrive. One day she will.",
    ],
    world: "Ashwatch was twelve and now it is three. That means there are nine places. I can do the sum.",
    detail: "Lisbet runs messages between Hearthglen and the Mosslight camp and wants to join Ashwatch.",
    voices: {
      greeting: [
        "Report! I mean, hello. I am practising saying report.",
        "You know Sable. Do you actually know her? What does she say about runners?",
        "I can keep up with you. I am only saying. If you ever needed someone to.",
      ],
      idle: [
        "Thirty-eight minutes to the camp today. A record. Nobody was timing but me.",
        "Kael wants a story. I want a posting. We are both stuck behind the same gate.",
      ],
      farewell: [
        "I will have a message for you at the camp. Probably. Something will happen.",
        "Run the ridge, not the hollow. It is longer, and you live.",
      ],
      hint: [
        "Sable says to take the Meadow wayfire to the Wastes trail. Walking it wastes daylight.",
        "The Ash Tyrant hits twice as hard as its soldiers. Nobody trades blows with it and reports back.",
      ],
      wounded: [
        "You are hurt. I can run for Mara. I am fast. I am going. Stay.",
        "Do not move. That is an order. I do not have the rank, but it is still an order.",
      ],
      reaction: [
        "That is exactly what Ashwatch would have done.",
        "I am telling Sable about that. In my report.",
      ],
    },
  },
  {
    id: "cass-ridley", name: "Cass Ridley", title: "Stranded trucker",
    home: "hearthglen", alsoFits: ["greyhaven", "road"], role: "tinker", gender: "male",
    look: look("char", "ember", "s4", "grey"),
    portrait: "Heavyset man in his fifties, trucker cap bleached grey, grease to the elbows, toothpick, tired friendly eyes.",
    ties: ["orin"],
    secret: "There is a second, working truck hidden in a barn two miles out. He keeps it secret because whoever learns of it will ask him to choose who rides.",
    history: [
      "Twenty-two years hauling refrigerated freight. I was carrying eleven tons of ice cream the day it happened. Think about that.",
      "The rig died on the valley road. I walked into Hearthglen with a toolbox and stayed. I keep the pumps and engines running out of spite.",
    ],
    world: "A road used to mean you could leave. Now it is just the long thin place where things find you. I still miss them.",
    detail: "Cass keeps Hearthglen's engines and pumps alive and knows every road by its old number.",
    voices: {
      greeting: [
        "Hey. Pop the hood. Figure of speech. Unless you have a hood.",
        "You have a rattle. I can hear it. Left side. Could be your knee.",
        "Pull up a crate. Coffee is chicory and regret, but it is hot.",
      ],
      idle: [
        "Parts. It is always parts. I could rebuild the world if somebody found me a gasket.",
        "Eleven tons of ice cream, melted into the Route Nine verge. Grass grew a foot taller there.",
      ],
      farewell: [
        "Keep the rubber side down.",
        "If you see a parts store, I do not care if it is on fire.",
      ],
      hint: [
        "Elites carry better guns the farther out you go. The early ones drop a rust-eaten submachine gun.",
        "A minigun wants a moment to spin before it speaks. Start it early.",
      ],
      wounded: [
        "You are running on fumes. Mara is the shop for that.",
        "Park it before something important falls off.",
      ],
      reaction: [
        "Now that is purring.",
        "Good haul. On time, and nothing melted.",
      ],
    },
  },
  {
    id: "maud-ferris", name: "Maud Ferris", title: "Oldest soul in the valley",
    home: "hearthglen", role: "storyteller", gender: "female",
    look: look("plum", "cream", "s1", "white"),
    portrait: "Tiny fierce woman of ninety, quilt spilling over her lap, needle in gnarled fingers, hawk nose, eyes bright as a bird's.",
    ties: ["tomas", "veiled", "lark"],
    secret: "As a girl she and her sister dug under that hill and found the spiral stone. Her sister was never right afterwards. Maud has spent eighty years not thinking about it.",
    history: [
      "I was born in this valley when it was three farms and a chapel. I have buried a husband, a sister and two dogs here. Do not tell me about change.",
      "I am sewing a quilt with a square for every house that stood. The ones still lived in get a yellow border. I have not needed much yellow.",
    ],
    world: "Young people think the world ended. The world has ended four times in my life. This one is only the loudest.",
    detail: "Maud remembers the valley before Hearthglen and is stitching its whole history into one quilt.",
    voices: {
      greeting: [
        "Speak up, and stand where the light is. I like to see who is wasting my time.",
        "Oh, it is you. The one who goes out. Sit. You make the place untidy standing.",
        "You have your grandmother's stubbornness, whoever she was.",
      ],
      idle: [
        "Where the forge stands was a duck pond. I fell in it the year of the big frost.",
        "Tomas Reed was a handsome fool at twenty. Now he is a fool with onions. I am fond of him.",
      ],
      farewell: [
        "Go on, then. Try not to die of something stupid.",
        "Wrap up. I did not live ninety years to watch children freeze.",
      ],
      hint: [
        "Your house stands on something older than the village. We played on that hill. We were told not to dig.",
        "The crypt under Mosslight was there in my mother's day. South of where that singer keeps a fire.",
      ],
      wounded: [
        "Down, you silly creature. Mara! This one is leaking.",
        "In my day we bled quietly and went to bed. Go to Mara.",
      ],
      reaction: [
        "Hm. Not bad. I have seen better, but they are dead.",
        "Have a boiled sweet. I have been saving it since the spring.",
      ],
    },
  },
];
