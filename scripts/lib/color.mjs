const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const linearToSrgb = (value) =>
    value <= 0.0031308 ? 12.92 * value : 1.055 * Math.pow(value, 1 / 2.4) - 0.055;

const srgbToLinear = (value) =>
    value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);

export function oklchToLinearRgb(l, c, h) {
    const hue = (h * Math.PI) / 180;
    const a = c * Math.cos(hue);
    const b = c * Math.sin(hue);
    const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = l - 0.0894841775 * a - 1.291485548 * b;
    const lc = l_ ** 3;
    const mc = m_ ** 3;
    const sc = s_ ** 3;
    return [
        4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc,
        -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc,
        -0.0041960863 * lc - 0.7034186147 * mc + 1.707614701 * sc,
    ];
}

export function oklchToRgb(l, c, h) {
    return oklchToLinearRgb(l, c, h).map((channel) => clamp(linearToSrgb(channel), 0, 1));
}

export function hexToRgb(hex) {
    const value = hex.replace("#", "");
    const full = value.length === 3 ? value.split("").map((part) => part + part).join("") : value;
    return [0, 2, 4].map((index) => parseInt(full.slice(index, index + 2), 16) / 255);
}

export function rgbToHex(rgb) {
    return `#${rgb.map((channel) => Math.round(channel * 255).toString(16).padStart(2, "0")).join("")}`;
}

export function rgbToOklch(rgb) {
    const [r, g, b] = rgb.map(srgbToLinear);
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    const lightness = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
    const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
    const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
    const chroma = Math.sqrt(a * a + bb * bb);
    const hue = ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360;
    return [lightness, chroma, hue];
}

export function parseColor(input) {
    const value = input.trim();
    if (value.startsWith("#")) return hexToRgb(value);
    const match = value.match(/^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\s*\)$/i);
    if (!match) throw new Error(`Unsupported color: ${input}`);
    const lightness = Number(match[1]) / (match[2] ? 100 : 1);
    return oklchToRgb(lightness, Number(match[3]), Number(match[4]));
}

export function relativeLuminance(rgb) {
    const [r, g, b] = rgb.map(srgbToLinear);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(foreground, background) {
    const a = relativeLuminance(parseColor(foreground));
    const b = relativeLuminance(parseColor(background));
    const [light, dark] = a > b ? [a, b] : [b, a];
    return (light + 0.05) / (dark + 0.05);
}
