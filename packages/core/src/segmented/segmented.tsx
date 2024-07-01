import { View, type ViewProps } from '@tarojs/components';
import React,{ type ReactNode } from 'react';
import clsx from 'clsx';
import { useControllableValue } from '@zing-kit/hooks';
import { prefixCls } from '../shared/prefix';

export interface SegmentedItem {
  value: string | number;
  label?: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface SegmentedProps extends ViewProps {
  block?: boolean;
  disabled?: boolean;
  value?: string | number;
  defaultValue?: string | number;
  options?: SegmentedItem[];
  onChange?: (value: string | number) => void;
}

const Segmented = (props: SegmentedProps) => {
  const {
    block,
    disabled,
    value,
    defaultValue,
    options = [],
    onChange,
    className,
    ...restProps
  } = props;

  const [state, setState] = useControllableValue<string | number>(props);
  return (
    <View
      className={clsx(
        prefixCls('segmented'),
        {
          [prefixCls('segmented-disabled')]: disabled,
          [prefixCls('segmented-block')]: block
        },
        className
      )}
      {...restProps}
    >
      {options.map((item) => (
        <View
          key={item.value}
          className={clsx(prefixCls('segmented-item'), {
            [prefixCls('segmented-item-active')]: state === item.value,
            [prefixCls('segmented-item-disabled')]: item.disabled
          })}
          onClick={() => {
            if (disabled || item.disabled) {
              return;
            }
            setState(item.value);
          }}
        >
          {item.icon}
          {item.label}
        </View>
      ))}
    </View>
  );
};

export default Segmented;
