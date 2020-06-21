<template>
  <div class="field">
    <b-field :label="fieldLabel">
      <div class="control">
        <b-checkbox
          v-for="filter in availableFilters"
          :key="filter"
          v-model="selectedFilters"
          :native-value="filter"
          size="is-small"
          >
          {{ filter }}
        </b-checkbox>
      </div>
    </b-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    fieldLabel: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    mutation: {
      type: String,
      required: true,
    },
  },
})
export default class FilterCheckField extends Vue {
  field!: string;
  mutation!: string;

  get availableFilters(): string[] {
    return this.$store.getters[this.field];
  }

  get selectedFilters(): string[] {
    return this.$store.state.filters[this.field];
  }

  set selectedFilters(selected: string[]) {
    this.$store.commit(this.mutation, selected);
  }
}
</script>
