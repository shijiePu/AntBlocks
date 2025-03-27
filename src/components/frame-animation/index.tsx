import React, { FC, useMemo, useRef } from 'react';

import useFrameAnimation from '@szhz/tech-pc/hooks/useFrameAnimation';
import { getPrefixCls, getStyle } from '@szhz/tech-pc/utils';
import './index.less';
import { FrameAnimationProps } from './types';

const TechFrameAnimation: FC<FrameAnimationProps> = ({
  imgNumber = 24,
  frameNumber,
  icon,
  width,
  height,
  direction,
  style = {},
}) => {
  const prefix = getPrefixCls('frame-animation');
  const animationEl = useRef<HTMLDivElement | null>(null);
  const setAnimationType = useFrameAnimation({
    ref: animationEl,
    direction,
    imgNumber,
    frameNumber,
  });

  const computedStyle = useMemo(() => {
    const widthStyle = getStyle('width', width);
    const heightStyle = getStyle('height', height);
    const bgUrl = icon ? getStyle('backgroundImage', `url(${icon})`) : {};

    return {
      ...widthStyle,
      ...heightStyle,
      ...bgUrl,
    };
  }, [icon, width, height]);

  const handleMouseEnter = () => {
    setAnimationType('in');
  };

  const handleMouseLeave = () => {
    setAnimationType('out');
  };

  return (
    <div
      className={prefix}
      style={{ ...style, ...computedStyle }}
      ref={animationEl}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    ></div>
  );
};

export default TechFrameAnimation;
