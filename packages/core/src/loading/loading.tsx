import { View, type ViewProps, Text } from '@tarojs/components';
import React from 'react';
import clsx from 'clsx';
import { prefixCls } from '../shared/prefix';
import LoadingSpinner from './loading.spinner';
import LoadingDot from './loading.dot';

export type LoadingType = 'spinner' | 'dot';

export interface LoadingProps extends ViewProps {
  type?: LoadingType;
  size?: number;
  color?: string;
  description?: string;
  horizontal?: boolean;
}

const Loading = (props: LoadingProps) => {
  const {
    className,
    type = 'spinner',
    size = 30,
    color = 'currentColor',
    horizontal,
    description,
    children,
    ...restProps
  } = props;

  const renderLoadingContent = () => (
    <View
      className={clsx(
        prefixCls('loading-content'),
        {
          [prefixCls('loading-horizontal')]: horizontal,
        },
        className,
      )}
    >
      {type === 'dot' && <LoadingDot size={size} color={color} />}
      {type === 'spinner' && <LoadingSpinner size={size} />}
      {description && (
        <Text className={prefixCls('loading-text')}>{description}</Text>
      )}
    </View>
  );

  if (!children) {
    return renderLoadingContent();
  }

  return (
    <View className={clsx(prefixCls('loading'), className)} {...restProps}>
      {renderLoadingContent()}
      {children}
    </View>
  );
};

Loading.Dot = LoadingDot;
Loading.Spinner = LoadingSpinner;

export default Loading;
