<template>
  <v-card
    class="mx-auto"
    max-width="800"
  >
    <v-form @submit.prevent="createGame">
      <v-text-field
        v-model="playerName"
        :rules="rules"
        label="Name"
      ></v-text-field>
      <v-select
        v-model="selectedMap"
        :disabled="!isFetchMapsComplete"
        :items="maps"
        density="compact"
        label="Maps">
      </v-select>
      <v-btn :disabled="!isFetchMapsComplete" block class="mt-2" type="submit">Create Game</v-btn>
      <div style="display: flex; align-items: center; width: 100%">
        <v-btn disabled style="flex-grow: 1;" type="submit">Join Game</v-btn>
        <v-btn icon="mdi-refresh" type="button" @click="refreshMaps"/>
      </div>
    </v-form>
    <v-list
      :items="games"
      item-value="name"
      lines="two">
      <v-list-item v-for="game in games" :key="game.id">
        <v-list-item-content>
          <v-list-item-title>{{ game.id }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import BoardService from "@/service/board-service";
import GameService from "@/service/game-service";
import {GameOrientation} from "@/generated/game/GameOrientation";
import {Game} from "@/generated/game/Game";

export default {
  name: 'hub',
  data() {
    return {
      playerName: 'Tyrant',
      players: 2,
      selectedMap: '',
      maps: [] as string[],
      orientation: GameOrientation.LEFT,
      games: [] as Game[],
      rules: [],
      boardService: new BoardService(),
      gameService: new GameService(),
      isFetchMapsComplete: false
    }
  },
  methods: {
    isThreePlayer() {
      return this.players === 3;
    },
    createGame() {
      console.log("Create game called.")
      const firstUnderscoreIndex = this.selectedMap.indexOf('_')
      const lastUnderscoreIndex = this.selectedMap.lastIndexOf('_')
      let gameMap = this.selectedMap.substring(0, firstUnderscoreIndex)
      let playerCount: number
      let gameOrientation: GameOrientation;

      if (firstUnderscoreIndex == lastUnderscoreIndex) {
        // 2 or 4 player game
        playerCount = Number(this.selectedMap.substring(firstUnderscoreIndex + 1))
        gameOrientation = GameOrientation.CENTER
      } else {
        // 3 player game
        gameMap = this.selectedMap.substring(0, firstUnderscoreIndex)
        playerCount = Number(this.selectedMap.substring(firstUnderscoreIndex + 1, lastUnderscoreIndex))
        gameOrientation = GameOrientation[this.selectedMap.substring(lastUnderscoreIndex + 1) as keyof typeof GameOrientation]
      }

      this.gameService.createGame({
        playerName: this.playerName,
        map: gameMap,
        playerCount,
        gameOrientation
      })
    },
    refreshMaps() {
      this.isFetchMapsComplete = false;
      this.boardService.fetchAllBoards()
        .then(it => {
          if (it) {
            this.maps = it;
            this.selectedMap = it[0]
          } else {
            console.log("No maps found!");
          }
        }).catch(console.error)
        .finally(() => {
          this.isFetchMapsComplete = true;
        });
    }
  },
  mounted() {
    this.refreshMaps();
  },
}
</script>

<style scoped>

</style>
