const COMPONENT_PREFIX = 'z-';

export function prefixCls(className: string) {
  return `${COMPONENT_PREFIX}${className}`;
}
