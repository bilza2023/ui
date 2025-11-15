// /scripts/importAyatIcons.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ------------------------------------------------------
// ICONS ONLY (100 items) — direct flat array
// These will be inserted starting from hookId = 9 onward
// ------------------------------------------------------
const ayatIcons = [
  "Shining book in steady light.",
  "Lone lamp in darkness; open hands; a coin offered.",
  "New scroll descending beside older scrolls on a table.",
  "Upward path of light with confident walkers.",
  "Bright street with sealed doors; a distant caller silhouetted.",
  "Heart stamped with a seal; ears plugged; veiled eyes.",
  "Smiling mask over a shadowed face.",
  "Trader’s scale tipping against himself; coins spilling away.",
  "Gray mist around eyes and ears; barbed cloud overhead.",
  "Polished wall front; crumbling bricks hidden behind.",
  "Seedlings crushed under careless boots.",
  "Offered torch pushed away by a raised palm.",
  "Split mirror: one side smiles, the other frowns.",
  "Puppets tangled in their own strings.",
  "Compass traded for a handful of smoke.",
  "Night road lit by a flash; light snatched back.",
  "Dark tunnel; hands over ears; band across eyes.",
  "Thunderstorm; fingers jammed in ears; sharp lightning forks.",
  "Strobe of lightning: one step forward, sudden blackout.",
  "Open palms turned upward beneath wide sky.",
  "Earth like a bed; sky a canopy; rain feeding garden.",
  "Blank scroll beside a revealed scroll on a stand.",
  "Encircling wall of fire closing inward.",
  "Garden with rivers and fruit; joyful silhouettes by water.",
  "Tiny gnat under magnifier above a vast ledger.",
  "Torn covenant ribbon; rope cut between nearest houses.",
  "Sprout, wilt, sprout again — wheel of life turning.",
  "Spread earth with laid-out provisions.",
  "Circle of angels around earth; a figure pointed out.",
  "Table of objects; Adam pointing as angels watch.",
  "Angels with blank tablets, palms raised in acknowledgement.",
  "Adam speaking; angels nodding in assent.",
  "All bowed; one figure rigid and upright.",
  "Open garden; free fruits; one marked tree with a band.",
  "Whispering coil; footprints descending from a walled garden.",
  "Words like light descending; door of return opening.",
  "Calm footprints beneath clear sky; milestones ahead.",
  "Foggy ravine; fallen signposts and straying steps.",
  "Two clasped hands over a chest of favors.",
  "Presented book; faces turned away toward the side.",
  "Black and white threads tangled on a single spool.",
  "Straight prayer row; a coin passed; bodies bowing together.",
  "Pointing finger outward; dusty mirror ignored behind.",
  "Two sturdy crutches leaning on a prayer rug.",
  "Eyes lifted to a bright horizon line.",
  "Banner raised above a gathered family line.",
  "Lonely figure before scales; barriers around the platform.",
  "Crown under breaking waves; whip discarded in water.",
  "Sea parted into walls; dry path down the middle.",
  "Golden calf statue; a dancing ring of silhouettes.",
  "Slate wiped clean with a single stroke.",
  "Glowing tablets; a beam dividing night from day.",
  "Shadow striking its own twin; dawn breaking afterward.",
  "Faces lifted to sky; sudden thunderbolt streak.",
  "Fallen figures; then breath returns; eyes open.",
  "Canopy shade; flakes of manna and quails descending.",
  "City gate; bowed heads entering low.",
  "Twisted signpost; storm cloud rolling in.",
  "Rock struck; twelve clear streams arc outward.",
  "Basket of heavenly food traded for onions and leeks.",
  "Three roads from different towns joining at one light.",
  "Mountain held like a canopy above a crowd.",
  "Backs turned; a lifeline rope catching a fall.",
  "Shoreline silhouettes shifting into apes.",
  "Warning post planted beside the road.",
  "Outline of a cow; crowd arguing in gestures.",
  "Search for color; swatches held to the light.",
  "Bright yellow cow — gentle glow, pleasing to look at.",
  "Raised hands counting conditions around the cow.",
  "Spotless cow, unyoked — finally still.",
  "Covered body in an alley; faces tense.",
  "A piece touches the body; finger rises to point.",
  "Stones split releasing water; some rocks unmoved.",
  "Open scroll ignored; eyes drift to the side.",
  "Whispered meeting; palms shielding mouths.",
  "Great ledger opening; all lines visible.",
  "Lines read without understanding; gaze glazed over.",
  "Inky hands forging pages at a desk.",
  "Short calendar of fire days circled in red.",
  "Dark stain spreading across a white sheet.",
  "Green gardens opening like doors.",
  "Wheel of duties: parents, kin, needy, prayer, alms.",
  "City street with bloodline circle crossed by a ban sign.",
  "Book sliced into kept and discarded pages.",
  "Hands raised; help absent; horizon empty.",
  "Chain of messengers shown as portraits in a hall.",
  "Heart wrapped in layers of cloth.",
  "Bright lamp arrives; jealous eyes narrow.",
  "Two stacked storm clouds — one fury upon another.",
  "Blindfold choosing only familiar shapes.",
  "Glowing staff and parted sea remembered; calf silhouette beside.",
  "Mountain raised overhead; lips saying ‘we hear’ while feet step back.",
  "Golden gate; ‘enter if true’ — faces hesitate.",
  "Figure clinging to earth; eyes wide at a shadow of death.",
  "Measuring tape pulled longer and longer — never enough.",
  "Gabriel as a swift courier bird with a sealed letter.",
  "Red line drawn between friend and foe; shields raised.",
  "Clear signposts; a few turn away down a side lane.",
  "Snapped twigs where covenant cords should be.",
  "Book received, then tossed behind the back."
];

// ------------------------------------------------------
// MAIN EXECUTION
// ------------------------------------------------------
async function main() {
  let hookId = 9;

  for (const icon of ayatIcons) {
    await prisma.hifz.update({
      where: { hookId },
      data: { hookDescription: icon }
    });

    console.log(`✔ Updated hookId=${hookId}`);
    hookId++;
  }

  console.log("🎉 All ayat-icons imported successfully!");
}

main().finally(() => prisma.$disconnect());
