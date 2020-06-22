<template>
  <div class="field">
    <b-field label="Sort by">
      <b-select
        v-model="sortByModel"
        placeholder="Sort by"
      >
        <option
          v-for="option in sortOptions"
          :value="option.value"
          :key="option.value"
        >
          {{ option.label }}
        </option>
      </b-select>
    </b-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapMutations } from 'vuex';

@Component({
  computed: mapState([
    'sortBy'
  ]),
  methods: mapMutations([
    'changeSortBy'
  ]),
})
export default class SortBy extends Vue {
  sortBy!: string;
  changeSortBy!: (value: string) => void;
  sortOptions = [
    { label: 'Default', value: '' },
    { label: 'Rating', value: 'rating' },
    { label: 'Surprise me', value: 'random' },
    { label: 'Price', value: 'price' },
  ];

  get sortByModel(): string {
    return this.sortBy;
  }

  set sortByModel(value: string) {
    this.$store.commit('resetPagination');
    this.changeSortBy(value);
  }
}
</script>
