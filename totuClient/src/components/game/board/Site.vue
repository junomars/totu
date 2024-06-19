<template>
  <div style="height: fit-content; width: fit-content; min-width: 300px">
    <div :class="['site', {'inverted': isInverted}]" :style="backgroundStyle">
      <!-- SVG Background and Border -->
      <svg class="site-background" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path
          d="M0,0 L10,5 L45,5 L50,0 L55,5 L90,5 L100,0 L97.5,15 L97.5,85 L100,100 L90,95 L55,95 L50,100 L45,95 L10,95 L0,100 L2.5,85 L2.5,15 Z"
          stroke-width="5"/>
      </svg>
      <!-- Display Site Name -->
      <v-card-title class="site-title-text">
        {{ site.name }}
      </v-card-title>
      <v-card-text class="site-content">
        <div class="troop-spaces">
          <div class="top-row-troops">
            <troop-button
              v-for="(troopSpace, index) in getTopRowTroops"
              :id="site.name+'_'+index"
              :key="index"
              :troopSpace="troopSpace"
              class="site-troop-space"
            />
          </div>
          <div class="bot-row-troops" :style="botRowStyle">
            <troop-button
              v-for="(troopSpace, index) in getBottomRowTroops"
              :id="site.name+'_'+getIndexFromTroops(index)"
              :key="index"
              :troopSpace="troopSpace"
              class="site-troop-space"
            />
          </div>
        </div>
        <div class="site-value-text">
          {{ site.value }}
        </div>
      </v-card-text>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, reactive} from 'vue';
import {SiteProps} from "@/composables/Site";
import TroopButton from "@/components/game/board/TroopSpace.vue";
import {TroopSpace} from "@/model/game/TroopSpace";
import {Site} from "@/model/game/Site";
import menzoberranzan from "@/assets/sites/menzoberranzan.png";
import araumycos from "@/assets/sites/araumycos.png";
import tsenviilyq from "@/assets/sites/tsenviilyq.png";
import chchitl from "@/assets/sites/chchitl.png";
import the_phaerlin from "@/assets/sites/the_phaerlin.png";
import gauntlgrym from "@/assets/sites/gauntlgrym.png";
import sszuraassnee from "@/assets/sites/sszuraassnee.png";
import {GRAPH_CONFIG} from "@/config/constants";

export default defineComponent({
  name: 'Site',
  components: {TroopButton},
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
    site: {
      type: Object as PropType<Site>,
      required: true
    },
  },
  setup(props: SiteProps) {
    const siteProps = reactive({...props});
    const spikes = [
      {rotation: 0},
      {rotation: 45},
      {rotation: 90},
      {rotation: 135},
      {rotation: 180},
      {rotation: 225},
      {rotation: 270},
      {rotation: 315}
    ];
    return {siteProps, spikes}
  },
  methods: {
    getImageFromId(id: string) {
      switch (id) {
        case 'Menzoberranzan': return menzoberranzan
        case 'Araumycos': return araumycos
        case 'Tsenviilyq': return tsenviilyq
        case "Ch'chitl": return chchitl
        case 'The Phaerlin': return the_phaerlin
        case 'Gauntlgrym': return gauntlgrym
        case "Ss'zuraass'nee": return sszuraassnee
        default: return null
      }
    },
    getIndexFromTroops(index: number): number {
      return this.site.spaces.length > 3 ? (this.site.spaces.length == 4 ? 2 + index : 3 + index) : 0
    },
  },
  computed: {
    getTopRowTroops(): TroopSpace[] {
      if (this.site.spaces.length == 4) {
        return this.site.spaces.slice(0, 2);
      }
      return this.site.spaces.slice(0, 3);
    },
    getBottomRowTroops(): TroopSpace[] {
      if (this.site.spaces.length == 4) {
        return this.site.spaces.slice(2, 4);
      }
      if (this.site.spaces.length < 4) {
        return [];
      }

      return this.site.spaces.slice(3, this.site.spaces.length);
    },
    isInverted(): boolean {
      return this.site.isStartingNode;
    },
    backgroundStyle() {
      if (this.site.hasMarker) {
        return {
          background: `url(${this.getImageFromId(this.site.name)}) no-repeat center center`,
          backgroundSize: 'cover',
          stroke: 'white',
          color: 'white',
          WebkitTextStrokeWidth: '1px',
          WebkitTextStrokeColor: 'black'
        };
      } else if (this.site.isStartingNode) {
        return {
          backgroundColor: 'black',
          stroke: 'white',
          color: 'white'
        };
      } else {
        return {
          backgroundColor: 'white',
          stroke: 'black'
        };
      }
    },
    botRowStyle() {
      if (this.site.spaces.length == 5) {
        return {
          marginLeft: `${GRAPH_CONFIG.troopSpaceRadius}px`
        }
      }
    }
  }
});
</script>

<style scoped>
text {
  text-anchor: middle;
  dominant-baseline: middle;
}

/**
    SITE
 */
.site {
  --border-color: black;
  --text-color: black;
  display: inline-block;
  width: 63%;
  height: fit-content;
  position: relative;
  clip-path: polygon(0% 0%,
  10% 5%,
  45% 5%,
  50% 0%,
  55% 5%,
  90% 5%,
  100% 0%,
  97.5% 15%,
  97.5% 85%,
  100% 100%,
  90% 95%,
  55% 95%,
  50% 100%,
  45% 95%,
  10% 95%,
  0% 100%,
  2.5% 85%,
  2.5% 15%
  );
}

.inverted {
  --text-color: white;
}

.site-background {
  position: absolute;
  width: 100%;
  height: 100%;
  fill: transparent;
  stroke-width: 5px;
}

.site-title-text {
  font-family: "Modesto Condensed Bold", serif;
  font-weight: bold;
  font-size: x-large;
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  word-wrap: break-word;
  white-space: normal;
  position: relative; /* Ensures it's above the SVG */
  z-index: 1;
}

.site-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative; /* Ensures it's above the SVG */
  z-index: 1;
}

.troop-spaces {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.top-row-troops, .bot-row-troops {
  display: flex;
  width: fit-content;
  justify-content: center;
}

.site-troop-space {
  margin: 2px;
  flex-grow: 1;
}

.site-value-text {
  padding-left: 10px;
  font-family: "Modesto Condensed Bold", serif;
  font-weight: bold;
  font-size: 32px;
}
</style>
