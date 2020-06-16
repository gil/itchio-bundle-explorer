import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

async function processGame(url) {
  const gameData = {};
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  $('.game_info_panel_widget tr').each((_, row) => {
    const $tds = $(row).find('td');
    const fieldName = $($tds[0]).text().trim();

    const $valueTd = $($tds[1]);
    const $valueLinks = $valueTd.find('a');
    let fieldValue = null;

    if( fieldName === 'Rating' ) {
      fieldValue = {
        value: $valueTd.find('.aggregate_rating').attr('title'),
        total: $valueTd.find('.rating_count').attr('content')
      };
    } else if ( $valueLinks.length ) {
      fieldValue = $valueLinks.toArray().map(l => {
        return {
          text: $(l).text().trim(),
          url: $(l).attr('href').trim()
        };
      });
    } else {
      fieldValue = $valueTd.text().trim();
    }

    gameData[ fieldName ] = fieldValue;
  });

  return gameData;
}

function readGames() {
  return JSON.parse(fs.readFileSync('../games.json')).games;
}

function readData() {
  try {
    return JSON.parse(fs.readFileSync('data.json'));
  } catch(e) {
    return {};
  }
}

function saveData(data) {
  fs.writeFileSync('data.json', JSON.stringify(data, null, '\t'));
}

async function start() {
  const games = readGames();
  const data = readData();

  for( var i = 0 ; i < games.length ; i++ ) {
    const game = games[i];
    const hasData = !!data[game.id];
    if( hasData ) {
      console.log(`Skipping ${ game.id } (${ game.title }) from ${ game.url }`);
    } else {
      console.log(`Reading ${ game.id } (${ game.title }) from ${ game.url }`);
      try {
        data[game.id] = await processGame(game.url);
        saveData(data);
      } catch (e) {
        console.error(e);
      }
    }
  }
}

start();
