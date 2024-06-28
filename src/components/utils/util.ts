import { hasIn } from "lodash-es";
import clsx from "clsx";
import { cloneElement, isValidElement, ReactElement, ReactNode } from "react";
import { ICON_COMPONENT_TYPE, IconProps } from "../icon";

export function isIconElement(node?: ReactNode): boolean {
  if (!isValidElement(node)) {
    return false;
  }
  const element = node as ReactElement;
  return hasIn(element.type, ICON_COMPONENT_TYPE);
}

export function cloneIconElement(
  node: ReactNode,
  props: Omit<IconProps, "name">
): ReactNode {
  if (!isIconElement(node)) {
    return isValidElement(node) ? cloneElement(node, props) : node;
  }
  const { className, ...restProps } = props;
  const element = node as ReactElement;
  const { props: oldProps } = element;
  const newProps: IconProps = {
    ...oldProps,
    className: clsx(oldProps.className, className),
    ...restProps,
  };
  return cloneElement(element, newProps);
}
