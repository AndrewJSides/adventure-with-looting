// Dialogue for the 31 people in the game.
//
// What changed, and what deliberately did not:
// - Every voice pool is now at least 4 greetings and 3 of everything else.
//   Nineteen of the original cast previously had ONE line per voice, so they
//   said the same sentence every time you spoke to them.
// - The four Blackwater Bay people (Marsh, Cobb, Sel, the Drowned Preacher)
//   keep every line Muse wrote and gain more around them. Mira and Dr. Hale
//   were already full and are copied unchanged apart from a few extra lines
//   for Dr. Hale.
// - `detail` strings are untouched: they describe what the NPC does in the UI.
// - Every hint that carried a real instruction (a quest step, a location, a
//   mechanic) is preserved in substance. Hints are true; players act on them.
// - Lines that were already good are kept verbatim.
// - Only the existing cast and established places are named here, because
//   these lines go live. Nobody from the unseeded roster is mentioned.
//
// Canon decisions worth knowing about (each is two lines to undo):
// - Hearthglen had two Tomases. Mara's husband held the south gate and died
//   there; Tomas Reed the gardener drew the long straw and lived. They are not
//   related: the portraits show two people of one generation, so father and
//   son would not read. The shipped game named both men Tomas, unexplained.
// - Juno Reed is Tomas Reed's niece. Same surname, previously unconnected.
// - Tamsin Vale and Father Vale are sister and brother. Same again.
// - Elowen's family died at the east gate. That is the gate Captain Rusk
//   sealed, which is why she distrusts the veiled stranger without knowing why.
// - The Veiled One is foreshadowed through doors and gates only. Nothing here
//   states who she is; that reveal belongs to chapter IV.
// - Everyone is clearly a man or a woman (see look.ts). Three had read as
//   either: Lark is a young man, Patch Merrin is a woman, Tide Runner Sel is a
//   woman. The Veiled One is a woman because the game's own chapter IV text
//   makes her Nera Rusk, Captain Rusk's daughter.

import type { NpcProfile } from "./types";

export type CastNpcId =
  | "mara" | "maro" | "elowen" | "orin" | "kael" | "sable" | "rowan" | "tamsin"
  | "juno" | "vale" | "bria" | "tomas" | "rook" | "ysra" | "fen" | "lark"
  | "alden" | "nia" | "cora" | "ilyan" | "patch" | "edda" | "lio" | "suri" | "veiled"
  | "marsh" | "cobb" | "sel" | "preacher" | "mira" | "imogen";

