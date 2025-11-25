export function hexToRgb(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return { r, g, b };
  }

export function isDarkColor(r, g, b) {
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance < 200;
}

export function makeDarkColor(color, percentage) {
    const factor = (100 - percentage) / 100;
    return {
      r: Math.round(color.r * factor),
      g: Math.round(color.g * factor),
      b: Math.round(color.b * factor),
      a: color.a
    };
  }

