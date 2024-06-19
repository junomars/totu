<template>
  <v-btn
    icon="$vuetify"
    class="v-btn my-btn"
    :style="buttonStyle"
    @click="logClick">
  </v-btn>
</template>

<script lang="ts">
import {defineComponent, PropType, toRefs} from 'vue';
import {GRAPH_CONFIG} from "@/config/constants";
import {TroopType} from "@/model/game/TroopType";
import {TroopSpace} from "@/model/game/TroopSpace";

export default defineComponent({
  name: 'TroopButton',
  props: {
    id: {
      type: String,
      required: true
    },
    x: {
      type: Number,
      required: false
    },
    y: {
      type: Number,
      required: false
    },
    troopSpace: {
      type: Object as PropType<TroopSpace>,
      required: true
    },
  },
  computed: {
    getTroopTypeColor() {
      if (this.troopSpace.deployedTroop === undefined) {
        // handle error here, for example, return some default color or throw an error.
      } else {
        switch (this.troopSpace.deployedTroop) {
          case TroopType.NEUTRAL:
            return 'white';
          case TroopType.BAENRAE:
            return 'black';
          case TroopType.BARRISON:
            return 'red';
          case TroopType.MYZZRIM:
            return 'orange';
          case TroopType.XORLARRIN:
            return 'blue';
          case TroopType.NONE:
            return 'none';
          default:
            // Handle default case here
            return 'transparent';
        }
      }
    },
    buttonStyle() {
      let {borderSize,  troopSpaceRadius} = GRAPH_CONFIG;
      let borderPx = `${borderSize}px solid white`;
      let dimension = `${troopSpaceRadius * 2}px`;
      let positionPx = (pos: number) => `${pos}px`;

      if (this.troopSpace === undefined) {
        // handle error, as in your code.
      } else {
        let troopColor = this.getTroopTypeColor;
        return {
          border: borderPx,
          borderRadius: '50%',
          width: dimension,
          height: dimension,
          backgroundColor: troopColor,
          padding: '0'
        }
      }
    }
  },
  setup(props) {
    const {troopSpace, id} = toRefs(props);

    const logClick = () => {
      console.log(`Element ${id.value} was clicked`);
    };

    return {
      troopSpace,
      logClick
    };
  }
});
</script>

<style scoped>
</style>
