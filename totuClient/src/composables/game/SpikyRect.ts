import * as d3 from "d3";
import {Selection} from "d3";
import {ColorInverter} from "@/utils/ColorInverter";
import {GRAPH_CONFIG} from "@/config/constants";

export interface SpikyRectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  backgroundColor: string;
  label?: string
}

export class SpikyRect {
  private props: SpikyRectProps;

  constructor(props: SpikyRectProps) {
    this.props = props;

  }

  private _spikyRect: d3.Selection<SVGPolygonElement, unknown, HTMLElement, any>;

  get spikyRect(): Selection<SVGPolygonElement, unknown, HTMLElement, any> {
    return this._spikyRect;
  }

  private _textContainer: d3.Selection<SVGForeignObjectElement, unknown, HTMLElement, any>;

  get textContainer(): Selection<SVGForeignObjectElement, unknown, HTMLElement, any> {
    return this._textContainer;
  }

  draw(container: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>) {
    this.createSpikyRect(container);
    if (this.props.label) {
      this.addText(container, this.props.label)
    }
  }

  addText(container: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>, label: string) {
    // Append a foreignObject to the container
    this._textContainer = container.append('foreignObject')
      .attr('width', this.props.width)
      .attr('height', this.props.height)
      .attr('x', this.props.x - this.props.width / 2)
      .attr('y', this.props.y - this.props.height / 2)
      .style('font-family', GRAPH_CONFIG.fontFamily)
      .style('font-size', `${GRAPH_CONFIG.siteFontSize}px`)
      .style('color', 'black');

    // Append a div to the foreignObject
    const div = this._textContainer.append('xhtml:div')
      .style('width', `${this.props.width}px`) // Specify width here
      .style('word-wrap', 'break-all') // Apply word wrapping
      .style('text-align', 'center') // Apply word wrapping

    // Append your text to the div
    div.append('xhtml:p')
      .style('text-anchor', 'middle') // Center the text
      .style('line-height', '1') // The number here controls the line height
      .text(label);
  }

  getCurrentWidth() {
    return this._textContainer ? parseFloat(this._textContainer.attr('width')) : 0;
  }

  getCurrentHeight() {
    return this._textContainer ? parseFloat(this._textContainer.attr('height')) : 0;
  }


  private createSpikyRect(container: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>) {
    let halfWidth = this.props.width / 2;
    let halfHeight = this.props.height / 2;

    let midpoints = [
      // bottom left
      `${this.props.x - halfWidth + GRAPH_CONFIG.spikeSize * 1.5}, ${this.props.y + halfHeight}`,
      `${this.props.x - halfWidth - GRAPH_CONFIG.spikeSize}, ${this.props.y + halfHeight + GRAPH_CONFIG.spikeSize}`,
      `${this.props.x - halfWidth}, ${this.props.y + halfHeight - GRAPH_CONFIG.spikeSize * 1.5}`,

      // top left
      `${this.props.x - halfWidth}, ${this.props.y - halfHeight + GRAPH_CONFIG.spikeSize * 1.5}`,
      `${this.props.x - halfWidth - GRAPH_CONFIG.spikeSize}, ${this.props.y - halfHeight - GRAPH_CONFIG.spikeSize}`,
      `${this.props.x - halfWidth + GRAPH_CONFIG.spikeSize * 1.5}, ${this.props.y - halfHeight}`,

      // top mid
      `${this.props.x - GRAPH_CONFIG.spikeSize}, ${this.props.y - halfHeight}`,
      `${this.props.x}, ${this.props.y - halfHeight - GRAPH_CONFIG.spikeSize * 2}`,
      `${this.props.x + GRAPH_CONFIG.spikeSize}, ${this.props.y - halfHeight}`,

      // top right
      `${this.props.x + halfWidth - GRAPH_CONFIG.spikeSize * 1.5}, ${this.props.y - halfHeight}`,
      `${this.props.x + halfWidth + GRAPH_CONFIG.spikeSize}, ${this.props.y - halfHeight - GRAPH_CONFIG.spikeSize}`,
      `${this.props.x + halfWidth}, ${this.props.y - halfHeight + GRAPH_CONFIG.spikeSize * 1.5}`,

      // bottom right
      `${this.props.x + halfWidth}, ${this.props.y + halfHeight - GRAPH_CONFIG.spikeSize * 1.5}`,
      `${this.props.x + halfWidth + GRAPH_CONFIG.spikeSize}, ${this.props.y + halfHeight + GRAPH_CONFIG.spikeSize}`,
      `${this.props.x + halfWidth - GRAPH_CONFIG.spikeSize * 1.5}, ${this.props.y + halfHeight}`,

      // bottom mid
      `${this.props.x + GRAPH_CONFIG.spikeSize}, ${this.props.y + halfHeight}`,
      `${this.props.x}, ${this.props.y + halfHeight + GRAPH_CONFIG.spikeSize * 2}`,
      `${this.props.x - GRAPH_CONFIG.spikeSize}, ${this.props.y + halfHeight}`,
    ]

    this._spikyRect = container.append('polygon')
      .attr('points', midpoints.join(" "))
      .attr('stroke', ColorInverter.invertColor(this.props.backgroundColor))
      .attr('stroke-width', 5)
      .attr('fill', this.props.backgroundColor)
  }
}
