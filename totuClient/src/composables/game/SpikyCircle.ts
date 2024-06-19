import {Spike} from "@/composables/base/Spike";
import * as d3 from 'd3';
import {Circle} from "@/composables/base/Circle";
import {GRAPH_CONFIG} from "@/config/constants";
import menzoberranzan from "@/assets/sites/menzoberranzan.png";
import araumycos from "@/assets/sites/araumycos.png";
import tsenviilyq from "@/assets/sites/tsenviilyq.png";
import chchitl from "@/assets/sites/chchitl.png";
import sszuraassnee from "@/assets/sites/sszuraassnee.png";
import the_phaerlin from "@/assets/sites/the_phaerlin.png";
import gauntlgrym from "@/assets/sites/gauntlgrym.png";

export interface SpikyCircleProps {
  x: number,
  y: number
  label: string,
  id: string
}

export class SpikyCircle {
  props: SpikyCircleProps;

  constructor(props: { id: string; x: number; y: number; label: string }) {
    this.props = props;
  }

  draw(container: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>) {
    this.addImage(container);
    this.createCircle(container);
    this.createSpikes(container);
    this.addText(container);
  }

  addImage(container: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>) {
    container.append('defs')
      .append('pattern')
      .attr('id', 'image')
      .attr('patternUnits', 'objectBoundingBox')
      .attr('patternContentUnits', 'objectBoundingBox')
      .attr('width', 1)
      .attr('height', 1)
      .append('image')
      .attr('xlink:href', this.getImageFromId(this.props.id))
      .attr('preserveAspectRatio', 'xMidYMid slice')
      .attr('width', 1)
      .attr('height', 1)
      .attr('x', 0)
      .attr('y', 0);
  }

  createCircle(container: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>) {
    const c = new Circle({
      cx: this.props.x,
      cy: this.props.y,
      radius: GRAPH_CONFIG.markerRadius,
      borderSize: GRAPH_CONFIG.borderSize,
      strokeFill: GRAPH_CONFIG.markerStroke,
      backgroundFill: 'url(#image)',
      id: this.props.id
    });
    c.draw(container);
  }

  createSpikes(container: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>) {
    const numSpikes = 8;
    const spikeRotation = 360 / numSpikes;
    for (let i = 0; i < numSpikes; i++) {
      const spike = new Spike({
        size: GRAPH_CONFIG.spikeSize,
        x: this.props.x + (GRAPH_CONFIG.markerRadius) * Math.sin((i * spikeRotation * Math.PI) / 180),
        y: this.props.y + (GRAPH_CONFIG.markerRadius) * Math.cos((i * spikeRotation * Math.PI) / 180),
        rotation: i % 2 == 0 ? i * spikeRotation : (i + 2) * spikeRotation,
        color: GRAPH_CONFIG.markerStroke,
      });
      spike.draw(container, true);
    }
  }

  addText(container: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>) {
    // Create an SVG path that will be used as the baseline for the text.
    const textPathId = `curve_${this.props.id}`;
    container.append('defs').append('path')
      .attr('id', textPathId)
      .attr('d', `M ${this.props.x}, ${this.props.y} m -${GRAPH_CONFIG.markerRadius}, 0 a ${GRAPH_CONFIG.markerRadius},${GRAPH_CONFIG.markerRadius} 0 1,1 ${(GRAPH_CONFIG.markerRadius * 2)},0 a ${GRAPH_CONFIG.markerRadius},${GRAPH_CONFIG.markerRadius} 0 1,1 -${(GRAPH_CONFIG.markerRadius * 2)},0`);

    container.append('text')
      .attr('dy', GRAPH_CONFIG.markerRadius / 3) // Adjust vertical alignment here
      .append('textPath') // append a 'textPath' element
      .attr('startOffset', '25%') // place the text halfway on the arc
      .attr('stroke', 'black')
      .attr('fill', 'white') // place the text halfway on the arc
      .attr('font-family', GRAPH_CONFIG.fontFamily)
      .attr('font-size', `${GRAPH_CONFIG.markerFontSize}px`)
      .attr('letter-spacing', GRAPH_CONFIG.letterSpacing)
      .attr('xlink:href', `#${textPathId}`) // bind the 'textPath' to the path created above
      .style('text-anchor','middle') // center the text
      .text(this.props.label);
  }

  getImageFromId(id: string) {
    switch (id) {
      case 'menzoberranzan': return menzoberranzan
      case 'araumycos': return araumycos
      case 'tsenviilyq': return tsenviilyq
      case 'ch\'chitl': return chchitl
      case 'the phaerlin': return the_phaerlin
      case 'gauntlgrym': return gauntlgrym
      case 'ss\'zuraass\'nee': return sszuraassnee
      default: return 'black'
    }
  }
}
