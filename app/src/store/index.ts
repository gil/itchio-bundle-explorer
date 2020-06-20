import Vue from 'vue';
import Vuex from 'vuex';
import { GameMetas, GameMeta, Game } from '@/types';

const PAGE_SIZE = 30;

Vue.use(Vuex);

function getGames(): Game[] {
  return require('../../../games.json').games;
}

function getGameMetas(): GameMetas {
  const gameMetas = require('../../../data.json') as GameMetas;

  // Fix types
  const gameMetaEntries: [string, GameMeta][] = Object.entries(gameMetas);
  gameMetaEntries.forEach(([, meta]) => {
    if( meta.Rating ) {
      meta.Rating.value = +meta.Rating.value;
    }
  });

  return gameMetas;
}

function getUniqueMetaValues(gameMetas: GameMetas, prop: keyof GameMeta): string[] {
  const values = new Set();
  const gameMetaEntries: [string, GameMeta][] = Object.entries(gameMetas);
  gameMetaEntries.forEach(([, meta]) => {
    (meta[prop] as [] || []).forEach((metaItem: { text: string }) => {
      values.add(metaItem.text);
    });
  });
  return [...values].sort() as string[];
}

function filterGames(games: Game[], filters: string[], field: keyof GameMeta): Game[] {
  if( !filters.length ) {
    return games;
  }
  return games.filter(g => {
    if( !g.meta[field] ) return false;
    for( const filterText of filters ) {
      if( !(g.meta[field] as { text: string }[]).find(metaItem => metaItem.text === filterText) ) {
        return false;
      }
    }
    return true;
  });
}

export default new Vuex.Store({
  state: {
    games: getGames(),
    gameMeta: getGameMetas(),
    gamesToShow: PAGE_SIZE,
    filters: {
      genres: [],
      platforms: [],
    }
  },
  getters: {

    gamesWithMeta(state): Game[] {
      return state.games.map(g => {
        return { ...g, meta: state.gameMeta[g.id] };
      });
    },

    filteredGames(state, getters): Game[] {
      let games = getters.gamesWithMeta as Game[];

      games = filterGames(games, state.filters.genres, 'Genre');
      games = filterGames(games, state.filters.platforms, 'Platforms');

      return games
        .sort((a, b) => {
          const ra = (((a.meta.Rating ? +a.meta.Rating.total : 0) / 100) + 1) * (a.meta.Rating ? +a.meta.Rating.value : 0);
          const rb = (((b.meta.Rating ? +b.meta.Rating.total : 0) / 100) + 1) * (b.meta.Rating ? +b.meta.Rating.value : 0);
          return rb - ra;
        })
        .slice(0, state.gamesToShow);
    },

    genres(state): string[] {
      return getUniqueMetaValues(state.gameMeta, 'Genre');
    },

    platforms(state): string[] {
      return getUniqueMetaValues(state.gameMeta, 'Platforms');
    },

  },
  mutations: {

    loadMoreGames(state) {
      state.gamesToShow = Math.min(state.gamesToShow + PAGE_SIZE, state.games.length);
    },

    filterGenres(state, genres) {
      state.filters.genres = genres;
    },

    filterPlatforms(state, platforms) {
      state.filters.platforms = platforms;
    },

  },
  actions: {},
  modules: {}
});
