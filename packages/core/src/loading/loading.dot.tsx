import React from 'react';
import range from 'lodash/range';
import { MotionView } from '../shared/motion';
import { prefixCls } from '../shared/prefix';
import { addUnitPx } from '../utils/format/unit';

export interface LoadingDotProps {
  size?: number;
  color?: string;
}

const dots = range(3);

const DotVariants = {
  initial: {
    y: '0%',
  },
  animate: {
    y: '100%',
  },
};

const DotTransition = {
  duration: 0.5,
  repeat: Infinity,
  ease: 'easeInOut',
};

const LoadingDot: React.FC<LoadingDotProps> = (props) => {
  const { size, color } = props;
  return (
    <MotionView
      className={prefixCls('loading-dot')}
      variants={{
        initial: {
          transition: {
            staggerChildren: 0.2,
          },
        },
        animate: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
      initial="initial"
      animate="animate"
    >
      {dots.map((_, index) => (
        <MotionView
          key={index}
          className={prefixCls('loading-dot-item')}
          style={{
            width: size ? addUnitPx(size / 5) : undefined,
            height: size ? addUnitPx(size / 5) : undefined,
            backgroundColor: color,
          }}
          variants={DotVariants}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: 0.2 * index,
            ease: 'easeInOut',
          }}
        />
      ))}
    </MotionView>
  );
};
export default LoadingDot;
