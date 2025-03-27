/**
 * title: 单行文本使用
 * description: 可设置 width，maxChars最多字数
 */
import { TechTextEllipsis } from '@szhz/tech-pc';
import React from 'react';

const Single = () => {
  const textText =
    '这是测试的数据测试的文案,sd这是测试的文案这是测试的数据测试的文案,这是测试的文案这是测试的数据测试的文案,这是测试的文案这是测试的数据测试的文案,这是测试的文案';

  const shortText = '这是测试的数据测试的文案';

  return (
    <>
      <h3>基本使用(未超过长度)</h3>
      <TechTextEllipsis.Single text={shortText}></TechTextEllipsis.Single>
      <h3>基本使用(超过长度)</h3>
      <TechTextEllipsis.Single text={textText}></TechTextEllipsis.Single>
      <h3>单行限制字数</h3>
      <TechTextEllipsis.Single
        maxChars={15}
        text={textText}
      ></TechTextEllipsis.Single>

      <h3>单行限制宽度</h3>

      <TechTextEllipsis.Single
        width="80px"
        text={textText}
      ></TechTextEllipsis.Single>
    </>
  );
};

export default Single;
