import * as TechIcons from '@szhz/tech-pc/icons';
import { message } from 'antd';
import copy from 'copy-to-clipboard';
import { keys } from 'lodash-es';
import React from 'react';

import './styles/index.less';

const Icons = () => {
  const selectIcons = (name: string) => {
    const copyText = `<${name} />`;

    copy(copyText, {
      debug: true,
      message: 'Press #{key} to copy',
    });

    message.success(`Press ${copyText} to copy`);
  };

  return (
    <div className="icon">
      {keys(TechIcons)?.map((key: any) => {
        return (
          <div className="icon-item" key={key} onClick={() => selectIcons(key)}>
            {(TechIcons as any)[key]({
              style: {
                fontSize: '45px',
              },
            })}

            <div className="icon-item-name">{key}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Icons;
