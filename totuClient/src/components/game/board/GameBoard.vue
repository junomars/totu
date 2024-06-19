<template>
  <div ref="container" style="width: 100%; height: 100%; overflow: hidden;">
    <div ref="graph" class="graph" style="width: 100%; height: 100%; overflow: hidden;">
    </div>
  </div>
</template>


<script lang="ts">
import * as d3 from 'd3';
import SiteComponent from './Site.vue';
import {createApp, PropType, ref} from "vue";
import {Board} from "@/model/game/Board";
import {Route} from "@/model/game/Route";
import TroopSpaceComponent from "@/components/game/board/TroopSpace.vue";
import {Site} from "@/model/game/Site";
import {TroopSpace} from "@/model/game/TroopSpace";
import vuetify from "@/plugins/vuetify";

export type NodeData = {
  x: number;
  y: number;
  id: string;
  data: Site | TroopSpace;
  isSite: boolean; // use a flag to distinguish between site and troopspace
}

export type Link = {
  source: string,
  target: string
}

export default {
  name: 'ForceGraph',
  components: {Site: SiteComponent, TroopSpace: TroopSpaceComponent},
  props: {
    board: {
      type: Object as PropType<Board>,
      required: true
    }
  },
  data() {
    return {
      width: ref(0),
      height: ref(0),
      nodes: ref([] as NodeData[]),
      links: ref([] as Link[])
    };
  },
  mounted() {
    this.nodes = this.createNodes(this.board)
    this.links = this.createLinks(this.board)

    this.createForceGraph();
  },
  watch: {
    board: {
      handler() {
        this.nodes = this.createNodes(this.board);
        this.links = this.createLinks(this.board);
        this.createForceGraph();
      },
      deep: true
    }
  },
  methods: {
    formatTroopSpaceId(edge: Route, index: number) {
      return `${edge.source}_${edge.target}_${index}`;
    },
    createNodes(board: Board): NodeData[] {
      let nodes: any[] = board.nodes.map(node => ({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        id: node.name,
        data: node,
        isSite: true
      }));

      board.edges.map((edge) => edge.spaces
        .forEach((_, index) => {
          return nodes.push(({
              x: Math.random() * this.width,
              y: Math.random() * this.height,
              id: this.formatTroopSpaceId(edge, index),
              data: edge.spaces[index],
              isSite: false
            })
          )
        })
      );

      return nodes;
    },
    createLinks(board: Board): any[] {
      const links = board.edges
        .filter(edge => edge.spaces.length === 0)
        .map(edge => ({source: edge.source, target: edge.target}));

      board.edges
        .forEach((edge: Route) => {
          edge.spaces.forEach((_, index: number) => {
            let source: string;
            let target: string;

            if (index === (edge.spaces.length - 1)) {
              source = this.formatTroopSpaceId(edge, index);
              target = edge.target;

              links.push(({
                source: source,
                target: target
              }))
            }

            if (index == 0) {
              source = edge.source;
              target = this.formatTroopSpaceId(edge, index);
              links.push(({
                source: source,
                target: target
              }));
              return;
            }

            source = this.formatTroopSpaceId(edge, index - 1);
            target = this.formatTroopSpaceId(edge, index);
            links.push(({
              source: source,
              target: target
            }))
          })
        });

      return links;
    },
    createForceGraph() {
      if (!this.board) {
        return;
      }

      const width = (this.$refs.container as HTMLElement).clientWidth;
      const height = (this.$refs.container as HTMLElement).clientHeight;

      d3.select(this.$refs.graph).selectAll("*").remove();

      const svg = d3.select(this.$refs.graph)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      const g = svg.append('g');

      const zoom = d3.zoom()
        .scaleExtent([.25, 4])
        .on("zoom", (event) => {
          g.attr("transform", event.transform);
        });

      svg.call(zoom);

      const nodes = this.createNodes(this.board);
      const links = this.createLinks(this.board);

      const linkForce = d3.forceLink(links)
        .id(d => d.id)
        .distance(100)
        .strength(2);

      const chargeForce = d3.forceManyBody().strength(-2000);
      const collisionForce = d3.forceCollide().radius(15).iterations(50);

      const simulation = d3.forceSimulation(nodes)
        .force('link', linkForce)
        .force('charge', chargeForce)
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', collisionForce);

      const link = g.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .attr('stroke-width', 4)
        .attr('stroke', 'white');

      const foreignObject = g.append('g')
        .attr('class', 'nodes')
        .selectAll('foreignObject')
        .data(nodes)
        .enter()
        .append('foreignObject')
        .attr('x', d => d.x - 50)
        .attr('y', d => d.y - 50)
        .attr('width', 100)
        .attr('height', 100)
        .each(function (d) {
          const div = d3.select(this)
            .append('xhtml:div')
            .style('display', 'inline-block') // Ensure content size is respected
            .style('width', 'fit-content')
            .style('height', 'fit-content')
            .attr('class', 'node-component');

          if (d.isSite) {
            const app = createApp(SiteComponent, {id: d.id, site: d.data});
            app.use(vuetify);
            app.mount(div.node());
          } else {
            const app = createApp(TroopSpaceComponent, {id: d.id, troopSpace: d.data});
            app.use(vuetify);
            app.mount(div.node());
          }
        });

      simulation.on('tick', () => {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        foreignObject
          .attr('x', function (d) {
            const width = this.querySelector('div').offsetWidth;
            return d.x - width / 3;
          })
          .attr('y', function (d) {
            const height = this.querySelector('div').offsetHeight;
            return d.y - height / 2;
          })
          .attr('width', function (d) {
            return this.querySelector('div').offsetWidth;
          })
          .attr('height', function (d) {
            return this.querySelector('div').offsetHeight;
          });
      });
    },
  },
};
</script>

<style scoped>
.links line {
  stroke: white;
  stroke-opacity: 0.6;
}

.nodes foreignObject {
  pointer-events: none;
}
</style>
