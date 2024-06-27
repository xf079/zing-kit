import React, {
  Children,
  cloneElement,
  ReactElement,
  ReactNode,
  useMemo,
} from "react";
import clsx from "clsx";
import { isBoolean, map, size } from "lodash-es";
import { ButtonProps, Button, View } from "@tarojs/components";
import { Loading, LoadingProps } from "../loading";
import { prefixCls } from "../styled/prefix";
import { isElementOf, isObjectElement } from "../utils/validate";
import { BtnIconPosition, BtnShape, BtnSize, BtnVariant } from "./interface";

export interface IZButtonProps extends Omit<ButtonProps, "size" | "type"> {
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
  // return isIconElement(icon) ? cloneIconElement(icon, { className }) : icon
  return icon;
};

const useButtonLoading = (
  loading?: boolean | LoadingProps | ReactElement
): ReactNode => {
  return useMemo(() => {
    if (isBoolean(loading) && loading) {
      return (
        <Loading
          className={clsx(
            prefixCls("btn-loading"),
            prefixCls("button-loading__right")
          )}
        />
      );
    }

    if (isObjectElement(loading as ReactNode)) {
      const { className, ...restProps } = loading as LoadingProps;
      return (
        <Loading
          className={clsx(
            prefixCls("btn-loading"),
            prefixCls("btn-loading__right"),
            className
          )}
          {...restProps}
        />
      );
    }

    if (isElementOf(loading as ReactNode, Loading)) {
      return cloneElement(loading as ReactElement, {
        className: clsx(
          prefixCls("btn-loading"),
          prefixCls("btn-loading__right")
        ),
      });
    }

    return loading as ReactNode;
  }, [loading]);
};

function useButtonChildren(options: UseButtonChildrenOptions) {
  const { loading, icon: iconProp, children, iconPosition } = options;
  const childrenArray = Children.toArray(children);
  const lastIndex = size(childrenArray) - 1;

  const icon = appendButtonIconClassname(
    iconProp,
    prefixCls(iconPosition === "left" ? "btn-icon__right" : "btn-icon__left")
  );

  return (
    <>
      {loading}
      {iconPosition === "left" && icon}
      {map(childrenArray, (child, index) => {
        // if (isIconElement(child) && index === 0) {
        //   return appendButtonIconClassname(child, prefixCls("btn-icon--right"));
        // }
        // if (isIconElement(child) && index === lastIndex) {
        //   return appendButtonIconClassname(child, prefixCls("btn-icon--left"));
        // }
        return (
          <View key={index} className={prefixCls("btn__text")}>
            {child}
          </View>
        );
      })}
      {iconPosition === "right" && icon}
    </>
  );
}

const ZButton: React.FC<IZButtonProps> = (props) => {
  const {
    variant,
    primary,
    size: sizeProp,
    shape,
    block,
    disabled,
    icon,
    iconPosition,
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
    children: childrenProp,
    loading,
    icon,
    iconPosition,
  });

  return (
    <View
      className={clsx(prefixCls("btn"), {
        [prefixCls("btn-primary")]: primary,
        [prefixCls(`btn-${variant}`)]: variant,
        [prefixCls(`btn-${sizeProp}`)]: sizeProp,
        [prefixCls(`btn-${shape}`)]: shape,
        [prefixCls("btn-disabled")]: disabledState,
        [prefixCls(`btn-block`)]: block,
      })}
      {...restProps}
    >
      {children}
      <Button className='btn-placeholder' />
    </View>
  );
};

export default ZButton;
