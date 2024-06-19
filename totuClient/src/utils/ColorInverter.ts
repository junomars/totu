export class ColorInverter {
  static invertColor = (hexColor: string): string => {
    let color = (hexColor.charAt(0)==='#') ? hexColor.substring(1,7) : hexColor;

    return '#' + (0xFFFFFF ^ parseInt(color, 16)).toString(16).padStart(6, '0');
  }
}
