import React from 'react';
import { useControllableValue } from '@zing-kit/hooks';
import Backdrop from '../backdrop';
import { MotionView } from '../shared/motion';
import { prefixCls } from '../shared/prefix';
import clsx from 'clsx';

export type PopupPosition = 'top' | 'bottom' | 'left' | 'right';

const POSITION_OPEN_KEY: Record<PopupPosition, string> = {
  top: 'topOpen',
  bottom: 'bottomOpen',
  left: 'leftOpen',
  right: 'rightOpen',
};

const POSITION_CLOSE_KEY: Record<PopupPosition, string> = {
  top: 'topClosed',
  bottom: 'bottomClosed',
  left: 'leftClosed',
  right: 'rightClosed',
};

export interface PopupProps {
  className?: string;
  open?: boolean;
  defaultOpen?: boolean;
  duration?: number;
  position?: PopupPosition;
  rounded?: boolean;
  lock?: boolean;
  closeable?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClose?: () => void;
}

const variants = {
  open: {
    opacity: 1,
    display: 'block',
  },
  bottomOpen: {
    transform: 'translateY(0%)',
    display: 'block',
  },
  topOpen: {
    transform: 'translateY(0%)',
    display: 'block',
  },

  leftOpen: {
    transform: 'translateX(0%)',
    display: 'block',
  },
  rightOpen: {
    transform: 'translateX(0%)',
    display: 'block',
  },

  closed: {
    opacity: 0,
    display: 'none',
  },
  bottomClosed: {
    transform: 'translateY(100%)',
    display: 'none',
  },
  topClosed: {
    transform: 'translateY(-100%)',
    display: 'none',
  },
  leftClosed: {
    transform: 'translateX(-100%)',
    display: 'none',
  },
  rightClosed: {
    transform: 'translateX(100%)',
    display: 'none',
  },
};

const Popup: React.FC<PopupProps> = (props) => {
  const { duration, closeable, position, lock, className, style, children } =
    props;
  const [open, setOpen] = useControllableValue(props, {
    defaultValue: props.defaultOpen,
    defaultValuePropName: 'defaultOpen',
    valuePropName: 'open',
    trigger: 'onClose',
  });

  const positionOpenKey = position ? POSITION_OPEN_KEY[position] : 'open';

  const positionClosedKey = position ? POSITION_CLOSE_KEY[position] : 'closed';

  return (
    <React.Fragment>
      <Backdrop
        open={open}
        onClose={() => {
          if (closeable) {
            setOpen(false);
          }
        }}
      />
      <MotionView
        className={clsx(
          prefixCls('popup'),
          {
            [prefixCls('popup-rounded')]: props.rounded,
            [prefixCls(`popup-${position}`)]: position,
            [prefixCls('popup-center')]: !position,
          },
          className,
        )}
        style={style}
        animate={open ? positionOpenKey : positionClosedKey}
        variants={variants}
        onClick={() => setOpen(false)}
        transition={{ duration: duration, ease: 'easeInOut' }}
        catchMove={lock}
        children={children}
      />
    </React.Fragment>
  );
};

export default Popup;
