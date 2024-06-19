import * as d3 from "d3";

export interface SpikeProps {
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
}

export class Spike {
  props: SpikeProps

  constructor(props: SpikeProps) {
    this.props = props;
  }

  draw(container: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>, isCornerSpike = false) {
    // Reduce the size for the corner spikes
    let adjustedSize = this.props.size * 0.7;
    let xShift = isCornerSpike ? adjustedSize / 2.5 : adjustedSize / 3;
    let yShift = isCornerSpike ? adjustedSize / 1.1 : adjustedSize / 1.5;

    let midpoints = [`${this.props.x - xShift},${this.props.y}`,
      `${this.props.x},${this.props.y - yShift}`,
      `${this.props.x + xShift},${this.props.y}`,
      `${this.props.x},${this.props.y + yShift}`];

    container.append('polygon')
      .attr('points', midpoints.join(" "))
      .style('fill', this.props.color)
      .attr('transform', `rotate(${this.props.rotation},${this.props.x},${this.props.y})`);
  }
}
