import React, { cloneElement, ReactElement, ReactNode, useMemo } from 'react';
import clsx from 'clsx';
import { isBoolean } from 'lodash-es';
import { ButtonProps, View } from '@tarojs/components';
import { Loading, LoadingProps } from '../loading';
import { prefixCls } from '../styled/prefix';
import { isElementOf, isObjectElement } from '../utils/validate';
import { BtnIconPosition, BtnShape, BtnSize, BtnVariant } from './interface';
import { cloneIconElement, isIconElement } from '../utils/util';

export interface IZButtonProps extends Omit<ButtonProps, 'size' | 'type'> {
  /**
   * 按钮类型
   * @default 'contained'
   * @description 按钮类型
   * @type string
   */
  variant?: BtnVariant;

  /**
   * 是否为主要按钮
   * @default false
   */
  primary?: boolean;
  /**
   * 是否为块级元素
   * @default false
   * @description 是否为块级元素
   * @type boolean
   */
  block?: boolean;
  /**
   * 按钮形状
   * @default 'normal'
   * @description 按钮形状
   * @type string
   */
  shape?: BtnShape;
  /**
   * 按钮大小
   * @default 'normal'
   * @description 按钮大小
   * @type string
   */
  size?: BtnSize;
  /**
   * 按钮禁用状态
   * @default false
   * @description 按钮禁用状态
   * @type boolean
   */
  disabled?: boolean;
  /**
   * 按钮加载状态
   * @default false
   * @description 按钮加载状态
   * @type boolean
   */
  loading?: boolean;
  /**
   * 按钮图标
   * @description 按钮图标
   * @type ReactNode
   */
  icon?: ReactNode;
  /**
   * 按钮内容
   * @description 按钮内容
   * @type ReactNode
   */
  iconPosition?: BtnIconPosition;
}

interface UseButtonChildrenOptions {
  children?: ReactNode;
  loading?: ReactNode;
  icon?: ReactNode;
  iconPosition?: BtnIconPosition;
}

const appendButtonIconClassname = (icon?: ReactNode, className?: string) => {
  return isIconElement(icon) ? cloneIconElement(icon, { className }) : icon;
};

const useButtonLoading = (
  loading?: boolean | LoadingProps | ReactElement
): ReactNode => {
  return useMemo(() => {
    if (isBoolean(loading) && loading) {
      return <Loading className={clsx(prefixCls('btn-loading'))} />;
    }

    if (isObjectElement(loading as ReactNode)) {
      const { className, ...restProps } = loading as LoadingProps;
      return (
        <Loading
          {...restProps}
          className={clsx(prefixCls('btn-loading'), className)}
        />
      );
    }

    if (isElementOf(loading as ReactNode, Loading)) {
      return cloneElement(loading as ReactElement, {
        className: clsx(prefixCls('btn-loading'))
      });
    }

    return loading as ReactNode;
  }, [loading]);
};

const useButtonChildren = (options: UseButtonChildrenOptions) => {
  const { loading, icon: iconProp, children, iconPosition } = options;

  const icon = appendButtonIconClassname(iconProp, prefixCls(`btn-icon`));

  return (
    <>
      {loading}
      {iconPosition === 'left' && icon}
      <View className={prefixCls('btn-content')}>{children}</View>
      {iconPosition === 'right' && icon}
    </>
  );
};

const Button: React.FC<IZButtonProps> = (props) => {
  const {
    variant,
    primary,
    size: sizeProp,
    shape,
    block,
    disabled,
    icon,
    iconPosition = 'left',
    loading: loadingProp,
    children: childrenProp,
    ...restProps
  } = props;
  const disabledState = useMemo(
    () => disabled || loadingProp,
    [disabled, loadingProp]
  );
  const loading = useButtonLoading(loadingProp);
  const children = useButtonChildren({
    loading,
    icon,
    iconPosition,
    children: childrenProp
  });

  return (
    <View
      className={clsx(prefixCls('btn'), {
        [prefixCls('btn-primary')]: primary,
        [prefixCls(`btn-${variant}`)]: variant,
        [prefixCls(`btn-${sizeProp}`)]: sizeProp,
        [prefixCls(`btn-${shape}`)]: shape,
        [prefixCls('btn-disabled')]: disabledState,
        [prefixCls(`btn-block`)]: block
      })}
      {...restProps}
    >
      {children}
    </View>
  );
};

export default Button;
