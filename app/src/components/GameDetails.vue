<template>
  <b-modal :active.sync="isVisible" :width="640" scroll="keep" animation="">
    <div v-if="game" class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img :src="game.cover" :alt="game.title">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ game.title }}</p>
            <p class="subtitle is-6">
              <a :href="game.user.url" target="_blank">
                {{ game.user.name }}
              </a>
            </p>
          </div>
        </div>

        <div class="content">
          {{ game.short_text }}

          <ul>
            <li
              v-for="(value, name) in game.meta"
              :key="name"
            >
              <strong>{{ name }}: </strong>

              <span v-if="Array.isArray(value)">
                <a
                  v-for="(item, index) in value"
                  :key="index"
                  :href="item.url"
                  target="_blank"
                >
                  <span v-if="index > 0">&bull;</span>
                  {{ item.text }}
                </a>
              </span>

              <span v-else-if="name === 'Rating'">
                {{ value.value }} ({{ value.total }} ratings)
              </span>

              <span v-else>
                {{ value }}
              </span>
            </li>
          </ul>

          <small>* This data is a snapshot, for updated information check the game page.</small>
        </div>

        <footer class="card-footer">
          <a :href="game.url" class="card-footer-item" target="_blank">Open</a>
        </footer>
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Game } from '../types';

@Component({
  props: {
    game: {
      type: Object,
      required: false,
    },
  },
})
export default class GameDetails extends Vue {
  game!: Game | null;

  get isVisible(): boolean {
    return !!this.game;
  }

  set isVisible(visible: boolean) {
    if( !visible ) {
      this.$emit('closeDetails');
    }
  }
}
</script>
