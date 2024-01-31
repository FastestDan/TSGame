<script setup lang="ts">
import PhaserGame from 'nuxtjs-phaser/phaserGame.vue'
import { getGame } from '@/game'

const game = () => getGame()
</script>

<template>
  <div class="game">
    <PhaserGame :createGame="game" v-if="game" />
  </div>
</template>

<style scoped>
.game img {
  position: absolute;
  width: 50rem;
}

.buttons {
  display: inline;
  position: absolute;
  left: 28rem;
  top: 7rem;
  z-index: 1;
}

button {
  background-color: #fff;
  border: none;
  color: black;
  padding: 0.5rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  border-radius: 8px;
  font-weight: 500;
}

button:hover {
  background-color: tomato;
  font-weight: 500;
}
</style>
