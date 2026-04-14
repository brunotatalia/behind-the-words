/**
 * Try harder to find Deezer IDs for missing songs.
 * Tries multiple search strategies:
 * 1. Original Hebrew name
 * 2. Song title only (without artist)
 * 3. Artist name only
 * 4. Transliterated/English variations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = path.join(__dirname, '../src/data/questions.json');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function searchDeezer(query) {
  const url = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=5`;
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 429) {
      await sleep(5000);
      return searchDeezer(query);
    }
    return [];
  }
  const data = await res.json();
  return (data.data || []).filter(t => t.preview && t.preview !== '');
}

// Manual mappings for songs that are hard to find via search
const MANUAL_MAPPINGS = {
  'עוף גוזל': 'ouf gozal shalom hanoch',
  'אני ואתה נשנה את העולם': 'ani veata arik einstein',
  'שלג בחודש אוגוסט': 'sheleg behodesh august mashina',
  'שיר אהבה בדואי': 'shir ahava bedoui yehudit ravitz',
  'עכשיו מאוחר': 'achshav meuchar aviv geffen',
  'קרב ירדן הקסום': 'krav yarden meir ariel',
  'בו': 'bo idan raichel',
  'שיר המעלות': 'shir hamaalot hadag nahash',
  'לונדון': 'london berry sakharof',
  'הדרך הארוכה': 'haderech haaruka matti caspi',
  'שתי דקות': 'shtey dakot omer adam',
  'בלדה לחובש': 'balada lahovesh shalom hanoch',
  'שמש של שלום': 'shemesh shel shalom gidi gov',
  'ציפור': 'tsipor hanan ben ari',
  'Set Me Free': 'set me free noa kirel',
  'אל גינת אגוז': 'el ginat egoz ethnix',
  'נעילה': 'neila arik lavi',
  'כואב לי הגוף': 'koev li haguf tipex',
  'הילד של אמא': 'hayeled shel ima asaf amdursky',
  'שיר הפראיירים': 'shir hafraiierim danny sanderson',
  'ליל הרצח': 'leil haretzach aviv geffen',
  'מוכרח שתדעי': 'muhrach shetedi idan haviv',
  'שיר מלחמה': 'shir milchama izhar ashdot',
  'כאילו': 'keilu keren peles',
  'דיווה': 'diva dana international',
  'לשתות אותך': 'lishtot otach rami kleinstein',
  'דואר שמח': 'doar sameach yigal bashan',
  'עיניים שלי': 'einayim sheli nurit galron',
  'אבניבי': 'abanibi ilanit',
  'מכתב קטן': 'michtav katan boaz sharabi',
  'מלך העולם': 'melech haolam dudu aharon',
  'עוד לא אהבתי די': 'od lo ahavti dai shlomo artzi',
  'הכל אותו דבר': 'hakol oto davar arkadi duchin',
  'רק אמור': 'rak emor eyal golan',
  'פרפרים': 'parparim yehudit ravitz',
  'לילה בא': 'laila ba shalom hanoch',
  'מדורת חבר': 'medurat chaver danny robas',
  'רוקד עם דמעות': 'roked im dmaot nathan goshen',
  'הפצצה': 'haptsatsa rami fortis',
  'נסיכה': 'nesicha eden ben zaken',
  'שיכורה': 'shikora haknesia hahamishit',
  'כל העולם כולו': 'kol haolam kulo ehud banai',
  'התקווה': 'hatikva subliminal',
  'על נהרות בבל': 'al naharot bavel hayehudim',
  'דון דון': 'don don anna zak',
  'שמש': 'shemesh mosh ben ari',
  'שיר תימני': 'shir temani margalit tsanani',
  'לא עוזב את הבית': 'lo ozev et habait shlomo artzi',
  'תפוחי זהב': 'tapuchei zahav muki',
  'סילבר': 'silver static ben el',
  'ארץ חדשה': 'eretz chadasha ivri lider',
  'פעם בשנה': 'paam bashana shalom hanoch meir ariel',
  'שיר הסטודנט': 'shir hastudent hagashash hahiver',
  'סע לאט מותק': 'sa leat motek dikla',
  'הולך סתם': 'holech stam idan raichel',
  'מרים': 'miriam shlomo gronich',
  'בניין': 'binyan tuna',
  'ילד טוב': 'yeled tov ravid plotnik',
  'לא מפסיקות': 'lo mafsiikot habanot nechama',
  'כלנית': 'kalanit shoshana damari',
  'בכל לבי': 'bechol libi dudu tassa',
  'סמי': 'sami teapacks',
  'כאפות': 'kaapot hadag nahash',
  'חומוס ופלאפל': 'hummus falafel rockfour',
};

async function main() {
  console.log('\n🔍 Smart Deezer Search for Missing Songs\n');

  const questions = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf8'));
  const missing = questions.filter(q => !q.deezerId);
  console.log(`Missing: ${missing.length} songs\n`);

  let found = 0;
  let notFound = 0;

  for (const q of missing) {
    process.stdout.write(`"${q.songTitle}" - ${q.artist}... `);

    // Strategy 1: Hebrew title + artist
    let tracks = await searchDeezer(`${q.songTitle} ${q.artist}`);
    await sleep(120);

    // Strategy 2: Just Hebrew title
    if (tracks.length === 0) {
      tracks = await searchDeezer(q.songTitle);
      await sleep(120);
    }

    // Strategy 3: Transliterated search
    if (tracks.length === 0 && MANUAL_MAPPINGS[q.songTitle]) {
      tracks = await searchDeezer(MANUAL_MAPPINGS[q.songTitle]);
      await sleep(120);
    }

    if (tracks.length > 0) {
      const best = tracks[0];
      q.deezerId = best.id;
      console.log(`✅ Found: ${best.title} - ${best.artist?.name} (ID: ${best.id})`);
      found++;
    } else {
      console.log(`❌ Not found`);
      notFound++;
    }
  }

  fs.writeFileSync(QUESTIONS_PATH, JSON.stringify(questions, null, 2) + '\n');

  console.log('\n' + '═'.repeat(50));
  console.log(`✅ Newly found:  ${found}`);
  console.log(`❌ Still missing: ${notFound}`);
  console.log(`📊 Total coverage: ${questions.filter(q => q.deezerId).length}/${questions.length}`);
  console.log('═'.repeat(50) + '\n');
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
