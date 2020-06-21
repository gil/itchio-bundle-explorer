<template>
  <div id="app">
    <header class="section">
      <h1 class="title">
        <Logo class="logo" alt="itch.io" />
        Bundle for Racial Justice and Equality
      </h1>
      <h2 class="subtitle">
        A bundle hosted by
        <a href="https://itch.io/" target="_blank">itch.io</a>
        with content from 1391 creators.
      </h2>
    </header>

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
import Logo from './assets/logo.svg';

@Component({
  components: {
    Logo,
    Games,
    Filters,
  }
})
export default class App extends Vue {}
</script>

<style scoped>
header {
  padding-bottom: 0;
}

.logo {
  width: 45px;
  height: 35px;
}
</style>
