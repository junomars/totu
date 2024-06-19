export const GRAPH_CONFIG = {
  // General
  borderSize: 4,
  fontFamily: 'Modesto Condensed Bold',
  letterSpacing: 2,

  // Troop Spaces
  troopSpaceBorderStroke: '#FFFFFF',
  troopSpaceRadius: 20,
  troopAreaPadding: 10,

  // Marker locations
  markerRadius: 250,
  markerStroke: '#FFFFFF',
  markerSpikes: 8,

  // Sites
  markerFontSize: 72,
  spikeSize: 15,
  siteFontSize: 44,
  imagePrefix: 'assets/sites/',

  maxTroopsPerRow: (nodes: number) => {
      return nodes === 4 ? 2 : 3
  }

}
