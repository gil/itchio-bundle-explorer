<template>
  <div id="app">
    <section class="section">
      <h1 class="title">Bundle for Racial Justice and Equality</h1>
      <h2 class="subtitle">
        A bundle hosted by
        <a href="https://itch.io/" target="_blank">itch.io</a>
        with content from 1391 creators.
      </h2>
    </section>

    <section class="section">
      <div class="columns">
        <div class="column is-3">
          <Filters />
        </div>
        <div class="column">
          <Games />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Games from './components/Games.vue';
import Filters from './components/Filters.vue';

@Component({
  components: {
    Games,
    Filters,
  }
})
export default class App extends Vue {}
</script>
