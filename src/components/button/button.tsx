import React, {useState, useEffect, useMemo} from "react";
import clsx from "clsx";
import { ButtonProps, Button, View } from "@tarojs/components";
import type { BtnColor, BtnShape, BtnSize, BtnVariant } from "./interface";

import "./style";

export interface IZButtonProps extends Omit<ButtonProps, "size" | "type"> {
  /**
   * 按钮类型
   * @default 'contained'
   * @description 按钮类型
   * @type string
   */
  variant?: BtnVariant;
  /**
   * 按钮颜色
   * @default 'default'
   * @description 按钮颜色
   * @type string
   */
  color?: BtnColor;
  /**
   * 按钮大小
   * @default 'normal'
   * @description 按钮大小
   * @type string
   */
  size?: BtnSize;
  /**
   * 按钮形状
   * @default 'normal'
   * @description 按钮形状
   * @type string
   */
  shape?: BtnShape;
  /**
   * 是否为块级元素
   * @default false
   * @description 是否为块级元素
   * @type boolean
   */
  block?: boolean;
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
}

const ZButton: React.FC<IZButtonProps> = (props) => {
  const {
    variant,
    color,
    size,
    shape,
    block,
    disabled,
    loading,
    children,
    ...restProps
  } = props;

  const disabled = useMemo(()=> disabled || loading, [disabled, loading])

  return (
    <View
      className={clsx("btn", {
        [`btn-${variant}`]: variant,
        [`btn-${color}`]: color,
        [`btn-${size}`]: size,
        [`btn-${shape}`]: shape,
        ["btn-disabled"]: disabled || loadingState,
        [`btn-block`]: block,
      })}
      {...restProps}
    >
      {children}
      <Button className="btn-placeholder" />
    </View>
  );
};

export default ZButton;
