const COMPONENT_PREFIX = 'zing-';

export function prefixCls(className: string) {
  return `${COMPONENT_PREFIX}${className}`;
}
