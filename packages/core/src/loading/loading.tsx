import { View, ViewProps } from '@tarojs/components';
import { useMemo } from 'react';
import { range } from 'lodash-es';
import clsx from 'clsx';
import { prefixCls } from '../styled/prefix';
import { addUnitPx } from '../utils/format/unit';

export type LoadingType = 'spinner' | 'circular';

export interface LoadingProps extends ViewProps {
  size?: number | string;
  type?: LoadingType;
  horizontal?: boolean;
}

const SpinLine = range(0, 12).map((key) => (
  <View key={key} className={prefixCls('loading-spinner__item')} />
));

const LoadingSpinner = (props: LoadingProps) => {
  const { size } = props;
  const rootStyle = useMemo(
    () => ({ width: addUnitPx(size), height: addUnitPx(size) }),
    [size]
  );
  return (
    <View className={prefixCls('loading-spinner')} style={rootStyle}>
      {SpinLine}
    </View>
  );
};

const LoadingCircular = (props: LoadingProps) => {
  const { size } = props;
  const rootStyle = useMemo(
    () => ({
      width: addUnitPx(size) || '',
      height: addUnitPx(size) || ''
    }),
    [size]
  );
  return <View className={prefixCls('loading-circular')} style={rootStyle} />;
};

const Loading = (props: LoadingProps) => {
  const {
    className,
    size = 30,
    type = 'circular',
    horizontal,
    children,
    ...restProps
  } = props;

  return (
    <View
      className={clsx(
        prefixCls('loading'),
        prefixCls(`loading-${horizontal}`),
        { [prefixCls('loading-horizontal')]: horizontal },
        className
      )}
      {...restProps}
    >
      {type === 'circular' && <LoadingCircular size={size} />}
      {type === 'spinner' && <LoadingSpinner size={size} />}
      {children && (
        <View className={prefixCls('loading-text')}>{children}</View>
      )}
    </View>
  );
};

export default Loading;
