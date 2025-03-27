import { TechFrameAnimation } from '@szhz/tech-pc';
import React from 'react';
import icon from '../assets/icon.png';
import icon1 from '../assets/icon1.png';

export default () => {
  return (
    <div
      style={{
        width: '100%',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h3>24张图片的动画</h3>
      <TechFrameAnimation
        imgNumber={24}
        width={'103px'}
        height={'103px'}
        icon={icon}
      ></TechFrameAnimation>
      <h3>26张图片的动画</h3>

      <TechFrameAnimation
        imgNumber={26}
        width={'160px'}
        height={'160px'}
        icon={icon1}
      ></TechFrameAnimation>
    </div>
  );
};
