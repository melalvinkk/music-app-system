// Simulated dominant color extraction
// In production, use a library like 'react-native-dominant-color' or similar

export const extractDominantColor = async (imageUrl: string): Promise<string> => {
  // Mock implementation - returns random vibrant color
  const vibrantColors = [
    '#00D9FF',
    '#FF0080',
    '#A78BFA',
    '#06B6D4',
    '#F43F5E',
    '#10B981',
    '#F59E0B',
  ];
  return vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
};

export const applyColorIntensity = (
  color: string,
  intensity: number,
  saturation: number
): string => {
  // Simple implementation: reduce saturation if intensity is low
  // intensity: 0-100, saturation: 0-100
  if (saturation < 50) {
    // Desaturate towards gray
    return `rgba(${hexToRgb(color).join(',')}, ${intensity / 100})`;
  }
  return color;
};

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [0, 0, 0];
};

export const getPresetColors = (
  presetName: 'chill' | 'neon' | 'minimal' | 'low-stimulus'
) => {
  const presets = {
    chill: { saturation: 60, opacity: 0.8, disableAnimations: false },
    neon: { saturation: 100, opacity: 1, disableAnimations: false },
    minimal: { saturation: 20, opacity: 0.6, disableAnimations: false },
    'low-stimulus': { saturation: 10, opacity: 0.4, disableAnimations: true },
  };
  return presets[presetName];
};
