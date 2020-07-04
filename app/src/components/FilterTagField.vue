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
        placeholder="Select..."
        @typing="updateFilteredTags"
      >
      </b-taginput>
    </b-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class FilterTagField extends Vue {
  @Prop({ type: String, required: true }) field!: string;
  @Prop({ type: String, required: true }) fieldLabel!: string;
  @Prop({ type: String, required: true }) mutation!: string;

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
    this.$store.commit('resetPagination');
    this.$store.commit(this.mutation, selected);
  }
}
</script>
