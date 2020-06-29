<template>
  <nav class="panel is-primary">
    <p class="panel-heading">
      Filter ({{ filteredGames.length}} items)
    </p>
    <div class="panel-block">
      <div class="block">

        <SortBy />

        <FilterCheckField
          field-label="Genre"
          field="genres"
          mutation="filterGenres"
        />

        <FilterTagField
          field-label="Tags"
          field="tags"
          mutation="filterTags"
        />

        <FilterCheckField
          field-label="Average Session"
          field="averageSession"
          mutation="filterAverageSession"
        />

        <FilterCheckField
          field-label="Multiplayer"
          field="multiplayer"
          mutation="filterMultiplayer"
        />

        <FilterCheckField
          field-label="Platform"
          field="platforms"
          mutation="filterPlatforms"
        />

        <FilterTagField
          field-label="Language"
          field="languages"
          mutation="filterLanguages"
        />

        <FilterTagField
          field-label="Made With"
          field="madeWith"
          mutation="filterMadeWith"
        />

      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import Games from './Games.vue';
import SortBy from './SortBy.vue';
import FilterCheckField from './FilterCheckField.vue';
import FilterTagField from './FilterTagField.vue';

@Component({
  components: {
    SortBy,
    FilterCheckField,
    FilterTagField,
  },
})
export default class Filters extends Vue {
  @Getter filteredGames!: Games[];
}
</script>
