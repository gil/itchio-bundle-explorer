import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    games: require('../../../games.json').games,
    gameMeta: require('../../../data.json'),
    gamesToShow: 30,
    filters: {
      genres: []
    }
  },
  getters: {

    filteredGames(state) {
      return state.games
        .map((g: any) => {
          return { ...g, meta: state.gameMeta[g.id] };
        })
        .filter((g: any) => {
          if( !state.filters.genres.length ) {
            return true;
          }
          // TODO: UGH!
          return !!( g.meta.Genre && g.meta.Genre.find((genre: any) => genre.text === state.filters.genres[0]) );
        })
        .sort((a: any, b: any) => {
          const ra = (((a.meta.Rating ? +a.meta.Rating.total : 0) / 100) + 1) * (a.meta.Rating ? +a.meta.Rating.value : 0);
          const rb = (((b.meta.Rating ? +b.meta.Rating.total : 0) / 100) + 1) * (b.meta.Rating ? +b.meta.Rating.value : 0);
          return rb - ra;
        })
        .slice(0, state.gamesToShow);
    },

    genres(state) {
      const genres = new Set();
      Object.entries(state.gameMeta).forEach(([, meta]) => {
        ((meta as any).Genre || []).forEach((genre: any) => {
          genres.add(genre.text);
        });
      });
      return [...genres].sort();
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
