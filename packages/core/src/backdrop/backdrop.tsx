import React from 'react';
import { useControllableValue } from '@zing-kit/hooks';
import clsx from 'clsx';
import { prefixCls } from '../shared/prefix';
import { MotionView } from '../shared/motion';

export interface BackdropProps {
  className?: string;
  open?: boolean;
  defaultOpen?: boolean;
  duration?: number;
  lock?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  const { lock, duration = 0.3, children } = props;
  const [open, setOpen] = useControllableValue(props, {
    defaultValue: props.defaultOpen,
    defaultValuePropName: 'defaultOpen',
    valuePropName: 'open',
    trigger: 'onClose',
  });
  return (
    <MotionView
      className={clsx(prefixCls('backdrop'), props.className)}
      animate={open ? 'open' : 'closed'}
      variants={{
        open: { opacity: 1, display: 'block' },
        closed: { opacity: 0, display: 'none' },
      }}
      onClick={() => setOpen(false)}
      transition={{ duration: duration,ease: 'easeInOut'}}
      catchMove={lock}
      children={children}
    />
  );
};

export default Backdrop;
