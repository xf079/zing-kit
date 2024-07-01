export type CommonSize = 'large' | 'medium' | 'small' | 'tiny';

export type CommonColor = 'default' | 'primary';

export type IconSize = CommonSize | 'inherit' | number;

export type IconColor = CommonColor | 'inherit' | string;

export const ICON_PRESET_COLORS: IconColor[] = ['default', 'primary'];

export const ICON_PRESET_SIZES: IconSize[] = [
  'large',
  'medium',
  'small',
  'tiny'
];
