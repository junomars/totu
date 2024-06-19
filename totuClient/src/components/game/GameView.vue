<script lang="ts">
import Site from "@/components/game/board/Site.vue";
import {SiteType} from "@/composables/Site";
import {Board} from "@/model/game/Board";
import { PropType } from 'vue';
import GameBoard from "@/components/game/board/GameBoard.vue";
import {TroopType} from "@/model/game/TroopType";

export default {
  components: {GameBoard},
  props: {
    board: {
      type: Object as PropType<Board>,
      required: false
    }
  }
}
</script>

<template>
  <v-layout>
    <v-main class="v-main d-flex align-center justify-center play-area" style="min-height: calc(100vh - 65px);">
      <v-layout class="v-layout">
        <GameBoard v-if="board" :board="board"></GameBoard>
      </v-layout>
    </v-main>
  </v-layout>
</template>

<style scoped>
@font-face {
  font-family: 'Modesto Condensed Bold';
  src: url('../../assets/fonts/Modesto Condensed Bold.ttf') format('truetype');
}

.v-main {
  background-color: darkslategrey;
}

.v-layout {
  width: 100%;
  height: 100%;
  background-image: url('@/assets/background_1.jpg')
}
</style>
