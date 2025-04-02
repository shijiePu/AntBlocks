import { useEffect, useState } from 'react';
import { tuple } from '../utils';

// mobile 移动,tablet 平板,laptop 笔记本,desktop 桌面
const DeviceTypes = tuple('mobile', 'tablet', 'laptop', 'desktop');

export type DeviceType = (typeof DeviceTypes)[number];

const useDeviceDetection = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>('laptop');

  // 检测当前是否有电池信息
  // const checkBattery = async () => {
  //   const battery = await (navigator as any)?.getBattery();
  //   if(battery) {
  //     setDeviceType("laptop");
  //     return
  //   }
  // }

  const getWindowDeviceType = () => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const isTablet = /Tablet|iPad|playbook|silk/i.test(navigator.userAgent);
    const isLaptopOrDesktop = !isMobile && !isTablet;

    if (isMobile) return 'mobile';

    if (isTablet) return 'tablet';

    const isLaptop = window.matchMedia('(min-device-width: 1220px)').matches;

    if (isLaptopOrDesktop && isLaptop) {
      return 'laptop';
    }

    return 'desktop';
  };

  useEffect(() => {
    const result = getWindowDeviceType();

    setDeviceType(result);
  }, []);

  return deviceType;
};

export default useDeviceDetection;
