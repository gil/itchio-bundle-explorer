import Vue from 'vue';
import Vuex from 'vuex';
import { GameMetas, GameMeta, Game } from '@/types';

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

export default new Vuex.Store({
  state: {
    games: getGames(),
    gameMeta: getGameMetas(),
    gamesToShow: 30,
    filters: {
      genres: []
    }
  },
  getters: {

    filteredGames(state): Game[] {
      return state.games
        .map(g => {
          return { ...g, meta: state.gameMeta[g.id] };
        })
        .filter(g => {
          if( !state.filters.genres.length ) {
            return true;
          }
          // TODO: UGH!
          return !!( g.meta.Genre && g.meta.Genre.find(genre => genre.text === state.filters.genres[0]) );
        })
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

  },
  mutations: {

    loadMoreGames(state) {
      state.gamesToShow = Math.min(state.gamesToShow + 30, state.games.length);
    },

    filterGenres(state, genres) {
      state.filters.genres = genres;
    },

  },
  actions: {},
  modules: {}
});
