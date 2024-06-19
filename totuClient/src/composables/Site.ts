import * as d3 from "d3";
import {GRAPH_CONFIG} from "@/config/constants";
import {SpikyRect} from "@/composables/game/SpikyRect";
import {TroopSpace} from "@/composables/TroopSpace";
import {TroopType} from "@/model/game/TroopType";

export interface SiteProps {
  id: string,
  x: number,
  y: number,
  label: string,
  siteType: SiteType,
  nodes: TroopType[]
  value: number
}

export enum SiteType {
  DEFAULT,
  IS_STARTING,
  HAS_MARKER
}

export class Site {
  props: SiteProps;
  container: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  siteRect: SpikyRect;

  constructor(props: SiteProps) {
    this.props = props;
    this.container = d3.select('svg')

    const minimumWidth = Math.max(this.calculateTroopRowsWidth(), this.calculateLabelWidth());
    const minimumHeight = this.calculateTroopRowsHeight() + this.calculateLabelHeight(minimumWidth) + GRAPH_CONFIG.troopAreaPadding * 3;
    const fillColor = this.props.siteType === SiteType.IS_STARTING ? '#000000' : '#FFFFFF';

    // Rect
    this.siteRect = this.createSiteRect(minimumWidth * 1.1, minimumHeight * 1.1, fillColor);

  }


  draw() {
    const minimumWidth = Math.max(this.calculateTroopRowsWidth(), this.calculateLabelWidth());
    const minimumHeight = this.calculateTroopRowsHeight() + this.calculateLabelHeight(minimumWidth) + GRAPH_CONFIG.troopAreaPadding * 2;

    this.siteRect.draw(this.container);
    // this.addValueText(totalWidth, totalHeight, ColorInverter.invertColor(fillColor));

    // Site name

    // Troops

    // Value
    this.addTroopSpaces(minimumWidth, minimumHeight);
  }

  calculateLabelWidth() {
    return this.props.label.length * GRAPH_CONFIG.siteFontSize * 0.2;
  }

  calculateLabelHeight(width: number) {
    // based on label width determine if there are 1 or 2 rows and add 2 * troopAreaPadding
    const labelWidth = this.calculateLabelWidth();
    const maxLabelWidth = width - GRAPH_CONFIG.troopAreaPadding * 2;
    const maxLabelRows = Math.floor(maxLabelWidth / (GRAPH_CONFIG.siteFontSize * 0.2));
    const labelRows = Math.ceil(labelWidth / maxLabelWidth);
    return GRAPH_CONFIG.siteFontSize * labelRows * (labelRows <= maxLabelRows ? 1 : 2);
  }

  calculateLabelRows(width: number) {
    return Math.floor(this.calculateLabelHeight(width) / (GRAPH_CONFIG.siteFontSize * 1.2));
  }

  calculateTroopRowsWidth() {
    return GRAPH_CONFIG.troopAreaPadding * 4
    + GRAPH_CONFIG.troopSpaceRadius * 2 * (Math.min(this.props.nodes.length, 3) + 1)
    + GRAPH_CONFIG.borderSize * this.props.nodes.length + 1
  }

  calculateTroopRowsHeight() {
    const troopSpaceRows = Math.ceil(this.props.nodes.length / GRAPH_CONFIG.maxTroopsPerRow(this.props.nodes.length));
    const troopSpaceHeight = GRAPH_CONFIG.troopSpaceRadius * 2;
    return troopSpaceRows * troopSpaceHeight;
  }

  createSiteRect(troopSpaceWidth: number, troopAreaPadding: number, fillColor: string) {
    return new SpikyRect({
      x: this.props.x,
      y: this.props.y,
      width: troopSpaceWidth,
      height: troopAreaPadding,
      backgroundColor: fillColor,
      label: this.props.label
    });
  }

  addTroopSpaces(totalWidth: number, totalHeight: number) {
    let initialX = this.props.x - totalWidth / 2
      + GRAPH_CONFIG.troopAreaPadding
      + GRAPH_CONFIG.troopSpaceRadius;
    let initialY = this.props.y + totalHeight / 2
      - GRAPH_CONFIG.troopAreaPadding
      - GRAPH_CONFIG.troopSpaceRadius
      - (GRAPH_CONFIG.troopSpaceRadius * 2 + GRAPH_CONFIG.borderSize) * Math.max(0, this.calculateLabelRows(totalWidth) - 1);
    this.props.nodes.forEach((node, index) => {
      let row = Math.floor(this.props.nodes.length / GRAPH_CONFIG.maxTroopsPerRow(this.props.nodes.length))
      let centerX = initialX + (GRAPH_CONFIG.troopSpaceRadius * 2 + GRAPH_CONFIG.borderSize * 3) * (index % 3);
      let centerY = initialY + (GRAPH_CONFIG.troopSpaceRadius * 2 + GRAPH_CONFIG.borderSize * 3) * (index % 3);

      let troop = new TroopSpace({
        id: `${this.props.id}_troopSpace_${index}`,
        x: centerX,
        y: centerY,
        troopType: node
      });
      troop.draw(this.container);
    });
  }

  calculateTroopPosition() {

  }

  addValueText(totalWidth: number, totalHeight: number, fillColor: string) {
    const index = this.props.nodes.length + 1;
    const row = Math.floor(index / GRAPH_CONFIG.maxTroopsPerRow(this.props.nodes.length));
    const col = index % GRAPH_CONFIG.maxTroopsPerRow(this.props.nodes.length);
    const textX = this.props.x + totalWidth / 2 - GRAPH_CONFIG.troopSpaceRadius - GRAPH_CONFIG.troopAreaPadding;
    const textY = this.props.y + (totalHeight - this.calculateLabelHeight(totalWidth) - GRAPH_CONFIG.troopAreaPadding * 2) / 2;
    this.container.append("text")
      .attr("x", textX)
      .attr("y", textY)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-family", GRAPH_CONFIG.fontFamily)
      .attr("font-size", GRAPH_CONFIG.siteFontSize)
      .attr("fill", fillColor)
      .text(this.props.value.toString());
  }
}
