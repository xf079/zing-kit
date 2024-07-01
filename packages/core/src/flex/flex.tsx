import React, { type CSSProperties } from 'react';
import clsx from 'clsx';
import { View, ViewProps } from '@tarojs/components';
import { prefixCls } from '../shared/prefix';
import { addUnitPx } from '../utils/format/unit';

export interface FlexProps extends ViewProps {
  style?: CSSProperties;
  column?: boolean;
  justify?: 'start' | 'end' | 'center' | 'between' | 'around';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: number;
  columnGap?: number;
}

const Content = ({ className, ...restProps }: ViewProps) => (
  <View className={clsx(prefixCls('flex-content'), className)} {...restProps} />
);

const Flex = (props: FlexProps) => {
  const {
    style,
    className,
    children,
    column = false,
    justify = 'start',
    align = 'start',
    wrap = 'nowrap',
    gap = 0,
    columnGap = 0,
    ...restProps
  } = props;

  return (
    <View
      className={clsx(
        prefixCls('flex'),
        prefixCls(`flex-${wrap}`),
        prefixCls(`flex-${justify}`),
        prefixCls(`flex-align-${align}`),
        {
          [prefixCls('flex-column')]: column,
        },
        className,
      )}
      style={{
        gap: addUnitPx(gap),
        columnGap: addUnitPx(columnGap),
        ...style,
      }}
      {...restProps}
    >
      {children}
    </View>
  );
};

Flex.Content = Content;

export default Flex;
