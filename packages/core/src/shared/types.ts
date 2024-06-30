export type BaseSize = 'large' | 'medium' | 'small' | 'tiny';

export type IconSize = BaseSize | 'inherit' | number;

export type BaseType = 'default' | 'primary';

export type IconColor = BaseType | 'inherit' | string;

export const ICON_PRESET_COLORS: IconColor[] = ['default', 'primary'];

export const ICON_PRESET_SIZES: IconSize[] = [
  'large',
  'medium',
  'small',
  'tiny'
];
