import * as d3 from "d3";
import {ColorInverter} from "@/utils/ColorInverter";

export interface TextProps {
  x: number;
  y: number;
  stroke: string;
  label: string;
}

export class Text {
  private props: TextProps;

  constructor(props: TextProps) {
    this.props = props;
  }

  draw(container: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>) {
    container.append('text')
      .attr('x', this.props.x)
      .attr('y', this.props.y)
      .attr('stroke', this.props.stroke)
      .text(this.props.label)
  }
}
