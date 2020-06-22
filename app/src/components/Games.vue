<template>
  <div>
    <ul>
      <li
        v-for="game in paginatedGames"
        :key="game.id"
      >
        <a :href="game.url" target="_blank">
          <img
            :src="game.cover"
            :alt="game.title"
            width="300"
            height="240"
            loading="lazy"
            decoding="async"
          />
        </a>

        <div>
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <h3>{{ game.title }}</h3>
              </div>
            </div>
            <div class="level-right">
              <div
                v-if="game.price"
                class="level-item"
              >
                {{ game.price }}
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="game.meta.Rating"
        >
          <b-rate
            v-model="game.meta.Rating.value"
            icon-pack="mdi"
            icon="star"
            :max="5"
            :show-score="true"
            :custom-text="`(${ game.meta.Rating.total })`"
            :disabled="true"
            />
        </div>

        <div>{{ game.short_text }}</div>

        <div v-if="game.meta.Genre">
          <b-icon icon="tag" size="is-small" />
          <a
            v-for="(genre, index) in game.meta.Genre"
            :key="genre.url"
            :href="genre.url"
            target="_blank"
          >
            <span v-if="index > 0">&bull;</span>
            {{ genre.text }}
          </a>
        </div>

        <b-icon icon="information" size="is-small" />
        <a href="#" @click.prevent="selectGame(game)">
          Game details
        </a>
      </li>
    </ul>

    <GameDetails
      :game="selectedGame"
      @closeDetails="selectGame(null)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters, mapMutations } from 'vuex';
import GameDetails from './GameDetails.vue';

@Component({
  components: {
    GameDetails,
  },
  computed: {
    ...mapGetters(['paginatedGames']),
  },
  methods: {
    ...mapMutations(['loadMoreGames']),
  }
})
export default class Games extends Vue {
  scrollTimeout = -1;
  loadMoreGames!: () => void;
  selectedGame: any = null;

  mounted() {
    this.listenToScrolling();
  }

  listenToScrolling() {
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      window.addEventListener('scroll', () => {
        if( document.documentElement.scrollTop >= document.documentElement.scrollHeight - window.innerHeight - 200 ) {
          this.loadMoreGames();
        }
      });
    },  500);
  }

  selectGame(game: any) {
    this.selectedGame = game;
  }
}
</script>

<style scoped>
h3 {
  font-weight: bold;
  max-width: 250px;
}

ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

li {
  font-size: 15px;
  width: 300px;
  margin-bottom: 50px;
}

.rate {
  margin-left: -3px;
}
</style>
