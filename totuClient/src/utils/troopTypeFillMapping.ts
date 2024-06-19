// TODO - add color selector later

import {TroopType} from "@/model/game/TroopType";

export const troopTypeToFillMapping: { [key: string]: string } = {
  [TroopType.NONE]: 'none',
  [TroopType.NEUTRAL]: '#FFFFFF',
  [TroopType.BAENRAE]: '#060917',
  [TroopType.BARRISON]: '#AE0B16',
  [TroopType.MYZZRIM]: '#CC340F',
  [TroopType.XORLARRIN]: '#030335'
}
