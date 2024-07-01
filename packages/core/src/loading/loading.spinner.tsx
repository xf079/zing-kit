import React from 'react';
import { MotionView } from '../shared/motion';
import { prefixCls } from '../shared/prefix';

export interface LoadingSpinnerProps {
  size?: number | string;
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = (props) => {
  const { size, color } = props;
  return (
    <MotionView
      className={prefixCls('loading-spinner')}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
      animate={{
        rotate: 360,
        borderRadius: ['50% 50%', '2% 50%'],
        x: 75,
      }}
      initial={{
        x: -75,
      }}
      transition={{
        flip: Infinity,
        duration: 2,
        ease: 'easeInOut',
      }}
    />
  );
};
export default LoadingSpinner;
