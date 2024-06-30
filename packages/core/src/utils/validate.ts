import {
  isValidElement,
  JSXElementConstructor,
  ReactElement,
  ReactNode
} from 'react';
import {
  endsWith,
  get,
  isArray,
  isEmpty,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined
} from 'lodash-es';

export function isNoneElement(node: ReactNode) {
  return isUndefined(node) || isNull(node);
}

export function isTextElement(node: ReactNode) {
  return isNumber(node) || isString(node);
}

export function isObjectElement(node?: ReactNode) {
  return !isValidElement(node) && isObject(node) && !isArray(node);
}

export function isElementOf(
  node?: ReactNode,
  type?: JSXElementConstructor<any>
) {
  if (isValidElement(node)) {
    const element = node as ReactElement;
    if (element.type === type) {
      return true;
    }

    const displayName = get(element.type, 'displayName');
    if (
      isFunction(element.type) &&
      !isEmpty(displayName) &&
      endsWith(displayName, get(type, 'displayName'))
    ) {
      return true;
    }
  }
  return false;
}

export const isDef = <T,>(val: T): val is NonNullable<T> =>
  val !== undefined && val !== null;
