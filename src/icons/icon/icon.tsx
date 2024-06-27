import { View, ViewProps } from "@tarojs/components";
import clsx from "clsx";
import { ComponentType, useMemo } from "react";
import { addUnitPx } from "@/components/utils/format/unit";

export const ICON_TYPE = Symbol("__iconType__");

interface ZIconProps extends Omit<ViewProps, "style" | "className"> {
  source: string;
  rotate?: number;
  spin?: boolean;
  size?: number;
  color?: string;
}

const ZIcon = (props: ZIconProps) => {
  const { source, size = 30, color, rotate, spin, children, ...restProps } = props;
  const rootStyle = useMemo(
    () => ({
      maskImage:`url(${source})`,
      '-webkit-mask-image':`url(${source})`,
      width: addUnitPx(size) || "",
      height: addUnitPx(size) || "",
      color: color || "red",
      transform: rotate ? `rotate(${rotate}deg)` : "",
    }),
    [size, rotate, color]
  );
  return (
    <View
      {...restProps}
      style={rootStyle}
      className={clsx("zing-icon", {
        "zing-icon--spin": spin,
      })}
    />
  );
};

const createZingIconComponent = (source: string) => {
  function ZingIconWrapper(props: ZIconProps) {
    return <ZIcon {...props} source={source} />;
  }

  ZingIconWrapper[ICON_TYPE] = ICON_TYPE;

  return ZingIconWrapper as ComponentType<Omit<ZIconProps, "source">>;
};

export default createZingIconComponent;
