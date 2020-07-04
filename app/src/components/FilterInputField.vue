<template>
  <div class="field">
    <b-field :label="fieldLabel">
      <b-input
        v-model="filterModel"
        placeholder="Search..."
        type="search"
        icon="magnify"
      />
    </b-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class FilterInputField extends Vue {
  @Prop({ type: String, required: true }) field!: string;
  @Prop({ type: String, required: true }) fieldLabel!: string;
  @Prop({ type: String, required: true }) mutation!: string;

  filter = '';
  filterTimeout = -1;

  get filterModel(): string {
    return this.filter;
  }

  set filterModel(filter: string) {
    this.filter = filter;
    this.applyFilter();
  }

  applyFilter() {
    clearTimeout(this.filterTimeout);
    this.filterTimeout = setTimeout(() => {
      this.$store.commit(this.mutation, this.filter);
      this.$store.commit('resetPagination');
    }, 500);
  }
}
</script>
