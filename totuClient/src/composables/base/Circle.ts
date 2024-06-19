import * as d3 from 'd3';

export interface CircleProps {
  cx: number;
  cy: number;
  radius: number;
  borderSize: number;
  strokeFill: string;
  backgroundFill: string;
  id: string;
}

export class Circle {
  private props: CircleProps;

  constructor(props: CircleProps) {
    this.props = props;
  }

  draw(container: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>): void {
    let circle = container.append('circle')
      .attr('id', this.props.id)
      .attr('cx', this.props.cx)
      .attr('cy', this.props.cy)
      .attr('r', this.props.radius)
      .attr('stroke', this.props.strokeFill)
      .attr('stroke-width', this.props.borderSize)
      .attr('fill', this.props.backgroundFill);

    // Defining the filter for shadow effects
    let defs = container.select("defs") as d3.Selection<SVGDefsElement, unknown, HTMLElement, any>;

    // If it doesn't exist, append it
    if (defs.empty()) {
      defs = container.append("defs");
    }

    let filter = defs.append("filter")
      .attr("id", `${this.props.id}_dropshadow`)
      .attr("height", "130%")
      .attr("x", "-50%")
      .attr("y", "-50%")
      // the filter region dimensions, scale it up to twice its original size from the origin
      .attr("width", "200%")
      .attr("height", "200%");


    filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 5)
      .attr("result", "blur");

    filter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", 5)
      .attr("dy", 5)
      .attr("result", "offsetBlur");

    let feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "offsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Applying the shadow effect to the circle element
    circle.style("filter", `url(#${this.props.id}_dropshadow)`);
  }
}
