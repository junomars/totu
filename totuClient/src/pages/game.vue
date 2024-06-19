<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" title="Application bar"></v-app-bar>
    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <GameView :board="selectedBoard"></GameView>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import GameView from "@/components/game/GameView.vue";
import BoardService from "@/service/board-service";
import {Board} from "@/model/game/Board";
import {TroopType} from "@/model/game/TroopType";

export default {
  name: "test-view",
  components: {
    GameView
  },
  data() {
    return {
      boards: [] as string[],
      boardService: new BoardService(),
      selectedBoard: '',
    };
  },
  methods: {
  },
  mounted() {
  },
}
</script>
