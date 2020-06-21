<template>
  <div class="field">
    <b-field :label="fieldLabel">
      <b-taginput
        v-model="selectedFilters"
        :data="filteredTags"
        autocomplete
        :allow-new="false"
        :open-on-focus="false"
        icon="label"
        placeholder="Select a tag"
        @typing="updateFilteredTags"
      >
      </b-taginput>
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
export default class FilterTagField extends Vue {
  field!: string;
  mutation!: string;
  filteredTags: string[] = [];

  updateFilteredTags(text: string) {
    this.filteredTags = this.$store.getters[this.field].filter((tag: string) => {
      return tag
        .toString()
        .toLowerCase()
        .indexOf(text.toLowerCase()) >= 0
    });
  }

  get selectedFilters(): string[] {
    return this.$store.state.filters[this.field];
  }

  set selectedFilters(selected: string[]) {
    this.$store.commit(this.mutation, selected);
  }
}
</script>
