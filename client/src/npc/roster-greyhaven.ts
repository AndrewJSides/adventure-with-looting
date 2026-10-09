// Greyhaven: the walled city the survivors of Old Greyhaven built after the
// west-gate evacuation. A watch, a council, a market, a clinic, one tavern,
// and a standing argument about whether Captain Rusk saved them or sold them.

import { look, type RosterNpc } from "./types";

export const GREYHAVEN_ROSTER: RosterNpc[] = [
  {
    id: "inga-varga", name: "Sergeant Inga Varga", title: "Greyhaven watch sergeant",
    home: "greyhaven", role: "guard", gender: "female",
    look: look("navy", "brass", "s2", "grey"),
    portrait: "Handsome stern woman in her forties, iron-grey hair in a tight regulation bun, scar through one eyebrow, parade-rest stance, unblinking.",
    ties: ["rowan"],
    secret: "She has drafted, and not sent, a petition to strike Rusk's name from the watch oath. Forty signatures. Rowan's own deputy is among them.",
    history: [
      "Riot police. Shield line, third from the left. I know exactly what a crowd does when a gate will not open.",
      "My squad held the east approach on evacuation night. Rusk sealed it with nine of mine on the wrong side. Rowan calls that a hard choice.",
    ],
    world: "The Marshal wants to weigh whether Rusk was a hero. I have the names of nine people who could settle it for him.",
    detail: "Inga drills the Greyhaven watch and has no patience for the legend of Captain Rusk.",
    voices: {
      greeting: [
        "Stand straight when you talk to the wall. It has earned it.",
        "You. Outlander. You fight like nobody taught you. That is neither praise nor insult.",
        "If you are here to enlist, the answer is yes, and you will regret it.",
      ],
      idle: [
        "Twelve recruits. Four can hold a line. I will make it six by winter or bury the difference.",
        "Nine names. I say them at dawn drill. The recruits think it is a count.",
      ],
      farewell: [
        "Dismissed. Come back with all your parts.",
        "Eyes up, mouth shut, feet moving.",
      ],
      hint: [
        "Kill the spitter behind the line first. Slow dead are only dangerous for what shoots over them.",
        "Shieldbearers and brutes hit hardest. Never let one pin you against a wall.",
      ],
      wounded: [
        "You are combat ineffective. Clinic. That is an order from someone who outranks your pride.",
        "Stop standing at attention while you bleed. Sit.",
      ],
      reaction: [
        "Adequate. From me that is a medal.",
        "Good. I may yet stop calling you outlander.",
      ],
    },
  },
  {
    id: "dessa-quill", name: "Dessa Quill", title: "Gate clerk",
    home: "greyhaven", role: "official", gender: "female",
    look: look("slate", "bone", "s3", "silver"),
    portrait: "Neat woman in her fifties, ink-stained left hand, fingerless gloves, half-moon spectacles, a ledger chained to her desk.",
    ties: ["rowan"],
    secret: "The uncrossed name is her husband's. She saw him at the wall a year ago, among the dead, and wrote down no one.",
    history: [
      "Court stenographer. I typed two hundred words a minute of other people lying. I have never lost the knack for hearing it.",
      "I write every name through the west gate, in and out. Left hand for out, right hand for in. The Marshal reads the ledger at dusk.",
    ],
    world: "People think the wall keeps the dead out. The ledger does. A wall cannot tell you who is missing.",
    detail: "Dessa records everyone who passes Greyhaven's west gate and knows exactly who has not returned.",
    voices: {
      greeting: [
        "Name. Spell it. People always say it is spelled how it sounds, and it never is.",
        "Back before dusk. I can use the right hand for you. Good.",
        "One moment. The ink is cold. There. Go on, then. Who are you today?",
      ],
      idle: [
        "Thirty-one out this morning. Twenty-eight in so far. I do not close the book until dark.",
        "There is a name in the out column from two years ago I will not cross through. Do not ask.",
      ],
      farewell: [
        "Out, then. Left hand. Come back and make me use the right.",
        "Mind the time. I close the book at last light and I hate writing in the margin.",
      ],
      hint: [
        "Come home by the west gate. The watch knows to open that one for the living.",
        "The farther out a name goes, the richer it comes home. The ledger shows it plainly.",
      ],
      wounded: [
        "I am writing you in, and writing the word clinic beside it. Go.",
        "You are dripping on the ledger. It has enough red ink.",
      ],
      reaction: [
        "Noted. In the good hand.",
        "There. That is an entry I will enjoy reading back.",
      ],
    },
  },
  {
    id: "tobin-greaves", name: "Tobin Greaves", title: "Wall lamplighter",
    home: "greyhaven", role: "resident", gender: "male",
    look: look("char", "brass", "s1", "brown"),
    portrait: "Thin anxious man in his thirties with a stubbled jaw, long lamplighter's pole, soot on his cheek, wide eyes that never quite settle.",
    ties: ["vale", "petra-marlowe"],
    secret: "Lamp nineteen overlooks the postern Petra Marlowe uses at night. He has seen what she feeds. He puts that lamp out himself so nobody else will.",
    history: [
      "Stagehand. I ran the lights at the Orpheum. Follow spot, mostly. I always knew exactly where to look.",
      "Father Vale gave me the wall lamps. Sixty-two of them, dusk and dawn. I am frightened of the dark. I never told him. It seemed rude.",
    ],
    world: "A lit wall says somebody is home. An unlit one says help yourself. I do not know who taught the dead to read, but they can.",
    detail: "Tobin lights and tends the sixty-two lamps along Greyhaven's wall.",
    voices: {
      greeting: [
        "Oh! You startled—no, I am fine. I am always like this.",
        "Evening, or nearly. I have forty lamps to go and I would rather not think about it.",
        "Stand in the light, would you? I like to see a person all at once.",
      ],
      idle: [
        "Lamp nineteen keeps going out. No wind. I have checked the wick six times. I do not like nineteen.",
        "Father Vale says a small light changes the road. Sixty-two is not small. It is a job.",
      ],
      farewell: [
        "Be back before I have to light them for you.",
        "Go on. I will leave the east lamp turned up.",
      ],
      hint: [
        "A flashlight slows the dead it shines on and shows the ones you missed. Save it for night.",
        "A Lantern Rig throws wider and farther than a plain flashlight. Rare. Worth every key.",
      ],
      wounded: [
        "That is—there is rather a lot of—clinic. East stalls. I will hold the lamp for you.",
        "Please sit down. I do not do well with blood or dark, and it is nearly both.",
      ],
      reaction: [
        "Oh, well done. Properly well done.",
        "That is a bright bit of news. I needed one.",
      ],
    },
  },
  {
    id: "adwoa-osei", name: "Mother Osei", title: "Keeper of the orphan loft",
    home: "greyhaven", role: "resident", gender: "female",
    look: look("wine", "brass", "s8", "grey"),
    portrait: "Tall dignified woman in her sixties, bright headwrap, reading glasses on a chain, a small child's hand clutching her skirt.",
    ties: ["greta-lindqvist", "pim", "ilyan"],
    secret: "There are fifteen beds in the loft. The fifteenth is for a girl she left at the east gate holding another child's hand, and has never spoken of.",
    history: [
      "Head of a primary school. Three hundred and ten children. I knew every one of them by their walk.",
      "I came through the west gate with thirteen children who were not mine. A fourteenth was carried up my stairs later. They are mine now. We live above the granary.",
    ],
    world: "Everyone here lost someone. My fourteen lost everyone. So do not tell me what is impossible. I watch impossible eat breakfast daily.",
    detail: "Mother Osei raises fourteen orphans in the loft above Greyhaven's granary.",
    voices: {
      greeting: [
        "Wipe your boots and lower your voice. Half of them have only just gone down.",
        "You have kind eyes and a great many weapons. Leave the weapons at the door.",
        "Come in. If you have brought nothing for the children, you may at least bring news.",
      ],
      idle: [
        "Fourteen pairs of shoes, and nine of them wrong. Greta does what she can.",
        "Pim is on the roof again. I pretend not to know, and he pretends to be careful.",
      ],
      farewell: [
        "Go safely. I tell them stories about you, so kindly stay alive for the sequel.",
        "Mind yourself. I have run out of room for more grief, not for more children.",
      ],
      hint: [
        "Sell what you do not use. Maro pays most, Patch pays always, and gold weighs less than regret.",
        "Do not walk home hurt at dusk. Night brings more of them, and they come looking.",
      ],
      wounded: [
        "On the bench. Now. You, fetch Doctor Voss. You, water. You, stop staring.",
        "Not in front of the little ones. Clinic. Quickly and quietly.",
      ],
      reaction: [
        "Bless you. No, I mean it. Stand still and be blessed.",
        "The children will hear of this at supper. Twice, if they behave.",
      ],
    },
  },
  {
    id: "pim", name: "Pim", title: "Loft orphan and seller of maps",
    home: "greyhaven", role: "child", gender: "male",
    look: look("ochre", "red", "s3", "brown"),
    portrait: "Scrappy boy of eleven, gap-toothed grin, oversized coat, rolled paper maps stuffed in every pocket, soot-smudged nose.",
    ties: ["juno", "adwoa-osei", "nia"],
    secret: "The blue door was in Old Greyhaven's east ward. He has drawn it from memory forty times, and the house number matches an entry in Nia Mercer's ledger of the lost.",
    history: [
      "Do not know. I was little. There was a blue door and a dog called Biscuit. That is all I have got.",
      "Mother Osei found me in a coal chute. Juno taught me roofs. Now I draw maps and sell them. They are mostly right.",
    ],
    world: "Grown-ups look at the street. Everything good is up. Pigeons, washing lines, and you can see who is lying because they look left.",
    detail: "Pim sells hand-drawn maps of Greyhaven and knows its rooftops better than the watch.",
    voices: {
      greeting: [
        "Map? One coin. Two if you want the true one.",
        "You are the one who goes outside! What is the biggest thing you ever killed? Bigger than a cart?",
        "I was not on the roof. Who said I was on the roof?",
      ],
      idle: [
        "I can get from the granary to the gate without touching the ground. Nearly. There is one jump.",
        "Somebody goes out the north postern at night. I am not saying who. Three coins.",
      ],
      farewell: [
        "If you find chalk out there, bring it. The good kind. Not the crumbly kind.",
        "Bye! Do not die. You still owe me a coin.",
      ],
      hint: [
        "Juno says the gold marks on buildings are caches. You tap them. They stay bright till empty.",
        "The lit roads in the old city are the wide ones. That is where the big rusty one walks.",
      ],
      wounded: [
        "Whoa. You are all red. Does it hurt? It looks like it hurts.",
        "Clinic is that way. I can show you the fast way, but there is a jump.",
      ],
      reaction: [
        "Really? You did that? I am drawing it.",
        "That is worth a free map. A true one.",
      ],
    },
  },
  {
    id: "halvard-stroud", name: "Halvard Stroud", title: "Smokehouse butcher",
    home: "greyhaven", role: "cook", gender: "male",
    look: look("rust", "bone", "s1", "grey"),
    portrait: "Enormous bald man in his fifties, leather apron, forearms like hams, booming laugh lines, cleaver hung at his belt like a sidearm.",
    ties: ["petra-marlowe"],
    secret: "He knows where the widow's meat goes. He followed her once. He keeps selling to her because he would do the same for his own wife.",
    history: [
      "Abattoir foreman. Do not make that face. Somebody did it so you could eat, and I did it clean.",
      "I smoke whatever the hunters drag in. Nothing spoils on my watch. The council wanted to ration by need. I ration by who brought it.",
    ],
    world: "Meat is honest. It tells you exactly how long it has been dead. I wish people came with the same courtesy.",
    detail: "Halvard runs Greyhaven's smokehouse and judges people by what they bring to the hook.",
    voices: {
      greeting: [
        "Ha! The hunter. What have you got for the hook?",
        "Mind the floor. It is clean. It is just never dry.",
        "You look like you need feeding and I look like a man with a ham. Fate.",
      ],
      idle: [
        "Smoke is drawing well. Oak chips. The good oak, off the old tram sleepers.",
        "There is a widow buys more raw cuts than one mouth can chew. Never haggles. That bothers me.",
      ],
      farewell: [
        "Bring me something with legs!",
        "Off you go. The hooks are empty and so is my patience.",
      ],
      hint: [
        "Raw meat is no use raw. Two cuts over a cook fire and you have a meal that mends you properly.",
        "A claimed outpost can build a cook fire. Do it early. You will eat better than we do.",
      ],
      wounded: [
        "You are bleeding on a clean floor, and I have seen enough of that for one life. Clinic!",
        "Sit on the block. No, the other block. That one is for work.",
      ],
      reaction: [
        "Now that is a proper bit of work!",
        "Hang it up! I will have it smoked by Thursday.",
      ],
    },
  },
  {
    id: "zhenya-kolt", name: "Zhenya Kolt", title: "Ammunition loader",
    home: "greyhaven", role: "smith", gender: "female",
    look: look("steel", "copper", "s2", "dark"),
    portrait: "Compact woman in her forties, magnifying loupe on a headband, powder-grey fingertips, braid pinned tight, the look of someone counting.",
    ties: ["rowan"],
    secret: "She is hand-loading a private reserve of two thousand rounds under her bench, for the day she expects the council to open the gates to the wrong people.",
    history: [
      "Competitive shooter. Fifty metres, small bore. I could put ten rounds through one hole. Nobody applauds that now. They ask for more.",
      "I reload brass for the watch. Every case is fired six times before I retire it. I can tell which sentry fired a round by the dent in the rim.",
    ],
    world: "A bullet is a decision you cannot take back. People here spend them like greetings. I have stopped being polite about it.",
    detail: "Zhenya hand-loads ammunition for Greyhaven and can read a shooter's habits from spent brass.",
    voices: {
      greeting: [
        "Did you pick up your brass? No. Of course not. Nobody picks up their brass.",
        "You. Show me your magazine. Hm. You have been spraying.",
        "Do not lean on that bench. There is a year of primers under your elbow.",
      ],
      idle: [
        "Six reloads per case, then it splits. Like people, but more predictable.",
        "The recruits flinch before the shot. I can hear a flinch. It sounds like wasted powder.",
      ],
      farewell: [
        "One round, one target. Go and practise being stingy.",
        "Bring back your brass or do not bring back your face.",
      ],
      hint: [
        "A pistol fires as fast as you tap it. Tap slowly and it stays true. Mash it and it wanders.",
        "A minigun must spin before it fires, and it eats a belt in a breath. Start early, stop early.",
      ],
      wounded: [
        "You are leaking. Clinic. I load ammunition. I do not load people.",
        "Hands off the powder. Blood and primer do not mix. I have checked. Now sit.",
      ],
      reaction: [
        "Not one wasted. I approve.",
        "Clean. I will load you something special. Do not tell the watch.",
      ],
    },
  },
  {
    id: "ravi-anand", name: "Ravi Anand", title: "Cistern engineer",
    home: "greyhaven", role: "tinker", gender: "male",
    look: look("teal", "copper", "s6", "black"),
    portrait: "Bespectacled man in his late thirties with a neat moustache, rolled blueprints under one arm, pipe wrench in a tool loop, apologetic eyes behind scratched lenses.",
    ties: ["tamsin", "edda", "lio"],
    secret: "He kept the requisition he signed: four tonnes of copper for the Signal Engine on Sublevel 3, countersigned by Captain Rusk. He has never shown it to Edda.",
    history: [
      "Junior engineer, Civic Works, water division. I designed pressure valves. I was proud of a valve once. I had a photograph of it.",
      "There was a sealed floor in our building. Furnace upgrade, they said. The whole district dimmed when it ran. I signed for the copper.",
    ],
    world: "I keep the cistern because pipes are innocent. They do one thing. Nobody ever repurposed a pipe to end a city.",
    detail: "Ravi keeps Greyhaven's cistern and pumps running and once worked inside Civic Works.",
    voices: {
      greeting: [
        "Careful, the grating is loose. I keep meaning to fix it. I keep fixing other things.",
        "Hello. You are not here about the pressure, are you? No. Nobody ever is.",
        "Ah. You carry something that hums. I would know that hum anywhere. Stand a little farther off.",
      ],
      idle: [
        "Forty thousand litres. Nine days of water if it does not rain. It will rain.",
        "People stamp salvage CITY WORKS like it is a mark of quality. I used to wear the badge.",
      ],
      farewell: [
        "Mind the grating on the way out. I mean it this time.",
        "Go well. If you find copper pipe, any gauge, I would be grateful beyond reason.",
      ],
      hint: [
        "Anything stamped Civic Works is worth carrying back. Tamsin wants it, and she will not be the last.",
        "Ember crystal is not safe loose. Three bound into one core is stable. Loose, it only burns.",
      ],
      wounded: [
        "You are bleeding into my drain. That is fine, it goes nowhere. But you should see the doctor.",
        "Sit on the pump housing. It is warm. I will send someone for Voss.",
      ],
      reaction: [
        "That is good work. Clean. I admire clean work. I see so little.",
        "Thank you. Genuinely. It is a relief when something goes as designed.",
      ],
    },
  },
  {
    id: "clem-adair", name: "Clem Adair", title: "Keeper of the Fourth Bell",
    home: "greyhaven", role: "trader", gender: "male",
    look: look("clay", "cream", "s2", "silver"),
    portrait: "Barrel-chested man in his sixties, bar towel over one shoulder, magnificent grey sideburns, welcoming squint, polishing a dented tankard.",
    ties: ["alden", "odalys-finch"],
    secret: "He has the real fourth bell, cracked, in his cellar. He hauled it out of the old city himself and cannot decide whether ringing it would be a blessing or a lie.",
    history: [
      "I had a pub on Tanner Street. The Anchor. Carpet you stuck to and regulars you could not shift with a crowbar.",
      "Three bells meant evacuate. The fourth was to mean all clear, and nobody ever rang it. So I named the place for it. We drink to it nightly.",
    ],
    world: "A bar is the one room where a guard, a thief and a councilor all want the same thing. That holds a town together better than a wall.",
    detail: "Clem runs the Fourth Bell, Greyhaven's only tavern, and hears everything said in it.",
    voices: {
      greeting: [
        "Sit anywhere that is not broken. So, that stool, or that one.",
        "The wanderer! First one is on the house. The house is poor, so it is small.",
        "Evening. Leave the road at the door. It has not paid its tab.",
      ],
      idle: [
        "The councilors drink at opposite ends. I keep the good lamp in the middle so neither can sulk.",
        "The singer packed the room last night. Half came for the song, half to cry in company.",
      ],
      farewell: [
        "Mind how you go. The fourth bell has not rung yet.",
        "Come back and tell it at the bar. A story is worth a drink if it is true.",
      ],
      hint: [
        "Maro pays the best price for gear, and he carries one rare thing that changes. Check each visit.",
        "Rest wherever you safely can. A proper rest is the only thing that refills a flask.",
      ],
      wounded: [
        "Not at my bar, you do not. Clinic, east stalls. I will keep your stool.",
        "You are white as the good tablecloth. Sit. Somebody fetch Voss.",
      ],
      reaction: [
        "Ha! Ring the bell! Not that one. The little one.",
        "That is the best thing I have heard all week. Have another.",
      ],
    },
  },
  {
    id: "odalys-finch", name: "Odalys Finch", title: "Singer at the Fourth Bell",
    home: "greyhaven", alsoFits: ["road"], role: "entertainer", gender: "female",
    look: look("dusk", "rose", "s4", "black"),
    portrait: "Striking woman in her thirties in a patched greatcoat far too big for her, dark hair piled up, wry mouth, one hand at her throat finding a pitch.",
    ties: ["lark", "clem-adair", "adwoa-osei"],
    secret: "She did not leave Lark for a crowd. She found an infant on the road and would not raise one at a campfire. The girl is three, lives in the orphan loft, and Odalys sings there weekly without saying why.",
    history: [
      "Conservatoire, second year, mezzo. I was going to sing Carmen. Now I sing whatever stops a room from fighting.",
      "I toured the camps with a singing partner. Lark wanted the open road and an audience of one. I wanted walls and a crowd. I took the coat when I left.",
    ],
    world: "People do not come to hear me. They come to feel something in a room where it is allowed. I am only the permission.",
    detail: "Odalys sings at the Fourth Bell and once travelled the camps with Lark.",
    voices: {
      greeting: [
        "Do you have a request? I should warn you, I only do the sad ones well.",
        "You have been on the road. I can hear it in how you breathe. Sit near the front.",
        "Hush a moment. I am finding the note. There.",
      ],
      idle: [
        "Is Lark still at that fire in the meadow? Do not tell me. Yes, tell me. Is he eating?",
        "Nine verses about Hearthglen. Lark wrote six. I wrote the three that are true.",
      ],
      farewell: [
        "Go gently. I will hold a verse open for you.",
        "If you pass Mosslight, do not say I asked. Say the coat is fine.",
      ],
      hint: [
        "The old songs put the crypt south of the Mosslight fire. Bring an iron key for what is locked inside.",
        "Every region has a wayfire. Clear the region to wake it, and the road between is no road at all.",
      ],
      wounded: [
        "You are a breath from the last verse. Sit. Someone fetch the doctor.",
        "Stop being brave at me. Clinic. I will sing you there if I must.",
      ],
      reaction: [
        "Oh, that will make a chorus.",
        "Lovely. I shall steal that for the second verse and deny it.",
      ],
    },
  },
  {
    id: "bert-lowe", name: "Bertrand Lowe", title: "Strap-maker and armor fitter",
    home: "greyhaven", role: "smith", gender: "male",
    look: look("umber", "copper", "s1", "silver"),
    portrait: "Dapper slight man in his sixties, waxed moustache, awl behind his ear, measuring tape draped like a stole, leather-stained thumbs.",
    ties: ["tamsin"],
    secret: "He cut the collar that went on Gloomfang. A Civic Works order: oversized, reinforced. He assumed it was for a horse.",
    history: [
      "Saddler. Bridles, girths, the odd handbag for a client with more money than horse. Leather is leather.",
      "Tamsin sells the plate. I make it stay on. A breastplate that slides is a tray for carrying your own ribs.",
    ],
    world: "Everyone admires the steel. Nobody admires the buckle. The buckle decides whether you die standing or tangled.",
    detail: "Bertrand fits and repairs the straps that keep Greyhaven Plate on its wearer.",
    voices: {
      greeting: [
        "Arms out. No. Out. I am not hugging you. I am looking at your gait.",
        "Who buckled that? You? It shows. Hold still.",
        "Ah, a walking alteration. Come into the light.",
      ],
      idle: [
        "Hide is short. I am cutting straps from a sofa. Do not tell the watch what they are wearing.",
        "Tamsin counts every rivet I use. I respect it. I resent it. Both.",
      ],
      farewell: [
        "Tighten the left shoulder before you run. It rides.",
        "Bring it back when the straps darken. That is rot starting, not character.",
      ],
      hint: [
        "Plate blunts a blow. It does not make you harder to hit. Keep moving in it.",
        "Armor earns its weight against brutes and the other heavy dead. That is where it saves you.",
      ],
      wounded: [
        "You have bled into the lining. Clinic for you. The jerkin I can save.",
        "Do not undo that buckle. It is the only thing holding the shape of you.",
      ],
      reaction: [
        "There. Now it fits like it was your idea.",
        "Splendid. Stand up straight and let me be proud of it.",
      ],
    },
  },
  {
    id: "magda-krol", name: "Magda Krol", title: "Ration baker",
    home: "greyhaven", role: "cook", gender: "female",
    look: look("sand", "cream", "s2", "grey"),
    portrait: "Sturdy woman in her fifties, flour to the elbows, kerchief over grey hair, burn scars up both forearms, a scowl that is mostly habit.",
    ties: ["petra-marlowe"],
    secret: "The thing in the north ditch is Petra Marlowe. Magda leaves a loaf on the postern step every night and has never said why.",
    history: [
      "Baker, like my mother and hers. I was up at three every day of my life. The end of the world changed nothing about my morning.",
      "Six hundred loaves a week from flour that is one part sawdust. I do not apologise. I put caraway in so you taste that instead.",
    ],
    world: "At three in the morning I hear the wall change shift. I know which sentries are frightened by how fast they come for bread.",
    detail: "Magda bakes Greyhaven's ration bread before dawn and hears the night watch come off the wall.",
    voices: {
      greeting: [
        "You are up late or early. Either way, there is a heel of yesterday's on the sill.",
        "Mind the peel. Hot. Everything in here is hot, including me.",
        "Do not tell me it is hard bread. I know what it is. Eat it.",
      ],
      idle: [
        "Night watch came off white as flour. Something walked the north ditch and did not try the wall.",
        "The yeast is dying. Four years I have kept that starter. It is older than half the orphans.",
      ],
      farewell: [
        "Take a loaf. It will stop a knife, if nothing else.",
        "Go. I have ovens. Come back when the sky is a sensible colour.",
      ],
      hint: [
        "Do not fight hungry and hurt. Eat a cooked meal first. It mends more than a red heart does.",
        "After dark the dead see you from farther and come in extra packs. Do your fighting by day.",
      ],
      wounded: [
        "Out of my bakery with that. Clinic. Then come back and I will give you something hot.",
        "Sit by the oven. No, the cool side. I am not baking you.",
      ],
      reaction: [
        "Hm. Good. Have the warm one.",
        "That is worth a white loaf. I have one. Do not tell anyone I have one.",
      ],
    },
  },
  {
    id: "amos-pruitt", name: "Amos Pruitt", title: "Keeper of the name wall",
    home: "greyhaven", role: "faith", gender: "male",
    look: look("slate", "ash", "s2", "white"),
    portrait: "Stooped man in his seventies, stone dust in every wrinkle, mallet and chisel, soft cap, eyes narrowed from decades of close work.",
    ties: ["vale", "edda"],
    secret: "He has already carved RUSK into the back of the blank stone, on the face turned to the wall, so it will be there whichever way the council votes.",
    history: [
      "Monumental mason. Headstones. Beloved husband, sorely missed, that sort of thing. I charged by the letter.",
      "I carve the name wall by the lamp chapel. Two thousand and nine names. No charge now. Father Vale reads them. I make sure they can be read.",
    ],
    world: "The council asks me to leave a space under R. They cannot agree whether Rusk goes on the wall. I have left it. Stone is patient.",
    detail: "Amos carves every lost name into Greyhaven's memorial wall and keeps one space empty.",
    voices: {
      greeting: [
        "Good day. Mind the chips. I sweep at noon.",
        "Looking for a name? Tell me the surname. I know where each one lives.",
        "You have the face of someone who knows a name that is not up here yet. Take your time.",
      ],
      idle: [
        "Two thousand and nine. I carved four this week. A good week is none.",
        "Edda brings me the spellings. She is never wrong. It is unsettling.",
      ],
      farewell: [
        "Go well. I would be glad never to need your spelling.",
        "Keep your name off my wall. That is all I ask of anyone.",
      ],
      hint: [
        "Kill one of the great named dead and it stays down. The ordinary ones are back in minutes.",
        "Captain Rusk walks the old city as the Rust Regent. Edda can tell you what he carried to the gate.",
      ],
      wounded: [
        "No. Not while I am holding a chisel. Clinic, please.",
        "Sit on the bench. It faces the names. They are good company for mending.",
      ],
      reaction: [
        "That is worth remembering. I am in the business.",
        "Thank you. I will carve nothing tonight because of you.",
      ],
    },
  },
  {
    id: "calla-brightwater", name: "Calla Brightwater", title: "Triage nurse",
    home: "greyhaven", role: "healer", gender: "female",
    look: look("teal", "cream", "s2", "auburn"),
    portrait: "Cheerful round-faced woman in her forties, sleeves pinned back, scissors on a ribbon, tired laughing eyes, hair escaping a scarf.",
    ties: ["ilyan"],
    secret: "The word volunteers was dictated to her by a Civic Works officer standing over the cot. She still has the page, with his signature at the foot.",
    history: [
      "Paediatric nurse. I put plasters on knees and told brave lies about needles. It was the best job in the world.",
      "I wrote the first triage ledgers on evacuation night. Doctor Voss reads them now and frowns at one word. I wrote it because I was told to.",
    ],
    world: "Ilyan treats the disease. I treat the person who has it. He thinks those are the same job. That is why he needs me.",
    detail: "Calla runs triage at the Greyhaven clinic beside Dr. Voss and wrote its earliest ledgers.",
    voices: {
      greeting: [
        "Hello, love. On a scale of one to dying, where are we today?",
        "Sit there. No, you are not fine. Nobody who says fine is fine.",
        "Oh, good. It is you. I was running out of interesting injuries.",
      ],
      idle: [
        "Doctor Voss has not slept. I have hidden his coffee. For his good and my entertainment.",
        "The early ledgers say volunteers. I wrote it. They were not asked. I think about my handwriting a lot.",
      ],
      farewell: [
        "Off you go. Keep it clean, keep it dry, keep it attached.",
        "Come back to have the stitches out. Or sooner, for the company.",
      ],
      hint: [
        "A trauma kit puts you fully right. The purge is for sickness and burns. Do not buy the wrong one.",
        "Frostfall numbs a wound. Numb is not healed. Check yourself once you are warm.",
      ],
      wounded: [
        "Right. On the cot. Boots on is fine. Do not be a hero about it. You are frightening the queue.",
        "Oh, sweetheart. Sit. I have got you. Ilyan! Now, please!",
      ],
      reaction: [
        "There you are. Good as new and twice as stubborn.",
        "Lovely. That is the first thing today that did not need mopping up.",
      ],
    },
  },
  {
    id: "ezra-tull", name: "Ezra Tull", title: "Locksmith",
    home: "greyhaven", role: "tinker", gender: "male",
    look: look("char", "brass", "s3", "dark"),
    portrait: "Wiry man in his fifties, long clever fingers, a ring of blank keys at his hip, crooked half-smile, one eye always on the door.",
    ties: ["tamsin", "jasper-wick"],
    secret: "He opened the Records Vault once before the fall, on a job for Jasper Wick, and saw the spiral plate. He was paid double to forget it.",
    history: [
      "Burglar. You asked. Eleven years, never caught, never hurt anyone. I retired the day there was nothing left behind the doors.",
      "Now I mend the locks I used to open. The watch pretends not to know. Tamsin had me fit her strongroom, then watched me the whole time.",
    ],
    world: "A lock is a question: are you supposed to be here? The dead never answer it. They only lean. Leaning beats most of my work.",
    detail: "Ezra mends Greyhaven's locks and understands the old city's vaults better than he admits.",
    voices: {
      greeting: [
        "Afternoon. Do not look at my hands like that. They are retired.",
        "You have keys on you. Iron? Let me hear them. Yes. Iron.",
        "Ah. Somebody who goes where the good doors are. Sit down. Tell me about hinges.",
      ],
      idle: [
        "Municipal vault locks. Seven lever. Beautiful. I used to dream about them.",
        "The watch keeps the north postern on a latch a child could lift. I have said so. Twice.",
      ],
      farewell: [
        "Do not force a lock. If it wants a key, it wants a key.",
        "Go on. And if you find a door that hums, leave it shut and come and get me.",
      ],
      hint: [
        "Iron keys open field crates. Gold opens the municipal vaults. Ancient keys are for doors underground.",
        "The strongest dead carry the keys. Elites for iron, the great ones for gold, and rarely an ancient.",
      ],
      wounded: [
        "You are bleeding on my picks. Clinic. I will still be a criminal when you get back.",
        "No, do not lean on that cabinet. It is not locked. It is balanced. Take the floor.",
      ],
      reaction: [
        "Smooth. Very smooth. I say that as a professional.",
        "In and out, nothing broken. You would have done well in my old trade.",
      ],
    },
  },
  {
    id: "philippa-graye", name: "Councilor Philippa Graye", title: "Greyhaven councilor",
    home: "greyhaven", role: "official", gender: "female",
    look: look("navy", "frost", "s1", "silver"),
    portrait: "Elegant woman in her sixties, steel-grey chignon, high collar, council chain of office, composed smile that gives nothing away.",
    ties: ["jasper-wick", "rowan"],
    secret: "Her husband was the officer who relayed Rusk's order to seal the east gate. She has burned every paper that says so.",
    history: [
      "Deputy headmistress, then a magistrate. I spent twenty years deciding what was fair. I was rarely thanked and never wrong for long.",
      "I stood for council on one promise: no monument to the man who chose who lived. I won by eleven votes. The eleven were widows.",
    ],
    world: "A town needs a story it can live inside. Saved by a hero is one story. Sold by a captain is another. I know which one builds better.",
    detail: "Councilor Graye leads the faction that wants Captain Rusk's name removed from Greyhaven.",
    voices: {
      greeting: [
        "Ah. The outsider everyone quotes. Do sit. I have been meaning to form an opinion of you.",
        "Good day. I will be brief, which you will find is not my reputation.",
        "You have seen the old city. Then you are a witness, and I collect those.",
      ],
      idle: [
        "Councilor Wick wants a bronze of Rusk at the west gate. He has costed it. He always has.",
        "We vote on the name wall at the end of the month. I am four votes short, and I know which four.",
      ],
      farewell: [
        "Go safely. And if you learn what truly happened at that gate, come to me first.",
        "Good day. Do mind who you repeat this to.",
      ],
      hint: [
        "The records vault holds what this council most wants and most fears. It lies east of Civic Square.",
        "Marshal Rowan pays bounties in gold and keys. He is honest. It is the only fault I can find in him.",
      ],
      wounded: [
        "Good heavens. Clinic at once. I will not have you dying in my office. It would look deliberate.",
        "Somebody send for Doctor Voss, and tell him I am the one asking. You, stay exactly there.",
      ],
      reaction: [
        "Well done. I shall mention it in session, and take a modest share of the credit.",
        "Excellent. That is the sort of fact I can use.",
      ],
    },
  },
  {
    id: "jasper-wick", name: "Councilor Jasper Wick", title: "Greyhaven councilor",
    home: "greyhaven", role: "official", gender: "male",
    look: look("wine", "brass", "s2", "dark"),
    portrait: "Sleek man in his fifties, well-kept beard, waistcoat with a watch chain, rings on two fingers, the smile of someone already calculating.",
    ties: ["philippa-graye", "edda"],
    secret: "He held Civic Works bonds. The Ember project was his largest loan, and he sold his position the morning before the fall. Edda's question, who profited, ends at him.",
    history: [
      "Commercial banking. I lent money to people who built things. I see no reason the end of the world should change the principle.",
      "I financed the wall. Grain futures, labour notes, the lot. Every stone carries my interest. People call that greed. They are warm and alive.",
    ],
    world: "Rusk made a decision with a cost. That is all leadership is. A statue is only the town admitting it knows the price it paid.",
    detail: "Councilor Wick financed Greyhaven's wall and wants Captain Rusk honored at its gate.",
    voices: {
      greeting: [
        "Ah, the independent contractor. I admire anyone who works for themselves.",
        "Come in. Mind the ledger. No, the other ledger.",
        "You look like someone with gold and no plan for it. I can help with the second part.",
      ],
      idle: [
        "Councilor Graye wants a blank where a name should be. Blanks do not pay for walls.",
        "The supply road loses one crate in five. Somebody is eating my margin. I intend to learn who.",
      ],
      farewell: [
        "Good day. Do remember who was pleasant to you.",
        "Off you go. Bring me opportunities, not problems.",
      ],
      hint: [
        "A Marauder's Eye adds a third again to the gold from every kill. It pays for itself in a morning.",
        "Gold chests need gold keys, and gold keys come off the great dead. Spend one only on gold.",
      ],
      wounded: [
        "You are bleeding on a very old rug. Clinic. I will send the bill to no one, this once.",
        "A dead contractor is a bad investment. Get yourself seen to. I shall cover it.",
      ],
      reaction: [
        "Profitable. I do like you.",
        "An excellent return. We should do business more formally.",
      ],
    },
  },
  {
    id: "iona-bell", name: "Iona Bell", title: "Bell-founder",
    home: "greyhaven", role: "smith", gender: "female",
    look: look("rust", "brass", "s3", "red"),
    portrait: "Freckled woman in her forties, auburn hair knotted up with a tuning fork through it, leather apron, bronze freckles of old burns, a listening tilt to her head.",
    ties: ["alden", "suri", "clem-adair"],
    secret: "The fourth bell did not crack by accident. Her father was paid by Civic Works to spoil the cast so no all-clear could be rung. She found his ledger last winter.",
    history: [
      "My father cast church bells. I cast them with him from the age of nine. Four generations of Bells making bells. Yes, we have heard the joke.",
      "I cast the three evacuation bells for the old city. The fourth cracked in the mould. We meant to recast it on the Monday.",
    ],
    world: "A bell is the only voice that carries farther than fear. I think about that fourth one every time the wall is quiet.",
    detail: "Iona casts and tunes Greyhaven's bells and made the evacuation bells of the old city.",
    voices: {
      greeting: [
        "Do not shout in here. Everything in this room answers.",
        "Hello. Tap that one. Gently. Hear the wobble? That one is wrong and I love it.",
        "You are the walker. Tell me, do the avalanche bells still ring at Frostfall? I cast those.",
      ],
      idle: [
        "Bronze is short. I am melting door handles. Greyhaven will soon have few ways to open things.",
        "Three bells for go. One for safe. I only ever finished the frightening ones.",
      ],
      farewell: [
        "Listen for the wall bell. One stroke is the hour. Many is run.",
        "Go well. Ring something if you get the chance. It does the heart good.",
      ],
      hint: [
        "Suri Kest keeps the avalanche bells at Frostfall free of ice. Help her and her shelter holds.",
        "Each of the three outposts has a banner. Plant yours and the place is yours to build on.",
      ],
      wounded: [
        "Not on the mould! There. The stool. Somebody fetch Voss.",
        "You are ringing like a cracked bell. Clinic, quickly.",
      ],
      reaction: [
        "Now that rings true.",
        "Lovely. Clear as a struck note.",
      ],
    },
  },
  {
    id: "teo-ruiz", name: "Teodor Ruiz", title: "Supply cart driver",
    home: "greyhaven", alsoFits: ["road"], role: "courier", gender: "male",
    look: look("ochre", "red", "s5", "black"),
    portrait: "Stocky man in his fifties, sun-creased face, straw hat, reins in one hand, a little saint's medal nailed to the cart's footboard.",
    ties: ["tamsin", "jasper-wick"],
    secret: "The one crate in five that goes missing is his doing. He leaves them at a marked milepost for the holdouts in the old city and has no intention of stopping.",
    history: [
      "Bus driver. Route fourteen, crosstown. Eleven years and I never once left a passenger at a stop. I am told that is unusual.",
      "I drive the supply cart. Same idea, fewer stops, more teeth. Tamsin times me. I have never lost a load. I have lost wheels.",
    ],
    world: "The road wants one wheel off every cart. I do not know why. I pour a little water on the hub before I leave, and it mostly takes another cart.",
    detail: "Teodor drives Greyhaven's supply cart and knows which stretches of road eat wheels.",
    voices: {
      greeting: [
        "Hola. Do not walk behind the mule. He has opinions about that.",
        "You came up the west road? How was the rut by the dead oak? Deeper?",
        "Sit up here if you like. The view is a mule, but it is honest.",
      ],
      idle: [
        "Three wheels this month. Tamsin thinks I do it on purpose. Who would do that on purpose?",
        "Crates stamped CITY WORKS ride heavier than they weigh. I dislike hauling them. The mule likes it less.",
      ],
      farewell: [
        "Good road to you. Keep to the left of the ruts.",
        "Go with God and four wheels.",
      ],
      hint: [
        "A wayfire is faster than any cart. Clear a region, wake its fire, and you never drive that road again.",
        "Carry less. Sell to Maro on the road and Patch in town, and keep your pack for what matters.",
      ],
      wounded: [
        "Madre. Sit on the tailboard. I will drive you to the clinic. The mule will complain.",
        "You are leaking like a cut wineskin. Clinic. Now. Up you get.",
      ],
      reaction: [
        "Bravo! All four wheels and everything.",
        "That is how you finish a route.",
      ],
    },
  },
  {
    id: "greta-lindqvist", name: "Greta Lindqvist", title: "Cobbler",
    home: "greyhaven", role: "resident", gender: "female",
    look: look("pine", "ash", "s1", "blond"),
    portrait: "Brisk woman in her fifties, magnifying spectacles, apron of tyre-rubber offcuts, awl in hand, peering at your feet rather than your face.",
    ties: ["adwoa-osei", "dessa-quill"],
    secret: "She recognised the boots on a body at the wall last spring: a pair she made for Dessa Quill's husband. She has not told Dessa she knows.",
    history: [
      "Podiatrist. Yes, feet. I had a clinic with a fish tank. People are embarrassed by feet. Feet do not care.",
      "Now I make boots out of tyres. I can tell where a person has walked by how the heel wears. The Mire eats stitching. Ash eats soles.",
    ],
    world: "Everyone looks at a stranger's face. I look at the boots. A face can lie about where it has been for years. Boots manage a week.",
    detail: "Greta makes and mends Greyhaven's boots and can read a journey from a worn heel.",
    voices: {
      greeting: [
        "Foot up. Up. On the stool. Let me see what you have done to these.",
        "Ah. Basalt scoring on the toe. You have been in the Wastes. Do not deny it to a cobbler.",
        "You walk on the outside edge. Left hip? You should see someone. Not me. A real someone.",
      ],
      idle: [
        "Fourteen children in that loft and nine in the wrong shoes. I am four pairs behind and out of tyre.",
        "Snow does not wear a boot out. It gets inside and waits. I respect that.",
      ],
      farewell: [
        "Dry them slowly. Never by a fire. I will know.",
        "Go on. Heel first, please. You are costing yourself a sole a month.",
      ],
      hint: [
        "Each region is hard on you its own way: burning in the Wastes, cold in Frostfall, sickness in the Mire.",
        "Glowing ground in the Ember Wastes is not a path. Stand on the pale ash.",
      ],
      wounded: [
        "You are tracking blood. Clinic, two rows over. Leave the boots. I will do them while you are stitched.",
        "Foot up. No, I am looking at the wound this time, not the leather.",
      ],
      reaction: [
        "Well. Those have been somewhere worth going.",
        "Now go and wear them out again.",
      ],
    },
  },
  {
    id: "silas-crane", name: "Silas Crane", title: "Keeper of the ash-house",
    home: "greyhaven", role: "resident", gender: "male",
    look: look("char", "bone", "s1", "silver"),
    portrait: "Tall cadaverous man in his sixties, black frock coat brushed spotless, white gloves, mournful courteous face, hands folded.",
    ties: ["rowan"],
    secret: "One urn on the long shelf is labelled for Captain Rusk's daughter Nera. He prepared it the night she vanished and has never been asked to fill it.",
    history: [
      "Funeral director. Third generation. Crane and Sons, discreet and dignified. I was the son.",
      "Greyhaven burns its dead within the hour. I keep the ash-house and the urns. Two thousand of them, labelled. It is a great many shelves.",
    ],
    world: "Grief wants a ceremony and the dead allow no time for one. So I hold it afterwards, properly, with the ashes. Nobody has objected.",
    detail: "Silas keeps Greyhaven's ash-house and gives the burned dead the ceremony they had no time for.",
    voices: {
      greeting: [
        "Good afternoon. May I say how well you are looking. I say it sincerely. I am a judge.",
        "Welcome. Do mind the lower shelves. They are the children.",
        "Ah. You have the particular quiet of someone who has seen a great deal. Please, sit.",
      ],
      idle: [
        "The Marshal sends me the watch's dead each morning. I have asked for fewer. He says he is trying.",
        "I keep a shelf for those with no ash to return. It is the longest shelf.",
      ],
      farewell: [
        "Do take care. I should be very sorry to be of service to you.",
        "Good day. Walk well, and for a long time.",
      ],
      hint: [
        "The fallen rise again in minutes unless they were great and named. Never trust a cleared street.",
        "A golden chest follows the fall of something great. Do not leave before you have looked for it.",
      ],
      wounded: [
        "Oh dear. No. Not yet, if you please. The clinic is just across.",
        "Do sit. You are a little closer to my professional interest than I should like.",
      ],
      reaction: [
        "Most gratifying. Truly.",
        "Admirably done. I shall think of it on the long shelves.",
      ],
    },
  },
  {
    id: "noor-haddad", name: "Noor Haddad", title: "Apothecary",
    home: "greyhaven", role: "healer", gender: "female",
    look: look("plum", "sage", "s5", "black"),
    portrait: "Sharp-featured woman in her forties, headscarf, brass scales in hand, tincture stains on her cuffs, one sceptical eyebrow raised.",
    ties: ["ilyan"],
    secret: "The fourth thing is a quiet draught for the bitten who ask for it before they turn. Three people have asked. She has made five doses.",
    history: [
      "Hospital pharmacist. I spent my days stopping doctors from poisoning people with their handwriting.",
      "Now I make burn salve from tallow and willow, and Doctor Voss tells me it is folklore. Then he sends his patients over for it.",
    ],
    world: "There are three sicknesses out there with no cure, only a purge. I am working on a fourth thing. I would rather never need it.",
    detail: "Noor compounds salves and tonics in Greyhaven and supplies the clinic with what it cannot make.",
    voices: {
      greeting: [
        "Do not touch the jars. Some are medicine. Some are why we need medicine.",
        "Hello. Tongue? No. Hands. Show me your hands. Hm. You have been near ash.",
        "Welcome. It smells like that on purpose.",
      ],
      idle: [
        "Ilyan says ashfever starts behind the eyes. It starts in the lungs. I have the lungs to prove it.",
        "Willow is running low. I would trade a week of my life for one decent tree.",
      ],
      farewell: [
        "Wash your hands. Then wash them again as though I am watching.",
        "Off you go. Breathe through cloth in the Wastes. It is not vanity.",
      ],
      hint: [
        "Ember sickness and burns need the purge at the clinic. Do not wait on them.",
        "An Ember Ward Charm stops burning outright. If you are bound for the Wastes, wear that one.",
      ],
      wounded: [
        "Pressure here. Harder. The clinic is next door, and I am walking you there.",
        "That needs Voss, not me. Do not tell him I said he was good at something.",
      ],
      reaction: [
        "Precisely measured. I like a person who follows a label.",
        "Well done. Now sit down before you undo it.",
      ],
    },
  },
  {
    id: "anselm-roche", name: "Anselm Roche", title: "Wall mason",
    home: "greyhaven", role: "resident", gender: "male",
    look: look("sand", "ash", "s4", "brown"),
    portrait: "Huge gentle man in his forties, hands like shovels, lime-white to the wrists, shy downcast eyes, a tiny stone bird in one palm.",
    ties: ["philippa-graye"],
    secret: "One stone in the west gate arch bears a carved spiral he did not make. It came in the salvaged rubble, and he mortared it in facing inwards without a word.",
    history: [
      "Sculptor. Large public pieces. Abstract. People walked past them to get to lunch.",
      "Now I lay the wall. Every tenth stone, I carve something small on the inside face. A wren. A hare. Nobody will see them. That is the point.",
    ],
    world: "A wall is the biggest thing I have ever made and the least looked at. It has saved more people than everything in the galleries.",
    detail: "Anselm builds and mends Greyhaven's wall and hides a small carving in every tenth stone.",
    voices: {
      greeting: [
        "Hm. Hello. Mind your feet. Wet mortar.",
        "You came in from outside. Is the wall straight from out there? I only ever see my side.",
        "Sit. I am not good at talk. I am good at company.",
      ],
      idle: [
        "Four hundred and six animals so far. Yesterday a fox. I gave him a kind face.",
        "North course is settling. I told the council. They asked what it would cost. It costs a wall.",
      ],
      farewell: [
        "Go well. The wall will be here.",
        "Come back. I will carve you something. Small.",
      ],
      hint: [
        "A spike ring around an outpost hurts whatever crosses. Build it before the first raid, not after.",
        "Claimed outposts get raided. Be there when it comes, or come back to less.",
      ],
      wounded: [
        "No. Sit. I will carry you to the clinic if you fall. I would rather you walked.",
        "You are hurt. Here. Lean. I do not mind.",
      ],
      reaction: [
        "Good. Solid.",
        "That will stand.",
      ],
    },
  },
  {
    id: "kit-sparrow", name: "Kit Sparrow", title: "Apprentice salvage runner",
    home: "greyhaven", role: "courier", gender: "male",
    look: look("steel", "ember", "s3", "blond"),
    portrait: "Gangly boy of fifteen, shock of blond hair in his eyes, all knees and elbows, satchel worn crosswise, mid-bounce on the balls of his feet.",
    ties: ["bria", "patch"],
    secret: "Kit has been running into the old city alone at night to look for a bicycle. He has twice been seen by the Regent's patrol and escaped on luck.",
    history: [
      "I was ten. I delivered papers. Real ones. On a bike. I had a bell. I miss the bell more than I can say out loud.",
      "Bria took me on because I beat her to the granary once. She says it was a fluke. It was not. I have done it twice since. She was not looking.",
    ],
    world: "Bria says fast is not the same as first. I do not know what that means yet. I think it means do not die. Everything she says means that.",
    detail: "Kit runs salvage routes for Bria and is the second-fastest courier in Greyhaven.",
    voices: {
      greeting: [
        "Hi! Are you going out? Can I—no. Bria said no. I was not going to ask.",
        "You are the one who did the market road! Was it loud? Bria says loud is bad.",
        "I can carry that. I can carry two of that. Watch.",
      ],
      idle: [
        "Granary to gate in ninety-one seconds. Bria does it in eighty-eight. She is old. I have time.",
        "I found a bike wheel in the scrap. Just the wheel. Patch wants four coins. For a wheel.",
      ],
      farewell: [
        "Run light! That is what she says. Run light, return heavy.",
        "Bye! If you see a bell, a bike bell, I will pay anything.",
      ],
      hint: [
        "Bria says hit the three caches by the old market first. Pharmacy, lockers, records vault.",
        "If a marker is still gold, nobody has emptied it. Dull means gone. Do not waste the run.",
      ],
      wounded: [
        "Oh no. Oh no. I can run for the doctor. I am very fast. Do not move. Going.",
        "Sit, sit, sit. Bria says pressure. Is this pressure? Am I doing pressure?",
      ],
      reaction: [
        "That was amazing! I am telling Bria. She will say hm. That is good, for her.",
        "Yes! I knew it. I said so. Ask anyone.",
      ],
    },
  },
  {
    id: "roderick-plume", name: "Roderick Plume", title: "Census keeper",
    home: "greyhaven", role: "official", gender: "male",
    look: look("umber", "bone", "s1", "grey"),
    portrait: "Fussy narrow man in his sixties, sleeve garters, rubber stamp in hand, pince-nez, thin hair combed with geometric precision.",
    ties: ["frida-hart", "petra-marlowe"],
    secret: "He has the return slip. Requisition forty-four was never returned because the handler named on it is Frida Hart, and he could not bear to hand it to her.",
    history: [
      "Senior clerk, Civic Works, requisitions. Nothing moved in that city without a form, and no form moved without my stamp.",
      "I keep the census now. Births, deaths, changes of dwelling. Form nine, in triplicate. The dead cannot fill in a form. That is the point.",
    ],
    world: "I processed Kennel Requisition forty-four: one guard animal, reinforced collar, district patrol. I stamped it. I think about that animal.",
    detail: "Roderick keeps Greyhaven's census and once stamped every Civic Works requisition.",
    voices: {
      greeting: [
        "Name, dwelling, and purpose of visit. No, I do need all three.",
        "Ah. You are not on the census. That is irregular. I do not say illegal. Irregular.",
        "Good day. Please do not lean on the forms. They are in order.",
      ],
      idle: [
        "Population one thousand and twelve as of noon. One fewer if Mrs. Marlowe has filed her change.",
        "Requisition forty-four. One guard animal. I have looked for the return slip for four years.",
      ],
      farewell: [
        "Do come back. Departures without returns create a great deal of paperwork.",
        "Good day. Mind the step, and file nothing while you are out.",
      ],
      hint: [
        "The beast in Moonfang Clearing once wore a Civic Works collar. It was bred to guard, and it still does.",
        "Three vaults lie under the regions: Rootbound Crypt, Cinder Vault, Rimehold Depths. I filed the plans.",
      ],
      wounded: [
        "You are bleeding on form nine. Clinic. I shall have to redo the whole sheet.",
        "Do sit. Injuries are form twelve, and I would rather not.",
      ],
      reaction: [
        "Most satisfactory. I shall enter it.",
        "Properly done, and in the right order. One so rarely sees it.",
      ],
    },
  },
  {
    id: "frida-hart", name: "Frida Hart", title: "Kennel keeper",
    home: "greyhaven", role: "hunter", gender: "female",
    look: look("moss", "copper", "s2", "blond"),
    portrait: "Weathered woman in her fifties, sandy hair in a long plait, whistle on a cord, scarred forearms, a great brindle hound leaning against her leg.",
    ties: ["roderick-plume", "bert-lowe"],
    secret: "She knows Gloomfang is Button. She has walked to the edge of Moonfang Clearing three times with a whistle and never blown it.",
    history: [
      "Dog handler, Civic Works security. Six years. I trained them to hold a perimeter and to come when called. They always came.",
      "I raised one from a pup that grew bigger than he should. They fitted a new collar and took him east. I called him Button. He did not come back.",
    ],
    world: "A good dog does not stop guarding because the world ends. It only gets confused about what it is guarding. I think of that at Moonfang.",
    detail: "Frida trains Greyhaven's watchdogs and once handled guard animals for Civic Works.",
    voices: {
      greeting: [
        "Let them smell your hand. Flat. Good. You may come in.",
        "You have a dog with you out there? Is it eating? Is it sleeping near you? Good.",
        "Quiet a moment. Listen. That whine means east. They always point east.",
      ],
      idle: [
        "Six on the wall tonight. Juniper is in pup. I have not told the council or they will count them.",
        "They howl at the same hour every dusk. All of them, facing the meadows. I do not correct it.",
      ],
      farewell: [
        "Be kind to your dog. It has chosen you, and it will not unchoose.",
        "Go on. If you hear a howl that answers itself, come home.",
      ],
      hint: [
        "A companion dog follows, fights beside you, and levels as it goes. Adopt one and keep it alive.",
        "Gloomfang calls its pups, then charges. Put the pups down first. It hurts, and it is correct.",
      ],
      wounded: [
        "Down. Sit. Stay. I am sorry. That is how I talk to everything I care about. Clinic.",
        "The dogs are whining at you. They know. Go and be mended.",
      ],
      reaction: [
        "Good. Very good. I would give you a biscuit, and I mean that kindly.",
        "That is how it is done. Calm, then quick.",
      ],
    },
  },
  {
    id: "cyrus-venter", name: "Cyrus Venter", title: "Pawnbroker",
    home: "greyhaven", role: "trader", gender: "male",
    look: look("wine", "brass", "s1", "silver"),
    portrait: "Silver-haired man in his sixties with a trim silver beard, velvet waistcoat gone shiny, jeweller's glass on a cord, heavy-lidded patient gaze.",
    ties: ["patch"],
    secret: "He holds the watch Captain Rusk pawned the week before the fall, to pay for something kept off the books. The inscription inside the lid reads: For N.",
    history: [
      "Antiques. Georgian silver, mostly. I told people what their grandmothers' things were worth and watched their faces fall.",
      "Patch buys what is broken. I lend against what is loved. A wedding ring, a watch, a father's knife. Most come back for them. Not all.",
    ],
    world: "Gold is the only thing here that weighs what it did before. That is not sentiment. That is why it still works.",
    detail: "Cyrus lends against keepsakes in Greyhaven and holds what people could not bear to sell.",
    voices: {
      greeting: [
        "Good evening. I see you carry something you would rather not part with. Everyone does.",
        "Welcome. Touch nothing. Each of those is someone's last good day.",
        "Ah, a person of means. Or of prospects, which is means with patience.",
      ],
      idle: [
        "Thirty-eight wedding rings in that drawer. I know the names. I remember who cried.",
        "Patch Merrin calls me a vulture. A vulture is tidy. She lives in a nest of wire.",
      ],
      farewell: [
        "Go safely. I prefer my customers able to redeem.",
        "Good night. Do come back with something heavy.",
      ],
      hint: [
        "A Marauder's Eye pays more gold on every kill. Wear it when you hunt for coin, not for your life.",
        "A relic is worth more worn than sold. The great dead carry them, and each does what no shop can.",
      ],
      wounded: [
        "Not on the velvet, I beg you. The clinic is that way. I will hold the door.",
        "You look a poor pledge at the moment. Do get yourself seen to.",
      ],
      reaction: [
        "A pleasure. A genuine one, which is rarer in my trade.",
        "Very handsome. You have a good eye, and good hands to go with it.",
      ],
    },
  },
  {
    id: "hyacinth-poole", name: "Hyacinth Poole", title: "Rooftop gardener and pigeon keeper",
    home: "greyhaven", role: "farmer", gender: "female",
    look: look("pine", "rose", "s1", "white"),
    portrait: "Plump smiling woman in her sixties, straw hat stuck with feathers, trowel in an apron pocket, a pigeon perched on her shoulder.",
    ties: ["juno", "tomas", "wes-reed"],
    secret: "Twice her pigeons have come back from the east with a note tied on in chalk-dusted thread and a drawing of a bird. She took it for a child's prank and burned both.",
    history: [
      "Florist. Weddings and funerals, and you would be surprised how often it was the same lilies.",
      "I garden the roofs now. Beans up the chimneys, squash in the gutters. And the pigeons. They carry a note to Hearthglen in a morning.",
    ],
    world: "Down in the street it is all walls and worry. Up here there is weather. I recommend weather. It is not about you.",
    detail: "Hyacinth farms Greyhaven's rooftops and keeps the pigeons that carry its messages.",
    voices: {
      greeting: [
        "Up here! Mind the beans. No, those are the beans. That is the washing.",
        "Hello, dear. You have a face that needs a tomato. Hold out your hand.",
        "Oh, a ground person. Welcome to the good part of town.",
      ],
      idle: [
        "Gerald came back from Hearthglen with a note tied on wrong. Somebody there has very shaky hands.",
        "Juno crosses my squash to reach the gate. I have asked her to cross the marrows instead.",
      ],
      farewell: [
        "Mind the gutter on your way down. It is a gutter and a parsnip bed.",
        "Go safely, dear. I will send a pigeon if anything interesting happens.",
      ],
      hint: [
        "The map only shows where you have walked. The rest is not empty. It is only unseen.",
        "The day turns quickly out there. Leave yourself enough light to walk home by.",
      ],
      wounded: [
        "Oh, my dear. Down the ladder, carefully, and straight to the clinic. I will send Gerald ahead.",
        "Sit among the beans. They are restful. Somebody will come.",
      ],
      reaction: [
        "Oh, how lovely! Have a marrow.",
        "Well done, dear. The pigeons are thrilled. That one is, anyway.",
      ],
    },
  },
  {
    id: "mateus-braga", name: "Mateus Braga", title: "Old soldier at the west gate",
    home: "greyhaven", role: "guard", gender: "male",
    look: look("slate", "ash", "s6", "white"),
    portrait: "Lean old man in his eighties, flat cap, medal ribbon faded to grey on a threadbare jacket, chessboard on his knees, sly patient smile.",
    ties: ["rowan"],
    secret: "He was Captain Rusk's chess partner every Thursday for nine years. Rusk's last move, left on a board in the old barracks, was a queen sacrifice Mateus still replays.",
    history: [
      "Infantry, a long time ago and a long way from here. Then a park bench and a chessboard for thirty years. I preferred the bench.",
      "I sit by the west gate with the board. The watch allows it. I have played the same opening since the fall. Nobody has beaten it. Nobody tries.",
    ],
    world: "The dead play one move. Forward. It is a poor game, but they have a great many pieces, and they do not mind losing them.",
    detail: "Mateus plays chess at Greyhaven's west gate and reads the dead like an opponent's opening.",
    voices: {
      greeting: [
        "Sit. White or black? It does not matter. I will win. It passes the time.",
        "Ah. The piece that moves on its own. You are a knight. Nobody expects the corner.",
        "Bom dia. You have the walk of someone who lost a pawn this morning.",
      ],
      idle: [
        "The Marshal plays a careful game. Too careful. He guards every square and wonders why he is tired.",
        "I have left my king in the open for four years. Come and take it. Somebody.",
      ],
      farewell: [
        "Go. Control the centre. In chess and in a street.",
        "Until the next game. Try to keep your queen.",
      ],
      hint: [
        "A charger is a rook. Straight lines only. Step off the file and it cannot touch you.",
        "A spitter is a bishop behind pawns. Take the bishop. The pawns were never the danger.",
      ],
      wounded: [
        "You have lost material. Retreat. That is not shame. It is the endgame. Clinic.",
        "Do not resign the game. Only adjourn it. Rest.",
      ],
      reaction: [
        "Hah. A good move. I did not see it. I am pleased.",
        "Check. And very nearly mate. Well played.",
      ],
    },
  },
  {
    id: "thora-engel", name: "Thora Engel", title: "Glassblower",
    home: "greyhaven", role: "smith", gender: "female",
    look: look("clay", "sky", "s2", "red"),
    portrait: "Wiry woman in her fifties, greying hair tied up in a cotton scarf, blowpipe over her shoulder, heat-flushed cheeks, squinting at a glowing gather.",
    ties: ["vale", "tobin-greaves"],
    secret: "A lump of fused black glass in her kiln rings, faintly, whenever a relic is carried past the door. She uses it as a paperweight and has stopped mentioning it.",
    history: [
      "Studio glass. Vases nobody could afford, sold to people who put them where nobody could see.",
      "I blow lamp chimneys for Father Vale and flasks for whoever walks the road. A flask is the most honest thing I ever made. It only has to not break.",
    ],
    world: "Glass is sand that was frightened enough to change. I find that encouraging, most days.",
    detail: "Thora blows Greyhaven's lamp glass and the flasks its travelers carry.",
    voices: {
      greeting: [
        "Do not come in fast. Everything in here is one sneeze from sand.",
        "Hello. Show me your flasks. Hm. Chipped. You have been falling on them.",
        "Mind the pipe. It is long, and I forget where the end is.",
      ],
      idle: [
        "Sixty-two chimneys on that wall, and the lamplighter breaks one a week from nerves.",
        "The good sand is in the Wastes. Black sand. It blows beautifully and it costs a lung.",
      ],
      farewell: [
        "Wrap your flasks in cloth. I am not made of them.",
        "Go carefully. I say that to glass too.",
      ],
      hint: [
        "A flask heals quickly but runs dry. A rest fills them again, and so will Mara in Hearthglen.",
        "Ember crystal sings near other crystal. Carry three and you will hear it. Never carry them loose.",
      ],
      wounded: [
        "Out, out. You will faint into the cullet. Clinic. I will bring your flasks round.",
        "The cool bench, there. Breathe slowly, like blowing a long neck.",
      ],
      reaction: [
        "Beautiful. Not a bubble in it.",
        "There. That came out clear.",
      ],
    },
  },
  {
    id: "min-seo", name: "Min Seo", title: "Mapmaker",
    home: "greyhaven", alsoFits: ["road"], role: "scout", gender: "female",
    look: look("navy", "cream", "s2", "black"),
    portrait: "Precise woman in her thirties, ink-black bob, drafting pens in her breast pocket, compass on a chain, intent bright eyes.",
    ties: ["pim", "veiled"],
    secret: "She has surveyed spiral marks under three ruined cities and run their bearings out on a private sheet. The lines meet under a hill beside Hearthglen.",
    history: [
      "Cartographer for the transit authority. I drew the tram map. The clean one, with the colours. People loved it. It lied about every distance.",
      "Now I draw honest maps. Where the dead pool, where the ground gives, where someone was last seen. Pim sells copies. Badly. I let him.",
    ],
    world: "A map is a promise that someone went there and came back. Most of the world is unpromised again. I find that thrilling, and I am ashamed of it.",
    detail: "Min draws Greyhaven's maps and wants to know everything you have seen beyond the fog.",
    voices: {
      greeting: [
        "Wait. Before anything. Where have you just been? Point. On the sheet.",
        "Ash on your left side and mud on your right. You came by the south road. I am right, yes?",
        "Sit. I will pour tea. You will describe a place. That is the trade.",
      ],
      idle: [
        "The Mire will not hold a line. I have drawn Blackwater four times and it has moved four times.",
        "Pim drew a dragon in the corner of my survey. I left it. It is the most accurate part.",
      ],
      farewell: [
        "Go somewhere I have not drawn. Then come and tell me.",
        "Mind the edges. That is where maps end and guessing starts.",
      ],
      hint: [
        "Your map fills in as you walk and stays filled. Fog on it only means you have not been.",
        "Each region shows its name once you are inside it. Learn them. People give directions by region.",
      ],
      wounded: [
        "You are bleeding on a survey sheet. I do not mind. It is to scale. Clinic.",
        "Do not point at the map with that hand. Hold it above your heart. Higher.",
      ],
      reaction: [
        "Oh. That changes the whole east margin. Thank you.",
        "Wonderful. I can ink that in.",
      ],
    },
  },
  {
    id: "agnes-dray", name: "Sister Agnes Dray", title: "Ashen penitent",
    home: "greyhaven", alsoFits: ["road"], role: "faith", gender: "female",
    look: look("slate", "ash", "s1", "grey"),
    portrait: "Gaunt woman in her fifties, grey habit rubbed with ash, bare feet, steady burning eyes, one hand raised mid-sentence.",
    ties: ["vale", "halvard-stroud"],
    secret: "She rang the third bell. She gave the signal that the evacuation was closing, on Rusk's order, and has never told a living soul.",
    history: [
      "I was a nun. An ordinary one. I taught piano and ran a jumble sale. I believed in mercy the way you believe in a floor.",
      "Then I watched a city shut its gate on its own children. Now I wear ash and tell this town the truth: the dead are a debt, come to collect.",
    ],
    world: "Father Vale lights a lamp and says we are forgiven. I say we have not yet asked. One of us is comforting. One of us is correct.",
    detail: "Sister Agnes preaches in Greyhaven's market that the dead are a debt the living still owe.",
    voices: {
      greeting: [
        "You have killed many of them. I do not condemn it. I ask whether you learned any of their names.",
        "Stop. Look at me. Do you know what was done at the east gate? Then do not walk past so quickly.",
        "Peace, traveler. I do not say be at peace. I say peace, as a thing owed.",
      ],
      idle: [
        "They moved me from the chapel steps. So I preach by the smokehouse. Hunger listens better anyway.",
        "The Regent wears a captain's coat. This town wears his walls. Tell me which of us is his.",
      ],
      farewell: [
        "Go, then. Kill gently, if you can learn how.",
        "Walk on. And count them. Somebody should.",
      ],
      hint: [
        "The hordes are called, not wandering. Something rings, and they answer. Ask who taught it to ring.",
        "The Rust Regent does not keep to one place. He walks his city. Do not expect him to wait for you.",
      ],
      wounded: [
        "You are bleeding, and I will not pretend that is justice. Go to the clinic. Live. Then listen.",
        "Rest. Even a debt allows the debtor that.",
      ],
      reaction: [
        "That was mercy. You may not have meant it, but it was.",
        "I had not expected goodness from someone so armed.",
      ],
    },
  },
  {
    id: "lorcan-reddy", name: "Lorcan Reddy", title: "Dishwasher at the Fourth Bell",
    home: "greyhaven", role: "resident", gender: "male",
    look: look("umber", "sage", "s1", "red"),
    portrait: "Hunched stubbled man in his late twenties, sleeves soaked to the shoulder, darting eyes, a watch-issue belt buckle worn turned inward.",
    ties: ["clem-adair", "inga-varga"],
    secret: "He is the sentry missing from the north stretch. He left his post the night the wall was nearly breached, and Sergeant Varga still carries a desertion warrant with his name on it.",
    history: [
      "Me? Nothing. Kitchens. Always kitchens. Why, who is asking? No, sorry. Kitchens.",
      "I wash pots at the Fourth Bell. Clem pays in supper and does not ask. I like a man who does not ask. Are you going to ask?",
    ],
    world: "I hear the wall from the scullery. Every shift change. I know the pattern. I mean, anyone would. You pick it up. From the scullery.",
    detail: "Lorcan washes dishes at the Fourth Bell and flinches whenever the watch walks in.",
    voices: {
      greeting: [
        "What? Oh. Hello. You gave me a turn. Everybody gives me a turn.",
        "You are not watch, are you? No. You are too scruffy. That is a compliment.",
        "If you want Clem, he is out front. If you want me, I am not here.",
      ],
      idle: [
        "Sergeant Varga drinks at the end stool on Thursdays. I do the back pans on Thursdays. Coincidence.",
        "Forty-one on the wall. They are always one short on the north stretch. I happen to know.",
      ],
      farewell: [
        "Right. Good. Off you go. You did not see me.",
        "Mind the back step. And mind who you mention.",
      ],
      hint: [
        "Night out there is worse than day. More of them, and they spot you sooner. I have seen it from a wall.",
        "If a brute or a shieldbearer closes on you, move. Standing your ground is how people get hurt.",
      ],
      wounded: [
        "Oh, God. That is a lot. Clinic! East stalls! I am not good with—go, go.",
        "Stay there. I will get Clem. Do not die in the scullery. They will ask questions.",
      ],
      reaction: [
        "You did that? On purpose? I could never. I mean, well done.",
        "Good. That is good. Braver than me, which, well. Yes.",
      ],
    },
  },
  {
    id: "petra-marlowe", name: "Petra Marlowe", title: "Widow beyond the north wall",
    home: "greyhaven", role: "resident", gender: "female",
    look: look("dusk", "bone", "s1", "silver"),
    portrait: "Fine-boned woman in her sixties, lace collar carefully mended, hair pinned immaculately, hands clasped tight, eyes that keep going to the house behind her.",
    ties: ["halvard-stroud", "magda-krol", "tobin-greaves"],
    secret: "Her turned husband is chained in the root cellar. She feeds him raw meat, plays him Chopin, and believes he hums along. The butcher, the baker and the lamplighter all know.",
    history: [
      "I taught piano. My husband tuned them. We were married thirty-one years and never once ran out of things to say.",
      "He was bitten on the road to Greyhaven. I keep a little house outside the north wall now. I prefer it. It is quiet, and I have my routines.",
    ],
    world: "People tell me I should move inside. They are kind. They do not understand that some of us have something to look after.",
    detail: "Petra lives alone outside Greyhaven's north wall and will not say why she refuses to move in.",
    voices: {
      greeting: [
        "Oh. A visitor. I am afraid I cannot ask you in. The house is not fit to be seen.",
        "Good day. You are very kind to stop. Most people walk faster past my gate.",
        "Please lower your voice. He—the house is resting.",
      ],
      idle: [
        "I play in the evenings. Chopin, mostly. It keeps things calm. It keeps me calm, I mean.",
        "The butcher is good to me. He never asks what a woman alone wants with so much.",
      ],
      farewell: [
        "Do go carefully. And do not come by after dark. I keep odd hours.",
        "Thank you for stopping. Truly. Now you must be on your way.",
      ],
      hint: [
        "More of the dead come out once the light goes. Be behind a door by dusk. I always am.",
        "Raw meat does you no good raw. Two cuts on a cook fire make a proper meal. So I am told.",
      ],
      wounded: [
        "Oh, you are hurt. I have bandages. Wait there. No. There. By the gate, please.",
        "You must go to the clinic. I cannot have blood by the house. It upsets things.",
      ],
      reaction: [
        "How kind. How very kind. You must not tell anyone you were here.",
        "Thank you. He would have liked you. He liked capable people.",
      ],
    },
  },
  {
    id: "vera-stahl", name: "Vera Stahl", title: "Quarantine warden",
    home: "greyhaven", role: "guard", gender: "female",
    look: look("steel", "frost", "s2", "dark"),
    portrait: "Severe fine-featured woman in her forties, dark hair scraped into a bun, leather gauntlets to the elbow, lantern raised to inspect you, no expression at all.",
    ties: ["ilyan", "dessa-quill"],
    secret: "One of the eleven she turned back was her own brother. He was not going to turn. He was only bleeding, she could not tell, and he died at the foot of the wall.",
    history: [
      "Customs officer. Airport. I spent fourteen years deciding from a face who was hiding something. I was good. I am still good.",
      "I run the quarantine pens at the gate. Three days for anyone with a wound. I have turned back eleven who would have turned. I count the eleven.",
    ],
    world: "Everybody hates the pens until someone they love is spared by them. Then they bring me soup and cannot meet my eye.",
    detail: "Vera runs Greyhaven's quarantine pens and decides who may come through the gate.",
    voices: {
      greeting: [
        "Sleeves. Up. Both. Turn. Thank you. You may speak now.",
        "You again. Clean last time. Show me anyway.",
        "I do not need your name. I need to see your neck.",
      ],
      idle: [
        "Two in the pens. A scratch and a liar. The scratch will be fine.",
        "Doctor Voss checks them at dusk. He is gentle about it. I am glad one of us is.",
      ],
      farewell: [
        "Come back the way you left: unbitten.",
        "Go. And if you are hurt out there, say so at the gate. Lying costs three more days.",
      ],
      hint: [
        "A purge at the clinic clears sickness and burns. A trauma kit is for wounds. Know which you have.",
        "A wound in the cold goes numb and you stop noticing it. Check yourself when you come down.",
      ],
      wounded: [
        "Stop. That is a wound. Is it a bite? Look at me. Is it a bite? Clinic, then. Go.",
        "On that stool. Touch no one. Voss is coming.",
      ],
      reaction: [
        "Unbitten. I checked while you were talking. And well done.",
        "Clean work. Clean hands. I approve of both.",
      ],
    },
  },
  {
    id: "milo-trent", name: "Milo Trent", title: "Inventor",
    home: "greyhaven", role: "tinker", gender: "male",
    look: look("ochre", "ember", "s1", "brown"),
    portrait: "Frizzy-haired man in his thirties with a scruffy beard, one eyebrow visibly shorter than the other, goggles, pockets bristling with springs, hopeful grin.",
    ties: ["zhenya-kolt", "patch", "rowan"],
    secret: "One of his rejected devices, a tuning-fork gadget meant to scare off dogs, makes every relic in the room hum. He has no idea what he has built.",
    history: [
      "Product designer. Kitchen gadgets. I invented a spoon that measured itself. It did not sell. People did not want that much truth from a spoon.",
      "Now I build defences! The watch has adopted none. The Marshal says my spring pike launcher is a danger to the wall. It is. That is the idea.",
    ],
    world: "Everyone is trying to get back to how it was. Nobody is trying to make it better. I am. I have set my eyebrows on fire nine times for this town.",
    detail: "Milo builds improbable defensive inventions in Greyhaven, none of which the watch will use.",
    voices: {
      greeting: [
        "Stand back! No, forward. No, you are fine there. It only goes off if I—never mind.",
        "A field tester! I mean a visitor. Do you have ten minutes and good reflexes?",
        "Do not touch the red lever. Or the other red lever. I have since learned about colour coding.",
      ],
      idle: [
        "Zhenya says my crossbow is an insult to ballistics. It fired round a corner. I call that a feature.",
        "Patch sold me forty springs. I have used thirty-eight. I do not know where two went. That worries me.",
      ],
      farewell: [
        "Go safely! And if you see anything with a spring in it, bring it. I do not care what.",
        "Off you go. Tell me if anything out there explodes. For research.",
      ],
      hint: [
        "A snare trap slows the nearest thing hard. I did not invent it. I am cross about how well it works.",
        "A minigun needs a moment to spin up. I tried to fix that. Do not ask about the shed.",
      ],
      wounded: [
        "Oh dear. That was not one of mine, was it? No. Good. Clinic! East stalls!",
        "Sit on that. No, not that. That is armed. That one. Sit.",
      ],
      reaction: [
        "Magnificent! I am taking notes. Could you do it again, slower?",
        "It worked! I mean, you worked. Well done.",
      ],
    },
  },
  {
    id: "esme-laurent", name: "Esme Laurent", title: "Letter-writer",
    home: "greyhaven", role: "resident", gender: "female",
    look: look("plum", "cream", "s2", "brown"),
    portrait: "Composed woman in her fifties, ink-stained cuffs, portable writing slope on her knees, reading glasses, a discreet knowing smile.",
    ties: ["tomas", "juno"],
    secret: "For a year she has been answering Tomas Reed herself, in Juno's name. Juno reads his letters and never replies, and does not know he believes she does.",
    history: [
      "Legal secretary. Wills, mostly. I have typed more last wishes than a priest has heard.",
      "Half this town cannot write and the other half cannot say it. I do both for them, at the table by the well. I read every reply aloud.",
    ],
    world: "I know who loves whom in Greyhaven, who owes whom, and who is lying to their mother. I keep it shut. It is a great weight and my only vice.",
    detail: "Esme writes and reads letters for Greyhaven's people and keeps everything she learns to herself.",
    voices: {
      greeting: [
        "A letter? Sit. Tell it to me plainly. I will make it sound like you on a good day.",
        "Good morning. Sending or receiving? You have the look of receiving.",
        "Ah. You pass through Hearthglen. I may have three letters for you to carry.",
      ],
      idle: [
        "An old man in Hearthglen writes to his niece here every month. She never answers. I have drafts ready.",
        "I wrote a proposal on Monday and a refusal on Tuesday. Same two people. I charged for both.",
      ],
      farewell: [
        "Go well. If you want something said that you cannot say, I am here till dusk.",
        "Take care. I would hate to write to someone about you.",
      ],
      hint: [
        "Maro travels, so his prices are best. Patch never closes. Tamsin sells what keeps you alive.",
        "Marshal Rowan posts the bounties and pays in gold and keys. Take his work before a stranger's.",
      ],
      wounded: [
        "Oh, no. Sit. I will not be drafting that letter. Clinic, quickly.",
        "You are pale as paper. Somebody fetch the doctor.",
      ],
      reaction: [
        "Now that is worth writing home about. Shall I?",
        "Lovely. I shall put it in someone's letter, with your leave.",
      ],
    },
  },
  {
    id: "billie-nwosu", name: "Billie Nwosu", title: "Watch recruit",
    home: "greyhaven", role: "guard", gender: "female",
    look: look("navy", "brass", "s8", "black"),
    portrait: "Slight young woman of eighteen, braids tucked under a watch helmet a size too big, spear held very correctly, jaw set, eyes enormous.",
    ties: ["inga-varga", "frida-hart", "lorcan-reddy"],
    secret: "On her third night she saw a sentry slip off the north stretch and said nothing. It was Lorcan Reddy. She washes up beside him at the Fourth Bell on her off nights and has not let on.",
    history: [
      "I was at school. Sixth form. I was going to do veterinary science. I had the grades. I had a place.",
      "I joined the watch on my eighteenth birthday. Tonight is my ninth night on the wall. I was sick the first eight. The Sergeant says that is normal.",
    ],
    world: "Everybody on the wall is frightened. The old ones are only better at standing still while they do it. I am learning the standing still.",
    detail: "Billie is the newest recruit on Greyhaven's wall and is determined not to show how afraid she is.",
    voices: {
      greeting: [
        "Halt! Who—oh. Sorry. I am supposed to say halt. Was that a good halt?",
        "You have been out there. Properly out there. Is it—no. Tell me after my shift.",
        "Good evening. I am on duty. I am fine. I am absolutely fine.",
      ],
      idle: [
        "In for four, hold for four, out for four. The Sergeant taught me. It works till something moves.",
        "I was going to be a vet. Frida lets me help with the dogs. That is the good hour of my day.",
      ],
      farewell: [
        "Come back through the west gate. I will be the one saying halt. Badly.",
        "Be safe. I mean it more than most people who say it.",
      ],
      hint: [
        "Sergeant Varga says shoot the spitter first, then deal with the slow ones.",
        "They say a dog will fight beside you and grow stronger as it goes. I would have one if I could.",
      ],
      wounded: [
        "You are hurt! I did the first aid course. Sit. Sit, please. I will walk you to the clinic.",
        "That is a lot of blood. I am not going to be sick. I am not. Lean on me.",
      ],
      reaction: [
        "You make it look like it is not frightening. Is it? Do not answer.",
        "I am going to remember that. When it is my turn.",
      ],
    },
  },
  {
    id: "stellan-ward", name: "Stellan Ward", title: "Retired gate-counter",
    home: "greyhaven", role: "storyteller", gender: "male",
    look: look("wheat", "copper", "s2", "white"),
    portrait: "Spry one-legged man in his seventies, conductor's cap still on, crutch across his lap, whittling knife and a half-carved peg, twinkling eyes.",
    ties: ["rowan", "tamsin"],
    secret: "The true count was three hundred and thirteen. The last through was a young woman in a captain's coat far too big for her. Rusk had told him: do not write her down.",
    history: [
      "Tram conductor, forty years. Tickets, please. I could count a full car at a glance and know who had not paid.",
      "On evacuation night Constable Rowan and I counted the west gate. Three hundred and twelve living. I lost the leg to the crush, not the dead. Feet.",
    ],
    world: "People ask how many Rusk saved. Three hundred and twelve. People ask how many he shut in. Nobody counted those. That is the whole argument.",
    detail: "Stellan counted the survivors through the west gate on evacuation night and still remembers the number.",
    voices: {
      greeting: [
        "Tickets, please. Hah. Sit down. Mind the crutch.",
        "You are the one that goes out. Good. Somebody ought to. I would, but I am a leg short.",
        "Ah. A fresh pair of ears. Mine have heard all my stories.",
      ],
      idle: [
        "Three hundred and twelve. I whittle a peg for each. I am on two hundred and ninety. Good wood is scarce.",
        "The Marshal comes by on Sundays. He does not talk. He counts my pegs. So do I.",
      ],
      farewell: [
        "Mind the gap. Forty years I said that. It is still good advice.",
        "Off you go. Come back and be counted.",
      ],
      hint: [
        "The Regent walks the old tram loop. I drove that loop. He keeps better time than I did.",
        "On the market road, stay behind the overturned tram when the Regent passes. Solid car, that one.",
      ],
      wounded: [
        "Take the weight off. I know what a bad leg looks like before the owner does.",
        "That wants the clinic, and you want my crutch to get there. Take it.",
      ],
      reaction: [
        "Well done. That is one for the count.",
        "I shall whittle that one a little taller.",
      ],
    },
  },
  {
    id: "okon-bassey", name: "Okon Bassey", title: "Wall drummer",
    home: "greyhaven", role: "entertainer", gender: "male",
    look: look("rust", "cream", "s7", "grey"),
    portrait: "Broad smiling man in his fifties, drumsticks through his belt, goatskin drum slung at his hip, grey in his beard, fingers always tapping.",
    ties: ["billie-nwosu", "tobin-greaves"],
    secret: "He has noticed the hordes beyond the wall move to a slow pulse, exactly nineteen minutes apart. Without meaning to, he has started drumming it in his sleep.",
    history: [
      "Session drummer. Weddings, jingles, one record you would know and I am not on the sleeve.",
      "The wall is two miles round and a shout dies in forty yards. So I drum. One beat, all well. Two, look east. A roll means run to the gate.",
    ],
    world: "The dead have no rhythm. That is how you know them in fog. Listen for the thing that is not keeping time.",
    detail: "Okon signals along Greyhaven's wall by drum and can tell the dead from the living by their step.",
    voices: {
      greeting: [
        "You walk in four-four. Steady. I like that. Most of the watch walks like a dropped tray.",
        "Ah! The off-beat. Welcome. Sit. Tap something.",
        "Hear that? North stretch, one beat. All well. Now you may talk.",
      ],
      idle: [
        "The new recruit taps her spear when she is frightened. Very fast. I drum along. It helps her.",
        "I played on a hit once. Nobody knows. I hum it on the wall and the lamplighter joins in flat.",
      ],
      farewell: [
        "Go well. If you hear a roll from the wall, run home.",
        "Keep time out there. Fast is fine. Ragged gets you killed.",
      ],
      hint: [
        "Imps in the Wastes circle, stop, then spit fire. It is a rhythm. Move when they stop.",
        "A troll lifts before it slams and marks the ground where it lands. Count one and be elsewhere.",
      ],
      wounded: [
        "Your pulse is all over the bar. Clinic. I will drum you a path through the market.",
        "Breathe on my count. One. Two. There. Now down, slowly.",
      ],
      reaction: [
        "Ha! Right on the beat.",
        "Tight. Very tight. I would play with you.",
      ],
    },
  },
];
