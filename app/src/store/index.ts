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
    delete meta.Updated;
    delete meta.Status;
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
    sortBy: '',
    filters: {
      genres: [],
      platforms: [],
      averageSession: [],
      tags: [],
      multiplayer: [],
      madeWith: [],
      languages: []
    }
  },
  getters: {

    gamesWithMeta(state): Game[] {
      return state.games.map(g => {
        return { ...g, meta: state.gameMeta[g.id] };
      });
    },

    filteredGames(state, getters): Game[] {
      let games = [...getters.gamesWithMeta] as Game[];

      games = filterGames(games, state.filters.genres, 'Genre');
      games = filterGames(games, state.filters.platforms, 'Platforms');
      games = filterGames(games, state.filters.averageSession, 'Average session');
      games = filterGames(games, state.filters.tags, 'Tags');
      games = filterGames(games, state.filters.multiplayer, 'Multiplayer');
      games = filterGames(games, state.filters.madeWith, 'Made with');
      games = filterGames(games, state.filters.languages, 'Languages');

      if( state.sortBy === 'rating' ) {
        games = games.sort((a, b) => {
          const ra = Math.trunc(((a.meta.Rating ? +a.meta.Rating.total : 0) / 100) + 1) * (a.meta.Rating ? +a.meta.Rating.value : 0);
          const rb = Math.trunc(((b.meta.Rating ? +b.meta.Rating.total : 0) / 100) + 1) * (b.meta.Rating ? +b.meta.Rating.value : 0);
          return rb - ra;
        })
      } else if( state.sortBy === 'random' ) {
        games = games.sort(() => Math.random() - 0.5);
      } else if( state.sortBy === 'price' ) {
        games = games.sort((a,b) => +(b.price || '0').replace('$', '') - +(a.price || '0').replace('$', ''))
      }

      return games;
    },

    paginatedGames(state, getters): Game[] {
      return getters.filteredGames.slice(0, state.gamesToShow);
    },

    genres(state): string[] {
      return getUniqueMetaValues(state.gameMeta, 'Genre');
    },

    platforms(state): string[] {
      return getUniqueMetaValues(state.gameMeta, 'Platforms');
    },

    averageSession(state): string[] {
      return getUniqueMetaValues(state.gameMeta, 'Average session');
    },

    tags(state): string[] {
      return getUniqueMetaValues(state.gameMeta, 'Tags');
    },

    multiplayer(state): string[] {
      return getUniqueMetaValues(state.gameMeta, 'Multiplayer');
    },

    madeWith(state): string[] {
      return getUniqueMetaValues(state.gameMeta, 'Made with');
    },

    languages(state): string[] {
      return getUniqueMetaValues(state.gameMeta, 'Languages');
    },

  },
  mutations: {

    loadMoreGames(state) {
      state.gamesToShow = Math.min(state.gamesToShow + PAGE_SIZE, state.games.length);
    },

    changeSortBy(state, sortBy) {
      state.sortBy = sortBy;
    },

    filterGenres(state, genres) {
      state.filters.genres = genres;
    },

    filterPlatforms(state, platforms) {
      state.filters.platforms = platforms;
    },

    filterAverageSession(state, averageSession) {
      state.filters.averageSession = averageSession;
    },

    filterTags(state, tags) {
      state.filters.tags = tags;
    },

    filterMultiplayer(state, multiplayer) {
      state.filters.multiplayer = multiplayer;
    },

    filterMadeWith(state, madeWith) {
      state.filters.madeWith = madeWith;
    },

    filterLanguages(state, languages) {
      state.filters.languages = languages;
    },

  },
  actions: {},
  modules: {}
});
