<template>
  <div>
    <ul>
      <li v-for="game in filteredGames" :key="game.id">
        <h3>{{ game.title }}</h3>
        <a :href="game.url" target="_blank">
          <img :src="game.cover" />
        </a>
        <div v-if="game.meta.Rating">
          <!--<strong>Rating:</strong>-->
          <b-rate
            v-model="game.meta.Rating.value"
            icon-pack="mdi"
            icon="star"
            :max="5"
            :show-score="true"
            :custom-text="`(${ game.meta.Rating.total }) ${ game.price ? ' - ' + game.price : '' }`"
            :disabled="true"
          />
        </div>
        <!--<div v-if="game.price">-->
          <!--<strong>Price:</strong>-->
          <!--{{ game.price }}-->
        <!--</div>-->
        <div>
          <a
            v-for="(genre, index) in game.meta.Genre"
            :key="genre.url"
            :href="genre.url"
            target="_blank"
          >
            <span v-if="index > 0">.</span>
            {{ genre.text }}
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters, mapMutations } from 'vuex';

@Component({
  computed: {
    ...mapGetters(['filteredGames']),
  },
  methods: {
    ...mapMutations(['loadMoreGames']),
  }
})
export default class Games extends Vue {
  scrollTimeout = -1;
  loadMoreGames!: () => void;

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
}
</script>

<style scoped>
li {
  display: inline-block;
  margin: 10px;
  width: 300px;
  vertical-align: top;
}
</style>
