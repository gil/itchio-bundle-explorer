<template>
  <nav class="panel is-primary">
    <p class="panel-heading">
      Filters
    </p>
    <div class="panel-block">
      <div class="block">

        <div class="field">
          <label class="label">Genres</label>
          <div class="control">
            <b-checkbox
              v-for="genre in genres"
              :key="genre"
              v-model="filteredGenres"
              :native-value="genre"
              size="is-small"
              >
              {{ genre }}
            </b-checkbox>
          </div>
        </div>

      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapGetters, mapMutations } from 'vuex';

@Component({
  computed:{
    ...mapGetters([
      'genres',
    ]),
    ...mapState([
      'filters',
    ]),
  },
  methods: mapMutations([
    'filterGenres'
  ]),
})
export default class Filters extends Vue {
  filters!: any;
  filterGenres!: (genres: string[]) => void;

  get filteredGenres(): string[] {
    return this.filters.genres;
  }

  set filteredGenres(genres: string[]) {
    this.filterGenres(genres);
  }
}
</script>
