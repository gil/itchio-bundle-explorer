<template>
  <nav class="panel is-primary">
    <p class="panel-heading">
      Filters
    </p>
    <div class="panel-block">
      <div class="block">

        <FilterCheckField
          field-label="Genres"
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
          field-label="Platforms"
          field="platforms"
          mutation="filterPlatforms"
        />

      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FilterCheckField from './FilterCheckField.vue';
import FilterTagField from './FilterTagField.vue';

@Component({
  components: {
    FilterCheckField,
    FilterTagField,
  },
})
export default class Filters extends Vue { }
</script>
