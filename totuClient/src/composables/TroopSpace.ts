import * as d3 from "d3";
import {Circle} from "@/composables/base/Circle";
import {GRAPH_CONFIG} from "@/config/constants";

import {TroopType} from "@/model/game/TroopType";

export interface TroopSpaceProps {
  id: string
  x: number,
  y: number,
  troopType: TroopType
}

export class TroopSpace {
  props: TroopSpaceProps;

  constructor(props: TroopSpaceProps) {
    this.props = props
  }

  draw(container: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>) {
    let c = new Circle({
      cx: this.props.x,
      cy: this.props.y,
      radius: GRAPH_CONFIG.troopSpaceRadius,
      borderSize: GRAPH_CONFIG.borderSize,
      strokeFill: GRAPH_CONFIG.troopSpaceBorderStroke,
      backgroundFill: TroopTypeColor[this.props.troopType],
      id: this.props.id
    })

    c.draw(container);
  }
}

const TroopTypeColor = {
  [TroopType.NONE]: 'none',
  [TroopType.NEUTRAL]: 'white',
  [TroopType.BAENRAE]: 'black',
  [TroopType.BARRISON]: 'red',
  [TroopType.MYZZRIM]: 'orange',
  [TroopType.XORLARRIN]: 'blue',
}
