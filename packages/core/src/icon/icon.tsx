import React, { type ComponentType, type CSSProperties } from 'react';
import clsx from 'clsx';
import { View, type ViewProps } from '@tarojs/components';
import { prefixCls } from '../shared/prefix';
import { addUnitPx } from '../utils/format/unit';
import {
  IconSize,
  IconColor,
  ICON_PRESET_COLORS,
  ICON_PRESET_SIZES,
} from '../shared/types';

export const ICON_COMPONENT_TYPE = Symbol('__iconType__');

export interface IconProps extends ViewProps {
  name: string;
  classPrefix?: string;
  rotate?: number;
  spin?: boolean;
  size?: IconSize;
  color?: IconColor;
  style?: CSSProperties;
}

const Icon = (props: IconProps) => {
  const {
    name,
    classPrefix = 'zing',
    size,
    color,
    rotate,
    spin,
    style,
    className,
    children,
    ...restProps
  } = props;

  const presetColor = ICON_PRESET_COLORS.includes(color as IconColor);
  const presetSize = ICON_PRESET_SIZES.includes(size as IconSize);

  return (
    <View
      {...restProps}
      style={{
        color: presetColor ? undefined : color,
        fontSize: presetColor ? undefined : addUnitPx(size),
        ...style,
      }}
      className={clsx(
        prefixCls('icon'),
        `${classPrefix}-${name}`,
        {
          [prefixCls('icon-spin')]: spin,
          [prefixCls(`icon-color__${color}`)]: presetColor,
          [prefixCls(`icon-size__${size}`)]: presetSize,
        },
        className,
      )}
    />
  );
};

Icon[ICON_COMPONENT_TYPE] = ICON_COMPONENT_TYPE;

export const createZingIconComponent = (classPrefix: string) => {
  function ZingIconWrapper(props: IconProps) {
    return <Icon {...props} classPrefix={classPrefix} />;
  }

  ZingIconWrapper[ICON_COMPONENT_TYPE] = ICON_COMPONENT_TYPE;

  return ZingIconWrapper as ComponentType<Omit<IconProps, 'classPrefix'>>;
};

export default Icon;
