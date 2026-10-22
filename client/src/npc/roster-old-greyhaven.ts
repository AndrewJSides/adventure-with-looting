// Old Greyhaven: the ruined city. Officially empty. These are the people who
// never left, each for a reason they would rather not explain.

import { look, type RosterNpc } from "./types";

export const OLD_GREYHAVEN_ROSTER: RosterNpc[] = [
  {
    id: "ruth-hesketh", name: "Ruth Hesketh", title: "Keeper of the Arcade cellar",
    home: "old-greyhaven", role: "cook", gender: "female",
    look: look("clay", "cream", "s1", "silver"),
    portrait: "Stout motherly woman in her seventies, tea-stained apron, grey bun, kettle in hand, wary eyes softened by a lifetime of smiling at customers.",
    ties: ["teo-ruiz", "nia"],
    secret: "Her stock cellar joins, through a bricked arch she has never opened, to a Civic Works service tunnel. At night something on the far side taps in a rhythm.",
    history: [
      "I ran the tea counter in the Market Arcade for thirty-four years. Two sugars, love, mind the step. I knew every stallholder's troubles.",
      "When they shut the gates I went down to the stock cellar and stayed. There are nine of us eating from it now. We keep the kettle on, quietly.",
    ],
    world: "They think nobody lives here. Good. A place nobody lives in does not get searched, by the watch or by anything else.",
    detail: "Ruth keeps a hidden soup cellar under the Market Arcade for the ruins' last holdouts.",
    voices: {
      greeting: [
        "Shh. Down, quick, mind the step. There. Now. Tea?",
        "You are not one of his. You are too clean. Well. Clean enough. Sit.",
        "Who sent you? No, do not say. If I do not know, I cannot tell.",
      ],
      idle: [
        "Nine bowls tonight. Twelve at midsummer. I do not ask where people go. I only wash the bowl.",
        "Somebody leaves a crate at the milepost each month. Flour, candles. No note. Bless whoever it is.",
      ],
      farewell: [
        "Up the back stair, and count to twenty before you open the door.",
        "Go quietly, love. And come back hungry.",
      ],
      hint: [
        "He passes the Arcade and circles back after a fight. Stay in the rubble till the second pass.",
        "The three gold-marked caches by the old market are the pharmacy, the lockers and the vault.",
      ],
      wounded: [
        "Oh, you poor lamb. Down here. On the sacks. I have clean rags and a kettle.",
        "Do not dare bleed out on my stair. Sit. Press. I am getting the box.",
      ],
      reaction: [
        "There is a good soul. Have the last of the sugar.",
        "Well done, love. That is nine people who eat this week.",
      ],
    },
  },
  {
    id: "luka-novak", name: "Luka Novak", title: "Driver of the stalled tram",
    home: "old-greyhaven", role: "resident", gender: "male",
    look: look("navy", "brass", "s2", "grey"),
    portrait: "Wiry man in his fifties with a grey moustache, threadbare driver's uniform, cap badge polished bright, rag in hand, a devoted haunted stare.",
    ties: ["nia", "stellan-ward"],
    secret: "He has the tram's motor turning on scavenged batteries. He could drive it. He will not, because the bell would bring the Regent and he cannot bear to be why she is wrecked.",
    history: [
      "Tram driver. The loop line, number six. Eighteen stops, forty minutes round, twenty-two years. I knew that loop like my own pulse.",
      "She stopped at Civic Square with the doors open and I never left her. I sleep in the cab. I keep her brass polished. She will run again.",
    ],
    world: "The Regent walks my loop now. Same stops, same order. He keeps my timetable better than the company ever did. I hate him most for that.",
    detail: "Luka lives in a stalled tram on the old loop and knows the Rust Regent's patrol to the minute.",
    voices: {
      greeting: [
        "Mind the doors. Hah. Mind them anyway. They stick.",
        "Hold tight, please. No? Nobody says it back anymore.",
        "Step aboard, quick. He is due at this stop in six minutes.",
      ],
      idle: [
        "Brass is done. Windows tomorrow. She has to be ready. You never know the day until it is the day.",
        "He missed the Arcade stop yesterday. First time in four years. Something drew him off the line.",
      ],
      farewell: [
        "Cross the loop behind him, never in front. He does not look back.",
        "This service terminates here. All change. Go safely.",
      ],
      hint: [
        "The Regent walks the tram loop stop by stop. Cross between his passes, never along the rails.",
        "After a fight he swings wide and returns. Break his sight in the rubble and wait him out.",
      ],
      wounded: [
        "Sit. Priority seat. That is what it is for. I keep a first aid tin under the dash.",
        "You are bleeding on my floor and I only did it Tuesday. Sit. Press on it.",
      ],
      reaction: [
        "Right on time. Beautiful.",
        "Now that is good service. I would give you a transfer.",
      ],
    },
  },
  {
    id: "wes-reed", name: "Wes Reed", title: "Chalk-bird scavenger",
    home: "old-greyhaven", role: "scavenger", gender: "male",
    look: look("char", "bone", "s3", "brown"),
    portrait: "Lean unshaven man in his thirties, chalk-white fingertips, hood up, a stub of chalk on a string round his neck, eyes that will not hold yours.",
    ties: ["juno", "nia", "hyacinth-poole", "pim"],
    secret: "The shelter door he opened held forty people. He opened it for a voice he took for a child's. Two got out. One of them is the boy Pim.",
    history: [
      "Sign painter. Shop fronts, mostly. Gold leaf on glass. My sister said it was a waste of a steady hand. She was the one on the roofs.",
      "I chalked a bird on every safe landing so Juno would know the way. Then I opened a shelter door I should not have. I have not gone home since.",
    ],
    world: "She thinks I am dead. That is kinder than what I did. I still draw the birds. It is the only true thing I have left to say to her.",
    detail: "Wes marks safe routes through Old Greyhaven with chalk birds and will not go back to the city.",
    voices: {
      greeting: [
        "Do not say my name loud. Do not say it at all, if you have come from Greyhaven.",
        "You followed the birds. Then somebody taught you to look up. Who?",
        "Stay on the landing. The stair below is not safe. I have not marked it.",
      ],
      idle: [
        "Nine birds on the east escapes now. I added one. I should not have. She will count.",
        "I tied a note to a pigeon. Twice. I do not know why. I burned the third.",
      ],
      farewell: [
        "Follow the birds out. Where they stop, you stop.",
        "If you see a woman on the roofs with a quick step, you did not see me.",
      ],
      hint: [
        "A chalk bird means the landing is safe. Blue chalk is searched, white is danger. Those are not mine.",
        "Gold salvage markers stay bright until emptied. I leave the easy ones for whoever comes after.",
      ],
      wounded: [
        "You are dripping down three floors. They will follow that. Here. Bind it. Tight.",
        "Sit against the wall. Not that wall. The one with the bird.",
      ],
      reaction: [
        "That was clean. She would have liked that.",
        "Huh. You are better at this than I was.",
      ],
    },
  },
  {
    id: "colette-brun", name: "Colette Brun", title: "Arcade pharmacist",
    home: "old-greyhaven", role: "healer", gender: "female",
    look: look("slate", "frost", "s1", "white"),
    portrait: "Stern woman in her sixties behind a barred dispensary hatch, white coat yellowed, brass pill knife, spectacles low on her nose.",
    ties: ["alden", "bria", "tess-adeyemi"],
    secret: "She has one full course set aside, labelled for A. Cross. Alden has a slow infection he hides, and she has not found a way to make him take it.",
    history: [
      "Dispensing chemist. Brun and Daughter, by the Arcade. I was the daughter. I counted tablets by fives with a little brass knife.",
      "I locked the shop the first night and have not unlocked it. I ration what is left. One course to a person. I do not refill. I cannot.",
    ],
    world: "Everyone who comes here wants the same four things. I have two of them left. I have decided who gets them. I will not tell you how.",
    detail: "Colette guards what remains of the Arcade pharmacy and decides who is treated.",
    voices: {
      greeting: [
        "Through the hatch, please. I do not open the door. State the symptom, not the drug.",
        "You are not sick. You are looting. I can tell. The sick do not look at the shelves first.",
        "Good. A living customer. Do not mistake that for welcome.",
      ],
      idle: [
        "Forty-one courses of antibiotic. After that it is willow bark and prayer, and I am not religious.",
        "A girl comes down from the station asking after a cough that is not hers. I am waiting for her to say so.",
      ],
      farewell: [
        "Finish the course. All of it. Even when you feel well.",
        "Go. And if you empty that gold marker out front, leave what is behind the counter.",
      ],
      hint: [
        "The gold marker on my shopfront is the pharmacy cache. Take it. It is why your runners come.",
        "Burns and ember sickness need a proper purge. A doctor in Greyhaven does it. I only slow them.",
      ],
      wounded: [
        "Sit on the step. Hand through the hatch. Let me see. Hm. That I can dress.",
        "You are bleeding and I am rationing. Fortunately, bandage I have. Hold still.",
      ],
      reaction: [
        "Correct. And you did not argue. Rare.",
        "I shall mark you as worth a second course.",
      ],
    },
  },
  {
    id: "horatio-pym", name: "Horatio Pym", title: "Bailiff of Civic Hall",
    home: "old-greyhaven", role: "official", gender: "male",
    look: look("wine", "brass", "s1", "white"),
    portrait: "Portly man in his sixties in a moth-eaten bailiff's gown, staff of office, chin raised, immense wounded dignity.",
    ties: ["nia"],
    secret: "Folded in his docket is the one warrant signed on the day of the fall: for the arrest of Captain Rusk, on a charge of unlawful experiment. It was never served.",
    history: [
      "Court bailiff. All rise. I said it eleven thousand times and every time, they rose. You do not forget power like that.",
      "The court was never adjourned. Nobody with authority adjourned it. So I open the doors at nine and wait for the bench. That is the law.",
    ],
    world: "There is a great deal of trespass and affray out there, and not one summons served. When the judges return there will be a reckoning. I keep the list.",
    detail: "Horatio still opens Civic Hall's courtroom every morning and keeps a list of the city's unanswered crimes.",
    voices: {
      greeting: [
        "All rise. Oh. You are risen. Good. State your business with the court.",
        "Are you counsel? You do not look like counsel. Sit in the public gallery.",
        "Silence in—well. It is silent. Carry on.",
      ],
      idle: [
        "Miss Mercer was my records clerk. She has taken a ledger off the premises. I have noted it. Leniently.",
        "Docket item one: the matter of the east gate. Adjourned, pending a defendant who can stand.",
      ],
      farewell: [
        "The court is in recess. Do not leave the jurisdiction. Well. Try not to.",
        "You are released on your own recognisance. Go carefully.",
      ],
      hint: [
        "The Records Vault lies east of Civic Square. It is evidence. Search it, by all means.",
        "The Regent's seal carries a spiral. I have seen its like stamped on Civic Works orders.",
      ],
      wounded: [
        "Order! You are bleeding in a court of law. Bailiff! Oh. That is me. Sit down.",
        "The court will rise while the witness is seen to. Sit. Press on it.",
      ],
      reaction: [
        "Let the record show it was well done.",
        "The court thanks you. That used to mean a great deal.",
      ],
    },
  },
  {
    id: "dag-ulrich", name: "Dag Ulrich", title: "Motor Pool mechanic",
    home: "old-greyhaven", role: "tinker", gender: "male",
    look: look("char", "ember", "s2", "grey"),
    portrait: "Thickset man in his fifties, oil-black overalls with a faded civic crest, socket wrench in his fist, grey buzz cut, suspicious squint.",
    ties: ["alden"],
    secret: "The sixth van is in the back bay under a tarpaulin. Its cargo cage is torn open from the inside, and he has welded a plate over the spiral stamped in its floor.",
    history: [
      "Fleet mechanic for the city. Bin lorries, gritters, the mayor's car. If it had a civic crest and an engine, it came through my bay.",
      "I stayed with the Motor Pool. Sixty vehicles and I can start four. There is a crate by the east wall I was told to keep locked. I still do.",
    ],
    world: "People walk in here wanting a way out. I tell them the truth. There is fuel for one trip and no road that finishes it.",
    detail: "Dag guards the Old Greyhaven Motor Pool and the locked crate by its east wall.",
    voices: {
      greeting: [
        "Hold it. Hands off the bonnets. Some of them bite. Dead batteries, live wires.",
        "You are after the crate. Everyone is after the crate. Got a key? Then we can talk.",
        "Hm. Somebody who knows a wrench from a spanner, by the look. Come in.",
      ],
      idle: [
        "Got the gritter turning over this morning. Ran ninety seconds. Best ninety seconds this year.",
        "Civic Works took six vans the week before. Unmarked. Brought back five. Never logged the sixth.",
      ],
      farewell: [
        "Mind the pit. It is deeper than it looks and it is full of things.",
        "If you find a fan belt, any fan belt, I will owe you my life.",
      ],
      hint: [
        "The locked crate sits against the east wall. It wants a key, and it is worth one.",
        "Elites out here carry better steel than the meadow ones. A firefighter's axe, if you are lucky.",
      ],
      wounded: [
        "Oi. Sit on the tyre stack. I have a kit. It is for burns, but it will do.",
        "You are leaking worse than the gritter. Sit down.",
      ],
      reaction: [
        "Now that is a proper job.",
        "Sweet as a nut. Well done.",
      ],
    },
  },
  {
    id: "tess-adeyemi", name: "Tess Adeyemi", title: "Signal-lamp apprentice",
    home: "old-greyhaven", role: "scout", gender: "female",
    look: look("ochre", "sky", "s7", "black"),
    portrait: "Bright-eyed young woman of eighteen, railway lamp in one hand, soot on her forehead, oversized stationmaster's coat with the sleeves rolled.",
    ties: ["alden", "colette-brun"],
    secret: "She walks to the Arcade pharmacy alone at night to beg medicine for Alden and cannot bring herself to say it is for him. Colette has the course ready and is waiting.",
    history: [
      "I was fourteen. I was on the last train that did not leave. Mister Cross pulled eleven of us out of the carriage through a window.",
      "I am one of his twenty-seven. I stayed to keep the lamps with him. He says I should go to Greyhaven. I say who would trim the wicks.",
    ],
    world: "Everybody he saved left. I understand why. But somebody has to be here when the next person comes down that track in the dark.",
    detail: "Tess tends the signal lamps at the south platform with Alden and watches the tracks for survivors.",
    voices: {
      greeting: [
        "Hello! Quietly. Hello. Did you come by the track or the street? Track is better.",
        "You saw the lamp. Good. That means I trimmed it right.",
        "Mister Cross is resting. I can help. I know all the crossings he knows. Nearly all.",
      ],
      idle: [
        "He counts to twenty-seven every night. I am number nineteen. I like being nineteen.",
        "He coughs when he thinks I am asleep. He will not see the chemist. I am working on it.",
      ],
      farewell: [
        "South crossing, not the tunnel. He says it every time, so I am saying it.",
        "If the lamp goes dark, get off the avenue. I will relight it as fast as I can.",
      ],
      hint: [
        "Streetlights mark the wide roads, and the Regent hunts those after dusk. Use the side streets then.",
        "Never the tunnel. The south crossing is the safe way out of the blocks.",
      ],
      wounded: [
        "Oh! Sit on the bench. I have the kit. Mister Cross taught me. Hold still. I am quite good.",
        "That is bad. I am not scared. Press here. I am getting him.",
      ],
      reaction: [
        "That was brilliant. I am telling him when he wakes.",
        "Twenty-eight. If you count. I am counting.",
      ],
    },
  },
  {
    id: "jem-tiller", name: "Jem Tiller", title: "High-floor scavenger",
    home: "old-greyhaven", role: "scavenger", gender: "female",
    look: look("moss", "ash", "s3", "dark"),
    portrait: "Rangy woman in her thirties, long dark hair tied up in a climbing scarf, harness worn over rags, rope coiled across her chest, head tilted as if listening to someone beside her.",
    ties: ["luka-novak"],
    secret: "Ro is not dead. Her twin brother walks in the Regent's patrol now, round the tram loop under Jem's ledge every forty minutes. Jem lowers the peach tin on a rope each dusk.",
    history: [
      "We were window cleaners. Me and Ro. Twins. High-rise work, cradle and rope. We were never once afraid of heights. No. Never.",
      "Ro went into the lockers for a tin of peaches and I held the rope. Some nights I am still holding it. I say we out of habit. It is not habit.",
    ],
    world: "We know every ledge in the east blocks. I know. I know every ledge. It is quieter with one. You would think that was better for the work.",
    detail: "Jem scavenges the high floors of Old Greyhaven alone and still speaks for two.",
    voices: {
      greeting: [
        "We saw you coming. I saw. Up here. Third floor. Mind the—yes. That.",
        "You are loud on stairs. Ro always said—well. You are loud on stairs.",
        "Got rope? We could use rope. I could. It is the same thing.",
      ],
      idle: [
        "Peaches. That is what it was for. I found the tin, after. I have not opened it.",
        "We do the tall ones. Nobody else will. I do. The view is the same.",
      ],
      farewell: [
        "Go down the outside. Inside stairs are for people who want to meet something.",
        "We will watch you out. I will. From the ledge.",
      ],
      hint: [
        "The transit lockers hold a gold-marked cache. Machine parts and worse. Be quick in there.",
        "High ground does not stop a spitter. They reach. Break their sight instead.",
      ],
      wounded: [
        "You are hurt. Sit. We have a kit. I have. Ro packed it. It is a good kit.",
        "Do not look down while you bleed. Look at me. Press there.",
      ],
      reaction: [
        "We could not have done that better. I could not.",
        "Good. Ro would have—good.",
      ],
    },
  },
  {
    id: "emmett-doyle", name: "Emmett Doyle", title: "Sentry of the east lock",
    home: "old-greyhaven", role: "guard", gender: "male",
    look: look("navy", "ash", "s2", "silver"),
    portrait: "Ramrod-straight man in his sixties in a faded city-watch greatcoat, sergeant's stripes resewn many times, halberd grounded, weathered granite face.",
    ties: ["rowan", "edda", "mateus-braga"],
    secret: "He was given a second order that night and has never been able to obey it: if she comes back, let her through. He does not know who she is. The gate is ready to open from his side.",
    history: [
      "City watch, twenty-six years. Sergeant under Captain Rusk for the last nine. He was not a warm man. He was a correct one.",
      "He sealed the east gate and went back in with the key. His last order to me was to watch the lock. Nobody relieved me. So I watch the lock.",
    ],
    world: "They argue in Greyhaven whether he was right. I was there. He did not think he was right. He thought he was out of time. Those are different.",
    detail: "Emmett has guarded the sealed east gate of Old Greyhaven since the night Captain Rusk locked it.",
    voices: {
      greeting: [
        "Halt. This gate is sealed by order. I do not expect you to respect that. I expect you to hear it.",
        "You have come from the new town. Does Rowan still count names? Good. He was always a counter.",
        "Stand easy. I have had no relief in four years. I am not going to start on you.",
      ],
      idle: [
        "The lock is warm. It has been warm four years. Iron does not hold heat that long. I report it to no one.",
        "He walks past this gate every night and stops. He does not try it. He only stands. Then he goes.",
      ],
      farewell: [
        "Dismissed. Leave by the south. Never by the tunnel.",
        "Go. And tell the Marshal the east gate holds. He will know who sent it.",
      ],
      hint: [
        "The Regent circles wide after a fight and comes back. Never stand where you last fought him.",
        "What he carried to this gate was a key, and not for the gate. Ask the storyteller in Greyhaven.",
      ],
      wounded: [
        "You are wounded. Sit against the gate. It is the safest wall in this city. I have a field dressing.",
        "That is an order: sit down. I outrank you. I outrank everyone left.",
      ],
      reaction: [
        "Well executed. The Captain would have nodded. That was his whole vocabulary of praise.",
        "I will enter it in the log. Favourably.",
      ],
    },
  },
  {
    id: "sprocket", name: "Sprocket", title: "Locker-dwelling parts trader",
    home: "old-greyhaven", role: "child", gender: "female",
    look: look("steel", "ember", "s4", "dark"),
    portrait: "Grimy girl of thirteen with a messy ponytail, too-big boiler suit, welding goggles on her forehead, screwdriver behind one ear, chin out, daring you.",
    ties: ["patch", "luka-novak"],
    secret: "Locker forty-three is not wired. It holds a school satchel with the name Nera Rusk inked inside the flap, and a spiral drawn in a child's hand.",
    history: [
      "Before? School. Did not like it. I liked taking the clock apart. They did not like that.",
      "I live in the transit lockers. Forty to forty-six. I knocked the walls through. I sell parts to the junk lady. She cheats. I cheat back.",
    ],
    world: "The grown-ups up at the wall think the city is all dead. It is not all dead. It is mostly parts. You only have to know which bits still go.",
    detail: "Sprocket lives in Old Greyhaven's transit lockers and trades salvaged machine parts.",
    voices: {
      greeting: [
        "Oi. That is my locker. That one is too. Those are all mine.",
        "You buying or nicking? Nicking costs more.",
        "You are the one the runners talk about. You are shorter than they said.",
      ],
      idle: [
        "Got a motor going off a tram battery. Ran my lamp for a week. Then the tram man took the battery back.",
        "Junk lady gives me two coins for a thing she sells for nine. I know. I let her. She gives me soup.",
      ],
      farewell: [
        "Do not touch forty-three on your way out. It is wired. Mostly.",
        "Bring me a magnet. A big one. I will give you something good.",
      ],
      hint: [
        "The gold marker on the lockers is the cache. I left it. It is too heavy for me. Take it.",
        "The junk lady in Greyhaven buys anything and never shuts. The other one pays more, but he moves about.",
      ],
      wounded: [
        "You are bleeding. Gross. Sit on that crate. I have tape. It is electrical tape, but it sticks.",
        "Do not die in my lockers. I only just got the smell out.",
      ],
      reaction: [
        "Not bad. For a grown-up.",
        "All right. That was good. I am not saying it twice.",
      ],
    },
  },
];
