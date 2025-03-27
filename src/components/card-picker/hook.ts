import { useEffect, useState } from 'react';

export interface useFirstItemInNewLineProps {
  className: string;
  ref: any;
}

const useFirstInNewLine = ({ className, ref }: useFirstItemInNewLineProps) => {
  const [firstKeyMap, setFirstKeyMap] = useState<Record<string, string>>({});

  const getFirstItemInNewLine = () => {
    const flexItems = (ref.current as any)?.querySelectorAll(`.${className}`);

    if (!flexItems?.length) return;

    let lineBottom = 0;

    flexItems.forEach((item: any, index: number) => {
      const itemRect = item.getBoundingClientRect();
      const key = item.getAttribute('data-key');

      if (index === 0) {
        setFirstKeyMap((pre: any) => ({
          ...pre,
          [key]: key,
        }));

        lineBottom = itemRect.bottom;

        return;
      }

      if (itemRect.bottom > lineBottom) {
        setFirstKeyMap((pre: any) => ({
          ...pre,
          [key]: key,
        }));
        lineBottom = itemRect.bottom;
      }
    });
  };

  const handleResize = () => {
    setFirstKeyMap({});
    getFirstItemInNewLine();
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);

  return { firstKeyMap };
};

export default useFirstInNewLine;
