// Fetch Deezer IDs for international songs
const songs = [
  { title: "La Bamba", artist: "Ritchie Valens" },
  { title: "Despacito", artist: "Luis Fonsi" },
  { title: "Gangnam Style", artist: "PSY" },
  { title: "99 Luftballons", artist: "Nena" },
  { title: "Macarena", artist: "Los del Rio" },
  { title: "La Vie en Rose", artist: "Edith Piaf" },
  { title: "Bella Ciao", artist: "" },
  { title: "Dragostea Din Tei", artist: "O-Zone" },
  { title: "Gasolina", artist: "Daddy Yankee" },
  { title: "Bamboleo", artist: "Gipsy Kings" },
  { title: "Livin La Vida Loca", artist: "Ricky Martin" },
  { title: "Waka Waka", artist: "Shakira" },
  { title: "Hips Dont Lie", artist: "Shakira" },
  { title: "Ai Se Eu Te Pego", artist: "Michel Telo" },
  { title: "Con Te Partiro", artist: "Andrea Bocelli" },
  { title: "Volare", artist: "Domenico Modugno" },
  { title: "Papaoutai", artist: "Stromae" },
  { title: "Alors on Danse", artist: "Stromae" },
  { title: "Sukiyaki", artist: "Kyu Sakamoto" },
  { title: "Du Hast", artist: "Rammstein" },
  { title: "Danza Kuduro", artist: "Don Omar" },
  { title: "Tunak Tunak Tun", artist: "Daler Mehndi" },
  { title: "Bailando", artist: "Enrique Iglesias" },
  { title: "Vivir Mi Vida", artist: "Marc Anthony" },
  { title: "Mas Que Nada", artist: "Sergio Mendes" },
  { title: "Non je ne regrette rien", artist: "Edith Piaf" },
  { title: "Chan Chan", artist: "Buena Vista Social Club" },
  { title: "Oye Como Va", artist: "Santana" },
  { title: "Clandestino", artist: "Manu Chao" },
  { title: "La Camisa Negra", artist: "Juanes" },
  { title: "Suavemente", artist: "Elvis Crespo" },
  { title: "Didi", artist: "Khaled" },
  { title: "Aicha", artist: "Khaled" },
  { title: "Ameno", artist: "Era" },
  { title: "Blue Da Ba Dee", artist: "Eiffel 65" },
  { title: "Barbie Girl", artist: "Aqua" },
  { title: "The Final Countdown", artist: "Europe" },
  { title: "Dancing Queen", artist: "ABBA" },
  { title: "Waterloo", artist: "ABBA" },
  { title: "Take On Me", artist: "a-ha" },
  { title: "Ievan Polkka", artist: "Loituma" },
  { title: "Formidable", artist: "Stromae" },
  { title: "Djadja", artist: "Aya Nakamura" },
  { title: "La Isla Bonita", artist: "Madonna" },
  { title: "Maria Maria", artist: "Santana" },
  { title: "Feliz Navidad", artist: "Jose Feliciano" },
  { title: "Besame Mucho", artist: "Andrea Bocelli" },
  { title: "La Tortura", artist: "Shakira" },
  { title: "Ella Baila Sola", artist: "Eslabon Armado" },
  { title: "Bidi Bidi Bom Bom", artist: "Selena" },
  { title: "Como La Flor", artist: "Selena" },
  { title: "Conga", artist: "Gloria Estefan" },
  { title: "Ne Me Quitte Pas", artist: "Jacques Brel" },
  { title: "Les Champs Elysees", artist: "Joe Dassin" },
  { title: "Voyage Voyage", artist: "Desireless" },
  { title: "Hijo de la Luna", artist: "Mecano" },
  { title: "Asereja", artist: "Las Ketchup" },
  { title: "Rock Me Amadeus", artist: "Falco" },
  { title: "Der Kommissar", artist: "Falco" },
  { title: "Major Tom", artist: "Peter Schilling" },
  { title: "Lambada", artist: "Kaoma" },
  { title: "Return to Innocence", artist: "Enigma" },
  { title: "Sadeness", artist: "Enigma" },
  { title: "Bailamos", artist: "Enrique Iglesias" },
  { title: "Nessun Dorma", artist: "Luciano Pavarotti" },
  { title: "O Sole Mio", artist: "Luciano Pavarotti" },
  { title: "Chantaje", artist: "Shakira" },
  { title: "Mi Gente", artist: "J Balvin" },
  { title: "Dura", artist: "Daddy Yankee" },
  { title: "Dynamite", artist: "BTS" },
  { title: "Butter", artist: "BTS" },
  { title: "Genie", artist: "Girls Generation" },
  { title: "Gangsta Paradise", artist: "Coolio" },
  { title: "Roxanne", artist: "The Police" },
  { title: "Ca plane pour moi", artist: "Plastic Bertrand" },
  { title: "Mas Que Nada", artist: "Jorge Ben" },
  { title: "Girl from Ipanema", artist: "Stan Getz" },
  { title: "Guantanamera", artist: "Celia Cruz" },
  { title: "La Cucaracha", artist: "" },
  { title: "El Condor Pasa", artist: "Simon Garfunkel" },
  { title: "Dale Don Dale", artist: "Don Omar" },
  { title: "Amore mio aiutami", artist: "" },
  { title: "Quando Quando Quando", artist: "Tony Renis" },
  { title: "Que Sera Sera", artist: "Doris Day" },
  { title: "Malamente", artist: "Rosalia" },
  { title: "Con Altura", artist: "Rosalia" },
  { title: "Safaera", artist: "Bad Bunny" },
  { title: "Dákiti", artist: "Bad Bunny" },
  { title: "Titi Me Pregunto", artist: "Bad Bunny" },
  { title: "Pepas", artist: "Farruko" },
  { title: "Llorando Se Fue", artist: "Kaoma" },
  { title: "Todo de Ti", artist: "Rauw Alejandro" },
  { title: "Obsesion", artist: "Aventura" },
  { title: "Reggaeton Lento", artist: "CNCO" },
  { title: "Vivir La Vida", artist: "Marc Anthony" },
];

const delay = ms => new Promise(r => setTimeout(r, ms));

async function search(title, artist) {
  const q = encodeURIComponent(`${title} ${artist}`.trim());
  try {
    const res = await fetch(`https://api.deezer.com/search?q=${q}&limit=3`);
    const data = await res.json();
    const track = data.data?.[0];
    return {
      title, artist,
      deezerId: track?.id ?? null,
      deezerTitle: track?.title ?? null,
      deezerArtist: track?.artist?.name ?? null,
      hasPreview: !!(track?.preview),
    };
  } catch (e) {
    return { title, artist, deezerId: null, error: e.message };
  }
}

const results = [];
for (const song of songs) {
  const r = await search(song.title, song.artist);
  results.push(r);
  console.log(`${r.deezerId ? '✓' : '✗'} ${song.title} - ${song.artist} => ${r.deezerId} (${r.deezerTitle} by ${r.deezerArtist})`);
  await delay(250);
}

console.log('\n\nJSON:');
console.log(JSON.stringify(results, null, 2));