export const CAST_DIALOGUE: Record<CastNpcId, NpcProfile> = {
  // ---------------------------------------------------------------- Hearthglen
  mara: {
    history: [
      "I was a field nurse on a road-clearing crew. I learned triage in a truck bed, so very little here frightens me. Running out of thread does.",
      "My husband Tomas held the south gate the first night. I was forty steps away with my hands in someone else. The other Tomas plants onions where he fell.",
    ],
    world: "A settlement survives on more than walls. It survives because someone remembers the fever medicine, the clean bandages, and who has not eaten.",
    detail: "Mara can restore your health and refill your flasks.",
    voices: {
      greeting: [
        "Come here. Let me see what the road did to you.",
        "You are breathing. That is a good place to start.",
        "Sit a moment. Hearthglen can hold without you.",
        "Back from the tree line? I kept a needle threaded.",
      ],
      idle: [
        "Boil the water twice. Once is how people die.",
        "Fresh bandages on the west shelf.",
        "Tomas Reed brings me onions and pretends it is not a visit.",
        "My Tomas used to whistle when the gates were quiet. I still listen for it.",
      ],
      farewell: [
        "Keep pressure on anything that starts bleeding.",
        "Come back before brave turns into foolish.",
        "The lamp stays lit for you.",
      ],
      hint: [
        "Red hearts mend flesh, but only a proper rest refills your flasks.",
        "Armor matters most when the big dead get close.",
        "The dead hunt in packs after dark. If you are already hurt at dusk, come home.",
      ],
      wounded: [
        "That blood is yours. Sit down.",
        "You are held together by stubbornness. Let me help.",
        "One more hit like that and Orin will be fitting a coffin.",
      ],
      reaction: [
        "Good. Take a full breath before you go.",
        "There. Stitched, cleaned, and still alive.",
        "Tomas would have called that a fighting chance.",
      ],
    },
  },
  elowen: {
    history: [
      "I learned the bow in the old city, shooting bottles off our apartment roof. When the evacuation failed, the rooftops became the only roads left.",
      "My family ran for the east gate. It was sealed before they reached it. I watched from a roof until the street filled three bodies deep.",
    ],
    world: "Strangers make noise, promise safety, then leave gates open. I trust tracks, wind, and what I can see through a sight.",
    detail: "Elowen watches the borders and knows where the dead gather.",
    voices: {
      greeting: [
        "Hands where I can see them. Yes, even here.",
        "You came back alone. That can mean skill or trouble.",
        "Keep your voice down. Sound carries past the palisade.",
        "I saw your tracks before I saw you.",
      ],
      idle: [
        "Three dead north of the creek. Maybe four.",
        "Wind is wrong today.",
        "The old city still burns after rain.",
        "That veiled one by your house stands like a sentry. I have not decided whose.",
      ],
      farewell: [
        "Watch the roofs as often as the road.",
        "Step softly. Come back loudly.",
        "If the birds stop, you stop.",
      ],
      hint: [
        "Spitters hide behind the slow ones. Break their line of sight.",
        "Scout the edge of a biome before cutting through its center.",
        "Fog hides terrain, not consequences.",
      ],
      wounded: [
        "You are leaking a trail anything can follow.",
        "Mara. Now. I will cover you.",
        "You look worse than the dead I passed at dawn.",
      ],
      reaction: [
        "Good. You listened.",
        "That is one less mistake waiting outside.",
        "I will mark the safer route.",
      ],
    },
  },
  orin: {
    history: [
      "I forged hinges, plows, and wedding rings before the outbreak. Then every order became blades, bars, or nails for coffins.",
      "A brute crushed my left shoulder at the north forge. I can still read a flame better than anyone living. I just need Kael's arms to answer it.",
    ],
    world: "Steel does not care whether you are scared. Heat it right, strike it true, and it becomes what you need.",
    detail: "Orin tempers weapons and reinforces armor with recovered materials.",
    voices: {
      greeting: [
        "Set it on the bench. If it rattles, I can fix it.",
        "You again. Good. Means the last work held.",
        "Do not touch the tongs unless you want fewer fingers.",
        "Let me guess—the road hit back.",
      ],
      idle: [
        "Quench too fast and the steel turns brittle.",
        "Kael! Coal first, questions second.",
        "Used to make horseshoes. Miss the horses.",
        "I made Mara's wedding ring. And the coffin nails, after.",
      ],
      farewell: [
        "Keep the edge dry.",
        "Bring it back before it breaks, not after.",
        "Steel between you and teeth. Remember that.",
      ],
      hint: [
        "The heavy dead punish weak armor twice over.",
        "Relic steel holds an edge no village forge can copy.",
        "Save your keys for iron and gold.",
        "Cora Flint in Greyhaven works hotter steel than I ever did. Do not tell Kael I said so.",
      ],
      wounded: [
        "Mara first. Forge second.",
        "No point sharpening steel for a corpse.",
        "You look like a hammer found you.",
      ],
      reaction: [
        "That will bite harder now.",
        "Good steel. Better than when you brought it.",
        "Try not to lose it in a zombie.",
      ],
    },
  },
  kael: {
    history: [
      "I was twelve when Orin pulled me out of a collapsed bus. Been following him around the forge ever since.",
      "He says I rush the hammer. I do. I just want to make something strong enough that nobody else has to be pulled from wreckage.",
    ],
    world: "I keep count of your kills when the watch talks about them. One day I will go past the gates and earn a story like yours.",
    detail: "Kael is eager for field stories—and occasionally notices things the veterans miss.",
    voices: {
      greeting: [
        "You came back! I mean—of course you did.",
        "Can I see the weapon? Just for a second?",
        "Orin says not to bother you. Is this bothering you?",
        "Was that you shooting beyond the ridge?",
      ],
      idle: [
        "Grip lower. Strike once. No—twice.",
        "One day I am going past that gate.",
        "I nearly made a perfect hinge today.",
        "Orin pretends not to worry when you leave. He sweeps the same spot for an hour.",
        "They say Cora Flint can fold relic steel. I want to see that before I die. Not soon. Just before.",
      ],
      farewell: [
        "Come back with a story. A true one.",
        "I will have something better forged next time.",
        "Watch your back out there. I mean it.",
      ],
      hint: [
        "The fast zombies turn wide when they charge.",
        "I heard scratching under the locked chests. Maybe rats. Big rats.",
        "The ordinary dead wander back after a while. Most of the big named ones stay dead.",
      ],
      wounded: [
        "Mara! They are hurt—really hurt!",
        "You cannot go back out like that.",
        "Please sit down. Heroes can sit down.",
      ],
      reaction: [
        "You actually used something we made!",
        "That looked incredible.",
        "I knew you could do it.",
      ],
    },
  },
  tomas: {
    history: [
      "I grew apples before the dead. Forty acres. Now I grow onions, because onions survive neglect and panic. So do the wrong men, it turns out.",
      "There were two Tomases here. We drew straws for the south gate the first night. I kept the long one. The first garden grew in helmets. His is third from the post.",
    ],
    world: "The village is safest at the center. Beyond the west fence, chargers use the road like a spear lane.",
    detail: "Tomas knows Hearthglen's food stores and the safer village approaches.",
    voices: {
      greeting: [
        "Mind the seedlings. They bite less than everything else.",
        "Ah, good. Hands. I have a row that needs turning.",
        "You have the look of someone who skipped breakfast and fought something.",
        "Careful on the left. That is garlic, and it is the last of it.",
      ],
      idle: [
        "Rain soon. The worms know.",
        "Mara pretends she comes for the onions. I pretend I believe her.",
        "My brother's girl is up in Greyhaven. Juno. I write. She climbs roofs, they tell me.",
      ],
      farewell: [
        "Bring back seeds if you see any.",
        "Walk the center path out. The edges are for chargers.",
        "Come back hungry. It means you are alive.",
      ],
      hint: [
        "Chargers turn wide. Step sideways late, not early.",
        "Keep the raw meat you find. A cook fire turns two cuts into a proper healing meal.",
        "Rest when you can. A rest puts back what a flask spends.",
      ],
      wounded: [
        "Mara has cleaner hands than mine.",
        "Sit down before you fall on the beans.",
        "Go to Mara. Tell her I sent you. She likes being right about my worrying.",
      ],
      reaction: [
        "Good soil rewards patience.",
        "There now. That is how a thing gets done.",
        "The other Tomas would have liked you. He liked anybody who finished a job.",
      ],
    },
  },
  veiled: {
    history: [
      "Names are doors. Mine is still locked.",
      "I followed a spiral carved beneath three fallen cities. The fourth mark is under this house, though your village was built long after the carving.",
    ],
    world: "The hordes are not migrating. They are answering. Someone learned to ring a signal through relic steel, and each tyrant carries one note of it.",
    detail: "The Veiled One hints at a deeper signal linking the region's bosses and the mark beneath your house.",
    voices: {
      greeting: [
        "Your house sits on a much older threshold.",
        "You have carried relics closer to the mark. It has started to answer.",
        "You came back. The mark noticed before I did.",
        "Stand where you like. I learned long ago which doors I am allowed to hold.",
      ],
      idle: [
        "Four marks. One buried here.",
        "Do not let the forge hear the whole chord.",
        "I watched someone lock a gate once and call it mercy. I have been walking away from that sound for years.",
      ],
      farewell: [
        "When the floor knocks back, do not open it alone.",
        "Ask Edda what Captain Rusk carried at the east gate.",
        "Go. I will be here. I have had practice waiting outside of things.",
      ],
      hint: [
        "Take this warning to memory: each boss relic is part of the same signal.",
        "The spiral beneath your house matches the Regent's seal.",
        "The tyrants are not rivals. They are one sentence, said in pieces.",
      ],
      wounded: [
        "You are too close to death to hear what is below.",
        "Survive first. Secrets are patient.",
        "Not yet. You are no use to the truth dead.",
      ],
      reaction: [
        "Now the hook is set. The next answer lies beneath the floor.",
        "Good. You listen like someone who intends to act.",
        "Then it has begun to answer you, too.",
      ],
    },
  },

  // ------------------------------------------------------------ Mosslight camp
  sable: {
    history: [
      "Ashwatch was twelve scouts when the smoke columns first linked across the regions. I am one of three left.",
      "I have followed the spread from dead farmland to volcanic glass. It is not random—the hordes move as if something is pulling them.",
    ],
    world: "The Ember Wastes are the worst of it. Burnt dead still walk, relic-bearers guard the roads, and the Ash Tyrant keeps them moving.",
    detail: "Sable gives the Ember Wastes quest line and tracks its progress.",
    voices: {
      greeting: [
        "Report. Save the comforting lies for Hearthglen.",
        "You smell like smoke. Good—you are looking in the right direction.",
        "The spread moved again last night.",
        "If you came for easy work, keep walking.",
      ],
      idle: [
        "Three smoke columns east. Two yesterday.",
        "Ash preserves tracks better than mud.",
        "The dead are migrating. I need to know why.",
        "Nine names on the Ashwatch roll have a line through them. I drew six of those lines.",
      ],
      farewell: [
        "Return by the wayfire. Walking back wastes daylight.",
        "Do not chase stragglers into the smoke.",
        "Finish the trail. Then report.",
      ],
      hint: [
        "Take the Meadow wayfire, kill the five relic-bearers, then find the Tyrant.",
        "The Ash Tyrant does twice the damage of the rank and file. Do not trade blows.",
        "When the relic-bearers fall, the road to the Tyrant opens.",
      ],
      wounded: [
        "You are no use to Ashwatch dead. Heal first.",
        "Mara can close that. I cannot.",
        "That wound will slow you before the Wastes do.",
      ],
      reaction: [
        "One trail closed. More remain.",
        "Ashwatch records the debt.",
        "You did the work. Take the reward.",
      ],
    },
  },
  maro: {
    history: [
      "I started with a handcart and three tins of beans. Now I know every pass from the flooded Mire to the frost line, and who waters their fuel.",
      "My last honest contract was hauling sealed Civic Works crates east out of Greyhaven. They hummed against the cart boards. I was paid not to ask.",
    ],
    world: "Every biome has its rumor: locked vaults in the old city, military crates under the snow, and something enormous moving beneath the Mire.",
    detail: "Maro buys unwanted gear and carries a rotating rare find.",
    voices: {
      greeting: [
        "Dust on your boots and coin in your pocket. We can work with that.",
        "Back again? Good. The road has been generous to us both.",
        "I buy honest salvage and tell dishonest rumors.",
        "Name your need. I have probably dragged it across three regions.",
      ],
      idle: [
        "Never trust a sealed tin that bulges.",
        "Frostfall traders pay double for clean fuel.",
        "I once crossed the Mire on a door and bad judgment.",
      ],
      farewell: [
        "Keep your pack light and your magazine full.",
        "If you find two, sell me one.",
        "Road willing, we trade again.",
      ],
      hint: [
        "Rare keys turn up on the strongest dead.",
        "Golden chests are worth the trouble—usually.",
        "The farther you walk from Hearthglen, the tougher the dead and the richer the chests.",
        "The old city has better loot and worse corners.",
      ],
      wounded: [
        "You need Mara more than merchandise.",
        "Try not to bleed on the rare stock.",
        "I sell armor. That condition is a persuasive argument.",
      ],
      reaction: [
        "Fair price. Fair trade.",
        "May it keep you alive long enough to sell it back.",
        "Pleasure doing business with someone still breathing.",
      ],
    },
  },
  lark: {
    history: [
      "I carried songs between camps until the roads became too dangerous for an audience of one. I had a singing partner once. She kept the harmony and the good coat.",
      "This fire was cold when I found it. Sable brought flint; Maro brought lies; I brought a tune.",
    ],
    world: "Mosslight looks gentle because the grass hides the bones. The crypt entrance waits south of the fire.",
    detail: "Lark trades campfire rumors about nearby threats, paths, and loot.",
    voices: {
      greeting: [
        "Sit for a verse, or a warning. Same price.",
        "There you are. I was running out of people to rhyme about.",
        "Warm your hands. I will pretend the song was already about you.",
        "A traveler! Quick, look heroic. I am composing.",
      ],
      idle: [
        "The meadow hums before rain.",
        "Sable does not sing. I have checked. Twice.",
        "I know nine verses about Hearthglen. Three are true.",
      ],
      farewell: [
        "I will save the last verse.",
        "Go on, then. Give me something to rhyme with.",
        "Mind the tall grass. It keeps secrets and ankles.",
      ],
      hint: [
        "The Rootbound Crypt is due south. Bring iron for its locked chest.",
        "Clear a region and its wayfire wakes. Then the long walks get short.",
        "Bats weave as they come. Wait for the straight part, then swing.",
      ],
      wounded: [
        "That rhythm in your breathing is wrong.",
        "I do not write ballads about people who would not sit down. Sit down.",
        "You are a verse short of a funeral. Rest.",
      ],
      reaction: [
        "Now that is a story worth singing.",
        "Oh, that goes in the second verse.",
        "Finally. An ending I do not have to invent.",
      ],
    },
  },

  // ----------------------------------------------------------------- Greyhaven
  rowan: {
    history: [
      "I was a gate constable when the old city fell. Captain Rusk put me on the west gate and told me to count the living through. I counted until dawn.",
      "We raised these walls from that column of survivors. I inherited the watch, the ledger of names, and the argument about the man who saved us.",
    ],
    world: "Old Greyhaven was our city once. We gave up the eastern blocks when the Rust Regent gathered the dead beneath him. The market road is still packed tight.",
    detail: "Rowan posts Greyhaven bounties and pays in gold and keys.",
    voices: {
      greeting: [
        "Greyhaven holds. That does not mean the road is safe.",
        "You look capable. I have work for capable people.",
        "State your business, then your name. In that order, we hold fewer funerals.",
        "The wall saw you a mile out. Good posture, for someone that tired.",
      ],
      idle: [
        "North wall checked. East lamp still burning.",
        "Forty-one on the wall tonight. I would like forty-one at breakfast.",
        "Tamsin says we are short on bolts. Tamsin always says that, and she is always right.",
      ],
      farewell: [
        "Keep the road clear.",
        "Return through the west gate.",
        "Come back with your name. I am tired of writing them in the other column.",
      ],
      hint: [
        "Kill six city dead in Old Greyhaven, then report back.",
        "The Rust Regent roams instead of waiting in an arena.",
        "Break his line of sight in the rubble. The Regent circles wide after a fight.",
      ],
      wounded: [
        "Clinic first. Orders second.",
        "Doctor Voss is behind the east stalls. That is not a suggestion.",
        "I do not pay bounties to corpses. Get patched.",
      ],
      reaction: [
        "Good work. The patrol can breathe again.",
        "Paid in full. Greyhaven does not forget a cleared road.",
        "That is one less name I write tonight.",
      ],
    },
  },
  tamsin: {
    history: [
      "I dispatched freight before the outbreak. On evacuation night I dispatched people instead, with the same clipboard. Inventory is inventory.",
      "We built this counter from an overturned bus and the shelves from road signs. I still keep the last manifest. Not every line on it was claimed.",
    ],
    world: "Maro sells what travels. I stock what keeps a town alive: armor, traps, and keys.",
    detail: "Tamsin sells frontier armor, snare traps, and chest keys.",
    voices: {
      greeting: [
        "Need armor, traps, or a key? Keep it quick.",
        "If you are browsing, browse faster. There is a line, even when there is not.",
        "Back in one piece. Then either the plate did its job or you did yours.",
        "Tell me where you are headed. I will tell you what kills people there.",
      ],
      idle: [
        "Count twice. Lock once.",
        "My brother burns lamp oil like prayer. I am the one who has to count the prayer.",
        "Four crates short this week. Somebody on the supply road owes me an explanation.",
      ],
      farewell: [
        "Bring back anything stamped CITY WORKS.",
        "Do not die in my armor. The straps are hard to replace.",
        "Signed out. Sign back in.",
      ],
      hint: [
        "Snare traps hit the closest threat and slow it hard.",
        "Iron opens field crates, gold opens municipal vaults. Ancient keys belong below ground.",
        "Plate blunts a charge. It does not stop one. Move across their shoulder.",
      ],
      wounded: [
        "Armor only helps before you get bitten.",
        "You are bleeding on inventory. Clinic. Now.",
        "I will hold your order. Ilyan will hold you together.",
      ],
      reaction: [
        "Greyhaven steel. Use it well.",
        "Logged and paid. Try to bring it back.",
        "A fair exchange. I like those. They balance.",
      ],
    },
  },
  juno: {
    history: [
      "I learned the ruins roof by roof. Streets belong to the hordes. Fire escapes belong to me.",
      "My brother Wes left a chalk bird on every safe landing. I still find old ones. Last month I found one where the chalk had not weathered.",
    ],
    world: "Tap the gold salvage markers on buildings and rubble. Some caches hold meals, ammo, or relics.",
    detail: "Juno marks lootable structures in Old Greyhaven.",
    voices: {
      greeting: [
        "You heading into the blocks? Watch the windows.",
        "Quiet feet. Good. The loud ones do not come back to complain.",
        "Look up more. Nobody ever looks up.",
        "You smell like street level. We can fix that.",
      ],
      idle: [
        "Rubble shifts after rain.",
        "I have an uncle in Hearthglen who grows onions. Never met him. He writes like he is apologizing.",
        "I counted nine birds on the east fire escapes. I only remember him drawing eight.",
      ],
      farewell: [
        "If a door opens too easily, do not enter.",
        "Up is slower. Up is alive.",
        "If you cannot carry it, leave the marker bright for the next runner.",
      ],
      hint: [
        "Loot markers stay bright until you empty them.",
        "A gold marker on a building or rubble means a cache. Tap it, take it, move.",
        "Streetlights mark the wide avenues. Wide avenues are where the Regent walks.",
      ],
      wounded: [
        "You will leave a trail all the way back.",
        "Blood on a ladder rung is a signpost. Get that closed.",
        "You cannot climb like that. Clinic, then come find me.",
      ],
      reaction: [
        "That cache was worth the climb.",
        "Clean work. I will chalk that one as emptied.",
        "Not bad, for someone who walks on the ground.",
      ],
    },
  },
  vale: {
    history: [
      "I kept a chapel downtown. When the city fell we carried its lamp out through the west gate and left everything else, including most of my certainty.",
      "The light is not magic. People stand straighter when they can see one another. My sister says I waste oil. She has never once let it run out.",
    ],
    world: "Old Greyhaven is not empty. It remembers every barricade and every failed evacuation.",
    detail: "Vale knows the history of Greyhaven and the ruined district.",
    voices: {
      greeting: [
        "The lamp is lit. You are welcome beside it.",
        "Come in from the dark. No one here will ask what you did out there.",
        "Ah. The one the watch keeps talking about. Sit, if heroes sit.",
        "You carry the road on your shoulders. Set it down a minute.",
      ],
      idle: [
        "A small light still changes the road.",
        "I said forty names at the lamp this morning. I know thirty-one of the faces.",
        "They argue whether Rusk was saint or butcher. I buried people who were certain both ways.",
      ],
      farewell: [
        "Walk where the lamps still reach.",
        "Go gently. Come back whole, or at least come back.",
        "I will keep a place by the light.",
      ],
      hint: [
        "Streetlights mark the old avenues. Rubble hides the best caches.",
        "Night makes the dead bolder. A flashlight slows them and shows what the dark is hiding.",
        "The Regent hunts the lit avenues after dusk. Keep to the side streets then.",
      ],
      wounded: [
        "Rest before courage becomes waste.",
        "Doctor Voss first. Then come and sit by the lamp.",
        "I can pray over that or you can have it stitched. I recommend both, in the other order.",
      ],
      reaction: [
        "Take the light with you.",
        "Good. The road is a little shorter for someone tonight.",
        "That was kindly done.",
      ],
    },
  },
  bria: {
    history: [
      "I ran parcels between the Greyhaven wards before the sirens. Fastest route time in the depot, four years running. Now the parcels are bandages.",
      "My old route crossed the Market Arcade. Three locked caches there could keep this gate supplied for weeks.",
    ],
    world: "Old Greyhaven rewards quick hands. Search the marked pharmacy, transit lockers, and records vault before the horde closes around you.",
    detail: "Bria offers Street Salvage: loot three marked caches for gold and a relic.",
    voices: {
      greeting: [
        "Boots tied? I have a route worth running.",
        "Greyhaven needs salvage more than speeches.",
        "You walk like someone with time. Nobody has time.",
        "Good, you are here. I was about to go myself, and I am needed at the gate.",
      ],
      idle: [
        "Market road is loud today.",
        "Three caches. In and out.",
        "I used to get tipped for speed. Now the tip is not being eaten.",
      ],
      farewell: [
        "Run light. Return heavy.",
        "Do not stop to count it. Count it here.",
        "If the street goes quiet, you are already late.",
      ],
      hint: [
        "The first three gold salvage markers are close to the old market.",
        "Loot the pharmacy, transit lockers, and records vault.",
        "A marker stays bright until it is emptied. Dull ones are done. Do not walk back for them.",
      ],
      wounded: [
        "Not like that. Visit the clinic first.",
        "A runner who bleeds is just a trail. Get stitched.",
        "Sit. I will not send you out to die slowly.",
      ],
      reaction: [
        "That haul keeps the gate standing.",
        "Fast and full. I knew I liked you.",
        "That is a week of bandages. You have no idea.",
      ],
    },
  },
  cora: {
    history: [
      "My forge was three streets inside Old Greyhaven. I carried the anvil here on a freight dolly while the east ward burned.",
      "The first sword I made after the fall snapped. I buried its owner, melted the blade, and never rushed a temper again.",
    ],
    world: "Ember crystal is not ordinary ore. Bring me a bound core and I can make a charm that turns heat into a killing edge.",
    detail: "Cora tempers weapons, trades forge rumors, and can finish Lio's ember-crystal chain.",
    voices: {
      greeting: [
        "Lay the weapon down gently. My bench has survived enough abuse.",
        "Steel talks. Yours is complaining.",
        "You are standing in my light. Either side. Pick one.",
        "Let me guess. It was fine until it was not.",
      ],
      idle: [
        "Bellows first. Hammer second.",
        "Good steel rings. Bad steel argues.",
        "Civic Works used to order crucibles from me that no honest smith needs. I stopped asking why.",
      ],
      farewell: [
        "Keep the edge out of the dirt.",
        "Bring me that ember core if Lio trusts you with it.",
        "Oil it tonight. Not tomorrow. Tonight.",
      ],
      hint: [
        "Lio Venn camps beside the split basalt in the Ember Wastes.",
        "Three ember crystals can be bound into one stable core.",
        "A katana rewards one clean hit. An axe forgives a crowd. Pick the fight, then the steel.",
      ],
      wounded: [
        "Clinic first. I do not temper blood.",
        "Voss is two stalls east. Go.",
        "You are dripping on the quench barrel.",
      ],
      reaction: [
        "That heat will hold.",
        "Now the road has something to fear.",
        "Listen to that ring. That is steel agreeing with you.",
      ],
    },
  },
  ilyan: {
    history: [
      "I studied epidemics before the dead rose. Then every textbook became less useful than clean water and a sharp needle.",
      "Greyhaven took me in after ashfever killed half my caravan. I stayed because nobody else knew which coughs were contagious.",
    ],
    world: "The dead spread more than bites. Ashfever rides soot, mire-rot rides water, and cold-lung hides under Frostfall frostbite.",
    detail: "Ilyan sells trauma treatment and purges ashfever, burns, and road sickness.",
    voices: {
      greeting: [
        "Hold still. I am deciding whether you need stitches or sense.",
        "You look ambulatory. That is not the same as healthy.",
        "Symptoms first, heroics second. I have heard all the heroics.",
        "Sit. Tongue out. No, I am joking. Mostly.",
      ],
      idle: [
        "Boil the instruments again.",
        "Ashfever starts behind the eyes.",
        "The early ledgers call the first cases volunteers. I have stopped finding that word neutral.",
      ],
      farewell: [
        "Drink clean water. Yes, that is medical advice.",
        "If the shaking starts, come back before sundown.",
        "Wash your hands. I will know.",
      ],
      hint: [
        "A trauma kit restores you fully. The purge clears ember sickness and burns.",
        "Do not mistake numbness for healing in Frostfall.",
        "A burn keeps killing after the fire is out. Purge it. Do not walk it off.",
      ],
      wounded: [
        "Sit. Now.",
        "That wound has already made the decision for you.",
        "Do not tell me it looks worse than it is. I own the scale.",
      ],
      reaction: [
        "Pulse steady. Try to keep it that way.",
        "The fever broke. You can travel.",
        "Good color. Stay out of the soot a few days. You will not, but I said it.",
      ],
    },
  },
  patch: {
    history: [
      "I fixed radios before the sirens. Turns out a dead radio and a dead toaster both sell better as screws.",
      "My caravan left me at Greyhaven because I bought too much scrap. Their axle broke six miles later. I bought that too.",
    ],
    world: "Junk has three prices: what it was, what it is, and what someone desperate thinks it could be. I pay the middle one—minus risk.",
    detail: "Patch buys unequipped loot cheaply and knows which ruins still hide useful scrap.",
    voices: {
      greeting: [
        "If it rattles, leaks, or smells haunted, I probably buy it.",
        "Pack too heavy? My prices can make that problem smaller.",
        "Do not tell me what it is. Let me guess. No. Tell me, I give up.",
        "Welcome to the only shop where broken is a feature.",
      ],
      idle: [
        "Copper wire beats gold when the generator dies.",
        "That hinge is almost a knife.",
        "Found a plate with a spiral stamped in it. It hums near the kettle. I keep it off the kettle.",
      ],
      farewell: [
        "Bring stranger junk next time.",
        "No refunds if it starts whispering.",
        "Mind the step. It is for sale.",
      ],
      hint: [
        "I pay less than Maro, but I never close and I buy almost anything.",
        "Old Greyhaven's transit lockers are full of machine parts.",
        "Maro pays better. I pay always. Know which one you need tonight.",
      ],
      wounded: [
        "I buy scrap, not last words.",
        "Clinic is east. Crawl if you have to.",
        "I can sell you a bandage. Used. Lightly.",
      ],
      reaction: [
        "Ugly, useful, mine.",
        "I can take that off your hands.",
        "Sold. No, bought. I always mix those up, to my benefit.",
      ],
    },
  },
  edda: {
    history: [
      "I taught children their letters in Old Greyhaven. After the fall, stories became how I taught adults which roads killed people.",
      "The Rust Regent was once Captain Rusk. He locked the east gate to save the civic quarter, then died behind the same lock.",
    ],
    world: "Every settlement tells the outbreak differently. The truth is in the parts nobody wants to repeat: who barred the gates, who opened them, and who profited.",
    detail: "Edda preserves Greyhaven's lore and clues about the power behind the wandering hordes.",
    voices: {
      greeting: [
        "Sit if you want the long truth. Stand if you only want the useful part.",
        "Ah, a listener with mud on their boots.",
        "Close the door. Stories catch cold.",
        "You have the face of someone holding a question. Good. Hand it over.",
      ],
      idle: [
        "Names first. Legends later.",
        "A town dies twice: once in blood, once in memory.",
        "The children here think the old city is a fairy tale. That is a kindness with an expiry.",
      ],
      farewell: [
        "Carry the story accurately.",
        "Come back when you have a better ending.",
        "Mind how you tell it. You are a source now.",
      ],
      hint: [
        "The Regent's seal bears the same spiral carved under the village house.",
        "Hordes moving together are being called, not merely wandering.",
        "Ask who profited when the gates closed. It is rarely the one holding the key.",
      ],
      wounded: [
        "Stories can wait. Bleeding cannot.",
        "Do not become my next memorial.",
        "Sit. I have ended enough stories this way.",
      ],
      reaction: [
        "Good. Now you know where to look.",
        "There. That is a detail I did not have.",
        "Well listened. It is rarer than well fought.",
      ],
    },
  },

  // ------------------------------------------------------------- Old Greyhaven
  alden: {
    history: [
      "I ran the south transit platform before evacuation day. When the trains stopped, I kept the signal lamps burning for anyone still on foot.",
      "Twenty-seven people made it through my station after the last broadcast. I remember every name; the dead do not get to take those from me.",
    ],
    world: "The south blocks sound empty because the Regent's patrols sweep them clean. Empty streets are where you should listen hardest.",
    detail: "Alden watches the southern escape route and marks safer crossings through Old Greyhaven.",
    voices: {
      greeting: [
        "Keep your voice under the wind. The dead echo down these streets.",
        "You made it past the market. That still counts for something.",
        "Platform is open. Mind the gap. Old habit.",
        "The lamp said someone was coming. I am glad it was you and not the other thing.",
      ],
      idle: [
        "Signal lamp is low again.",
        "Three bells meant evacuation. We never rang the fourth.",
        "The timetable still hangs there. Last train, 6:40. I check it. I do not know why.",
      ],
      farewell: [
        "Use the south crossing. Never the tunnel.",
        "If the lamps go dark, get off the avenue.",
        "Twenty-seven got out through here. I would like to say twenty-eight.",
      ],
      hint: [
        "Streetlights mark the broad roads, but the Regent hunts those roads after dusk.",
        "The Motor Pool still has a locked crate near its east wall.",
        "Break their sight in the rubble. The Regent circles wide after a fight, then comes back.",
      ],
      wounded: [
        "That blood will paint a road straight to us.",
        "Bandage first. Move second.",
        "Sit on the bench. It has held worse than you.",
      ],
      reaction: [
        "Another route stays open tonight.",
        "Good. That is a crossing I can mark safe.",
        "You did that properly. The lamps and I thank you.",
      ],
    },
  },
  nia: {
    history: [
      "I catalogued court records in Civic Hall. Now I catalogue barricades, caches, and every name carved into the brick.",
      "The city archive burned for four days. I saved one ledger, then started writing a new one from memory.",
    ],
    world: "The Rust Regent is not the city's first tyrant, only the loudest. His dead patrol the old tram loop and drag salvage toward Civic Square.",
    detail: "Nia records the ruins' hidden routes, loot sites, and the movements of the Rust Regent.",
    voices: {
      greeting: [
        "Do not step on the chalk marks. They are the only map we have.",
        "You came from Greyhaven? Tell me which lamps still burn.",
        "Careful. That wall is a page.",
        "A new face. Give me your name twice: once for the ledger, once in case.",
      ],
      idle: [
        "Blue chalk means searched. White means danger.",
        "Someone moved the records-vault marker.",
        "Someone is drawing birds on the east fire escapes. I never taught anyone a bird.",
      ],
      farewell: [
        "Leave one mark so I know you passed.",
        "Write down what you see. Memory dies too.",
        "Blue for searched, white for danger. Do not improvise a color.",
      ],
      hint: [
        "The Records Vault is east of Civic Square; search the gold marker, then move.",
        "The Regent circles wide after a fight. Use the rubble to break sight.",
        "His dead walk the old tram loop. Cross it between patrols, never along it.",
      ],
      wounded: [
        "I can record a route, not replace your blood.",
        "Get behind stone before you fall.",
        "Do not bleed on the ledger. It is the only copy of a city.",
      ],
      reaction: [
        "Good. The map gets truer.",
        "Recorded. You are in the ledger now, in the good column.",
        "That closes a question I have carried for a year.",
      ],
    },
  },

  // ------------------------------------------------------- Outposts and wilds
  rook: {
    history: [
      "Ashwatch found me under a burned tanker with one boot and no memory of the road in. They gave me the name. I kept it. It fits.",
      "I learned the Wastes by counting safe stones between fire cracks. Some nights I remember a voice on a radio saying a number. Never the same number.",
    ],
    world: "Ember imps circle before they rush. Magma slimes split the road and punish anyone who stands still.",
    detail: "Rook guards Ashwatch Outpost and reads movement in the ash.",
    voices: {
      greeting: [
        "Ash in your lungs yet? Then you have not gone far enough.",
        "You walked in. Most get carried.",
        "Stand on the grey stone. The black is thinking about breaking.",
        "Sable sent you, or you are lost. Either way, drink something.",
      ],
      idle: [
        "Wind shifted east. Bad sign.",
        "Forty safe stones to the vault road. Yesterday it was forty-three.",
        "I do not remember my mother's face. I remember the plate number on that tanker.",
      ],
      farewell: [
        "Keep off the glowing seams.",
        "Step where the ash is pale. Pale has cooled.",
        "If you hear glass singing, walk the other way.",
      ],
      hint: [
        "The Cinder Vault entrance lies northeast of Ashwatch.",
        "Imps circle at range, then stop to spit fire. When one goes still, step aside.",
        "Never stand still near a magma slime. It winds up slow and hits like a brute.",
      ],
      wounded: [
        "The Wastes smell weakness. Patch that.",
        "Burns go bad fast out here. Get that seen.",
        "You are leaking. The ash will drink it, and so will worse.",
      ],
      reaction: [
        "Clean work. Cleaner than this place.",
        "Huh. You came back the same shape. Rare.",
        "Ashwatch will hear of it. What is left of us.",
      ],
    },
  },
  ysra: {
    history: [
      "I mapped ski trails before the freeze. Blue runs, black runs, a little cafe at the top. The mountain changed. The habit of mapping stayed.",
      "Rimewatch lost six people following footprints that walked backward. I trust broken snow, not tracks.",
    ],
    world: "Ice-mane wolves hunt in packs. Break their line and never let a troll pin you against a cliff.",
    detail: "Ysra watches the Frostfall passes and warns of coordinated packs.",
    voices: {
      greeting: [
        "Speak close. The wind steals half of every sentence.",
        "You are dressed for a different mountain. Come stand out of the wind.",
        "The tracks said one traveler, tired, favoring the left. Hello.",
        "Still got all ten? Show me. Good.",
      ],
      idle: [
        "Fresh slide on the north face.",
        "My brother fishes the Silverrun. He thinks the cold is a thing I chose. He is right.",
        "Six sets of gear on the wall hooks. Nobody will take the hooks down.",
      ],
      farewell: [
        "Count your fingers when you return.",
        "If the tracks look too easy to follow, do not.",
        "Go downhill slowly. The mountain likes hurry.",
      ],
      hint: [
        "Rimehold opens below the southern ledge. Bring an Ancient Key.",
        "Ice-manes run faster and flank wider in a pack. Thin them to one and it slows.",
        "A troll shows you where it will slam. The ring in the snow is the warning.",
      ],
      wounded: [
        "Cold hides blood loss. Go warm up.",
        "You cannot feel how bad that is. That is the bad part.",
        "Inside. Stove. Now. Argue after.",
      ],
      reaction: [
        "The mountain noticed that.",
        "Good. I will mark that slope as passable.",
        "Hm. You may be worth a map.",
      ],
    },
  },
  fen: {
    history: [
      "I ferried people across Blackwater before the bridges sank. A coin a head, children free. Then the water stopped reflecting faces.",
      "My boat is gone, but I still read the ripples. Some of them move against the rain.",
    ],
    world: "The Mire Tyrant stirs open water. Keep to roots and listen for spitters behind the fog.",
    detail: "Fen watches Blackwater Outpost and knows what moves beneath the mire.",
    voices: {
      greeting: [
        "Step where I step, unless you fancy sinking.",
        "Dry feet? You have not been here long.",
        "The water let you through. Do not thank it. It keeps count.",
        "Mind the third plank. It is honest about nothing.",
      ],
      idle: [
        "That ripple had shoulders.",
        "I still carry the fare tin. Forty-one coins. Nobody left to give change to.",
        "Fog is early. Fog is never early for a good reason.",
      ],
      farewell: [
        "Dry your boots before night.",
        "Roots, not water. Say it back to me.",
        "If something calls your name from the reeds, it learned it from someone else.",
      ],
      hint: [
        "Spitters vanish in fog. Watch where the reeds bend.",
        "Wound the Mire Tyrant and it calls a shieldbearer and a bat. Keep something in reserve.",
        "Shieldbearers hit like brutes. Do not let one walk you into the bog.",
      ],
      wounded: [
        "Blood brings things up from the water.",
        "Bind it tight. The Mire gets into anything left open.",
        "You are dripping. Everything down there can smell that.",
      ],
      reaction: [
        "Blackwater keeps its debts.",
        "Paid, then. The water will remember you kindly, or not at all.",
        "Well crossed.",
      ],
    },
  },
  lio: {
    history: [
      "I prospected the Wastes before the lava broke the old highway. Ember crystal paid well enough to ignore common sense.",
      "My partner took our crawler when the ash storm hit. I kept the survey case and learned how little paper weighs when water runs out.",
    ],
    world: "Ember crystals grow where heat and dead marrow meet. Three intact shards can make a stable core—but only a real smith can bind one.",
    detail: "Lio needs three Ember Crystals. Wastes enemies drop them while his quest is active.",
    voices: {
      greeting: [
        "Water? No? Then maybe you can help with the other problem.",
        "Careful where you step. The black crust is thinner than it looks.",
        "You are real. Good. Yesterday I had a long talk with a rock.",
        "Shade is this side. I will share it. I am not sharing the water.",
      ],
      idle: [
        "Three clean crystals. No fractures.",
        "Crawler should have been back yesterday.",
        "They sing, the crystals. Faintly. Put three together and it is nearly a word.",
        "My sister went north for ice work. I went south for fire. We were both wrong.",
      ],
      farewell: [
        "Stay off the orange seams.",
        "If you find the crystals, do not pocket them beside ammunition.",
        "Walk the pale ash. Pale has cooled.",
      ],
      hint: [
        "Kill Wastes creatures while the contract is active; their heat-cysts harden into crystals.",
        "Bring me three crystals, then carry the bound core to Cora Flint in Greyhaven.",
        "An Ember Ward keeps the burning off you. Without one, never let an imp reach you twice.",
      ],
      wounded: [
        "You need water and a medic more than I do.",
        "The heat will finish what did that.",
        "I would offer you water. I am not going to.",
      ],
      reaction: [
        "Those are clean. Cora can make something of them.",
        "You actually came back. I owe you more than water.",
        "Clean facets. I could weep, if I could spare it.",
      ],
    },
  },
  suri: {
    history: [
      "I guided climbers before Frostfall stopped thawing. The mountain killed careless people then, too—it was simply quieter about it.",
      "I stayed when Rimewatch withdrew because someone had to keep the avalanche bells free of ice.",
    ],
    world: "Cold changes a fight. Slow breath, short steps, and never chase a wolf downhill. Three ice-manes have been testing my shelter every dusk.",
    detail: "Suri offers survival advice and a three-enemy defense quest around her Frostfall shelter.",
    voices: {
      greeting: [
        "Close the flap behind you. Heat is harder to hunt than food.",
        "Your eyelashes are freezing. Blink more.",
        "You climbed in that? Brave, or nobody told you. Sit by the stove.",
        "Stamp the snow off first. The floor is the only dry thing I own.",
      ],
      idle: [
        "Bell rope is iced again.",
        "Wolves came closer last night.",
        "A woman crossed this pass years ago. Her parcel frosted her gloves from the inside. I did not ask twice.",
      ],
      farewell: [
        "Breathe through cloth above the ridge.",
        "If the snow goes silent, get under stone.",
        "Take the lee side down. It is slower, and you arrive.",
      ],
      hint: [
        "Defend the shelter from three marked Frostfall hunters.",
        "Trolls telegraph the slam; the snow ring shows where not to stand.",
        "Frostmaul trades a slam for a ring of icicles. When the ice flies, step sideways, never straight back.",
      ],
      wounded: [
        "Cold hides shock. Sit by the stove.",
        "You are losing heat through that wound.",
        "You have stopped shivering. That is not good news.",
      ],
      reaction: [
        "The shelter holds another night.",
        "Good. Silence belongs to us again.",
        "The bells will sleep tonight. So might I.",
      ],
    },
  },  // ------------------------------------------------------------ Blackwater Bay
  marsh: {
    history: [
      "I worked this light before Blackwater swallowed the lower road. Fishing kept the lamp crew fed, and it keeps me listening now.",
      "The Wreckmother took my finest rod. Tidecaller is still lodged somewhere in that beast—or in whatever remains when it falls.",
    ],
    world: "Rain wakes the deeper water. Storm lures move like frightened silver when the drops hit hard.",
    detail: "Marsh sells rods, bait, and storm lures, and buys whatever the bay gives back.",
    voices: {
      greeting: [
        "Rod, bait, or a fair price for your catch?",
        "Keep your steps light. The pier hears everything.",
        "Sit if you like. The fish do not care who is watching.",
        "Mind the bait bucket. Those wrigglers cost more than your boots.",
      ],
      idle: [
        "Bobber still. Hands ready.",
        "Rain is good. Thunder is better.",
        "Thirty years on this pier. The water got worse. The fishing got better.",
      ],
      farewell: [
        "Leave the water calmer than you found it.",
        "Tide turns quick out here. Watch your feet, not the water.",
        "Bring me something with fins. I pay for fins.",
      ],
      hint: [
        "Tap on the bite, then keep the line tight.",
        "Golden koi fetch Maro prices. I prefer eels.",
        "A Bronze Rod holds a stronger line. Better eels, better odds.",
      ],
      wounded: [
        "Blood in Blackwater is an invitation.",
        "Sit on the crate and keep that arm out of the water.",
        "Get yourself to a fire and a bandage. The bay can smell you from here.",
      ],
      reaction: [
        "Clean trade.",
        "The bay paid you today.",
        "Good weight on that. The scale does not lie.",
      ],
    },
  },
  cobb: {
    history: [
      "Blackwater did not fall in one night. First the storm wall broke, then the lower streets flooded, then the lamps went dark one by one.",
      "I kept this light through the last evacuation. Every boat that missed the beam joined the wrecks below.",
    ],
    world: "The Wreckmother nests in the ferry hold. When she is alive, the tide pulls toward her even when the wind says otherwise.",
    detail: "Cobb keeps the lighthouse and needs lamp oil from the dock crates before the lens can be repaired.",
    voices: {
      greeting: [
        "Mind the cliff edge. The sea already owns enough names.",
        "If you came by boat, thank the dead lamp you arrived at all.",
        "Wipe the salt off your boots. The stairs are slick enough.",
        "A living face on my rock. The lamp would have liked you.",
      ],
      idle: [
        "Three tins of oil. Then the lens can burn again.",
        "The old beam knew every reef by name.",
        "Forty-one steps to the lamp room. My knees count every one.",
      ],
      farewell: [
        "Keep the lighthouse at your back.",
        "Go careful. Fog comes in off the bay faster than a man can run.",
        "Bring the oil up when you find it. I will be here. I am always here.",
      ],
      hint: [
        "Dock crates still carry lamp oil. Bring me three tins.",
        "Fish the lee side at dawn. The Wreckmother churns the deep channel.",
        "The Wreckmother does not stay dead. Five days, and she is back in the ferry hold.",
      ],
      wounded: [
        "That blood will carry farther than the beam.",
        "Sit on the stair. The sea has waited this long. It can wait for you to stop bleeding.",
        "You are pale as a drowned man. Bandage first.",
      ],
      reaction: [
        "The light holds. That is enough for tonight.",
        "Good. Every tin is another night of light.",
        "I have not said thank you in years. Thank you.",
      ],
    },
  },
  sel: {
    history: [
      "I ran cargo at Pier Seven until the surge lifted the warehouse doors off their tracks.",
      "The crew scattered. Three manifests went into the flooded warehouses, and the bay kept the names written on them.",
    ],
    world: "People say the Wreckmother wears a ferry hull like a shell. I have seen rivets in her hide, so I stopped calling that a rumor.",
    detail: "Sel needs three cargo manifests recovered from Blackwater's flooded warehouses.",
    voices: {
      greeting: [
        "Tide is turning. Talk fast or move higher.",
        "You hear chains under the water, you run.",
        "New on the docks? Stand where I stand. Those boards are sound.",
        "Hands where I can see them. Then we talk.",
      ],
      idle: [
        "High water in two minutes.",
        "Tide is wrong. Get off the low pier.",
        "Warehouse current is pulling seaward.",
      ],
      farewell: [
        "Take the upper boards back.",
        "Run the high boards. The low ones lie.",
        "Go. Do not count on the tide being kind twice.",
      ],
      hint: [
        "Three manifests. Flooded warehouses west and south of the ferry.",
        "When the foam runs backward, the Wreckmother is near.",
        "Search every flooded warehouse around the ferry. The bay hides paper in the worst corners.",
      ],
      wounded: [
        "You will not outrun the tide bleeding like that.",
        "Sit on that crate. I have patched worse on a moving boat.",
        "Press on it and keep it out of the water. The bay heals nothing.",
      ],
      reaction: [
        "That is my crew's handwriting. The bay did not erase them.",
        "Good. One more name the water does not get to keep.",
        "You run like a dock rat. From me, that is a compliment.",
      ],
    },
  },
  preacher: {
    history: [
      "I preached in a dry chapel once. Then the sea came through the doors and taught the congregation a wetter gospel.",
      "The Mother of the deep does not sleep. She only sinks below the sound of bells.",
    ],
    world: "Every wreck is a rib. Every anchor is a tooth. Blackwater is building something beneath us.",
    detail: "The Drowned Preacher wanders the rotting piers and listens for the Wreckmother beneath the tide.",
    voices: {
      greeting: [
        "Hush. The Mother of the deep is counting footsteps.",
        "You brought a land-shadow onto sacred boards.",
        "Come, pilgrim of the shallows. Kneel where the boards are wet.",
        "A dry soul. How rare. How brief.",
      ],
      idle: [
        "Mother of the deep, turn your blind eye.",
        "The pilings knock when she dreams.",
        "Salt remembers every drowned name.",
        "When the ship bell rings without a ship, the Fogmariner walks.",
        "His lantern does not guide the living.",
        "Fog on the rotting piers means the old captain has come ashore.",
      ],
      farewell: [
        "Go dry, little spark.",
        "Walk the high piers, child. The low ones already belong to her.",
        "Go, and let the gulls say your name before the water does.",
      ],
      hint: [
        "She lives below the ferry. If the ropes pull seaward, leave the pier.",
        "When the Wreckmother rises, do not stand inside the ring.",
        "The ferry hold is her chapel. Enter it rested, or do not enter it.",
      ],
      wounded: [
        "The deep has scented you.",
        "You bleed like an offering. Do not make it here.",
        "Bind the wound, child. The Mother loves an open door.",
      ],
      reaction: [
        "A debt returned to the tide.",
        "The tide takes and the tide returns. Today it returned.",
        "Blessed be the low water. It gave something back.",
      ],
    },
  },
  // ------------------------------------------------------ Newer Hearthglen face
  mira: {
    history: [
      "Before the outbreak, I guided rescue crews through wildfire country. Reading smoke, packing light, and finding a road home were the whole job.",
      "My crew held the north evacuation route until a fuel truck went up. I reached Hearthglen with one pack and their field radio. Everything on this counter comes from finishing the runs they could not.",
    ],
    world: "Hearthglen is safe because its people prepare before the gates shake. I keep bandages dry, ammunition counted, and one clear route through every treeline.",
    detail: "Mira sells practical field supplies beside Hearthglen’s central fire.",
    voices: {
      greeting: [
        "You look like the road won that round. Need supplies?",
        "Heading beyond the palisade? Pack for the return trip too.",
        "I keep the useful things close and the stories short.",
        "Back from the trees. Good. I was starting to count footsteps.",
      ],
      idle: [
        "Bandages left, ammunition right.",
        "Smoke is drifting north. That road may stay clear.",
        "A light pack moves faster than a brave speech.",
      ],
      farewell: [
        "Come back with fewer holes than you left with.",
        "Keep one magazine for the road home.",
        "If the birds lift all at once, turn around.",
      ],
      hint: [
        "Carry ammunition before you chase a marked horde.",
        "Chargers commit to a line. Wait, then cut across it.",
        "The village fire is the last safe place to check your pack.",
      ],
      wounded: [
        "Sit down. You can look heroic after the bleeding stops.",
        "Mara can stitch that. I can sell you enough cloth to reach her.",
        "You are one bad step from becoming somebody else’s cautionary tale.",
      ],
      reaction: [
        "That should keep you moving.",
        "Good choice. Useful beats impressive.",
        "Take it. Bring yourself back with it.",
      ],
    },
  },
  // --------------------------------------------------------------- Saint Mercy
  imogen: {
    history: [
      "I ran Saint Mercy’s infectious-disease ward before the sirens. When the first Ember patients arrived, the hospital became a sealed laboratory overnight.",
      "The quarantine failed from inside. Administration locked the lab wing, the generator died, and the morgue cache became the last place we could keep an uncontaminated sample.",
    ],
    world: "The outbreak did not begin as a weapon. Ember was meant to purge infection from dead tissue. The trial patients woke answering the same signal—then every corpse nearby answered too.",
    detail: "Dr. Hale is reconstructing Saint Mercy’s final records through the three-stage Ward Rounds investigation.",
    voices: {
      greeting: [
        "Easy. If you can still answer questions, I can still help.",
        "Saint Mercy is not abandoned. Not while one doctor remains.",
        "Mind the ward doors. Some patients never discharged.",
        "You walked into a hospital on purpose. Brave or sick? Sit, and we will find out.",
      ],
      idle: [
        "Four logs. One chain of mistakes.",
        "The generator can still release the lab lockdown.",
        "Clean hands are a luxury. Clean evidence is not.",
      ],
      farewell: [
        "If you are bitten, come back before the fever speaks.",
        "Do not open a red-tagged drawer without gloves.",
        "Bring me facts, not rumors.",
      ],
      hint: [
        "Recover all four patient logs before you trust any story about the Ember cure.",
        "The generator takes fifteen units of vehicle fuel.",
        "The Quarantine Vial is in the morgue cache, behind the west cold-storage wall.",
      ],
      wounded: [
        "Sit down. That is a medical order.",
        "I can treat blood loss. I cannot treat recklessness.",
        "Pressure, elevation, and stop talking. In that order.",
      ],
      reaction: [
        "That closes one more gap in the record.",
        "Good. Evidence survives even when witnesses do not.",
        "Thank you. I will log it properly. Somebody should.",
      ],
    },
  },
};
