<template>
  <nav class="panel is-primary">
    <p class="panel-heading">
      Filters
    </p>
    <div class="panel-block">
      <div class="block">

        <FilterField
          field-label="Genres"
          field="genres"
          mutation="filterGenres"
        />

        <FilterField
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
import FilterField from './FilterField.vue';

@Component({
  components: {
    FilterField,
  },
})
export default class Filters extends Vue { }
</script>
