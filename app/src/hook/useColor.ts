import { useState, useEffect } from 'react';

type Props =
  | 'lightPurple'
  | 'purple'
  | 'darkPurple'
  | 'blue'
  | 'darkBlue'
  | 'logo'
  | 'border'
  | 'selectedFont'
  | 'unSelectedFont'
  | 'unSelectedIcon';

const palette = {
  lightPurple: '#FFD6FF',
  purple: '#E7C6FF',
  darkPurple: '#C8B6FF',
  blue: '#BBD0FF',
  darkBlue: '#B8C0FF',
  logo: '#A3A5B5',
  border: '#F3F3F3',
  selectedFont: '#323B4C',
  unSelectedFont: '#A3A5B5',
  unSelectedIcon: '#A0A1AA',
  toggle: '#D9D6E5',
  atomicRed: '#EF476F',
  atomicYellow: '#FFD166',
  atomicIndigo: '#073B4C',
  atomicGreen: '#06D6A0',
  atomicBlue: '#118AB2',
  cardValue: '#92959F',
};

const useColor = (color: Props) => {
  const [pickColor, setPickColor] = useState<string>();

  useEffect(() => {
    if (color !== undefined) {
      setPickColor(palette[color]);
    }
  }, [color]);

  return pickColor;
};

export { useColor };
