import { useCallback, useEffect, useState } from 'react';

type ScaleFnType = (width?: number) => {
  isScaleScreen: {
    transform: string;
  };
  scale: number;
};
const useScale: ScaleFnType = (width = 1920) => {
  const [isScaleScreen, setIsScaleScreen] = useState({
    transform: `scale(1)`,
  });

  const [scale, setScale] = useState(1);

  const onWidthChange = useCallback(() => {
    const { innerWidth } = window;
    setIsScaleScreen({
      transform: `scale(${innerWidth / width})`,
    });

    setScale(innerWidth / width);
  }, [window.innerWidth]);

  useEffect(() => {
    onWidthChange();
    window.addEventListener('resize', onWidthChange);
    return () => {
      window.removeEventListener('resize', onWidthChange);
    };
  }, []);

  return { isScaleScreen, scale };
};

export default useScale;
