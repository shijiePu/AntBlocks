/**
 * title: 多行文本使用
 * description: 可设置 width，lines
 */
import { TechTextEllipsis } from '@szhz/tech-pc';
import React from 'react';

const MultiDemo = () => {
  const demoText =
    'Multi，这是测试的数据，这是测试的数据，这是测试的数据，这是测试的数据，这是测试的数据，这是测试的数据';

  return (
    <>
      <h3>默认两行截断</h3>
      <TechTextEllipsis.Multi text={demoText}></TechTextEllipsis.Multi>
      <h3>限制宽度</h3>
      <TechTextEllipsis.Multi
        text={demoText}
        width="160px"
      ></TechTextEllipsis.Multi>
    </>
  );
};

export default MultiDemo;
