
import { ArrowLeftIcon, FormTitleIcon } from '@szhz/tech-pc/icons';
import { getPrefixCls } from '@szhz/tech-pc/utils/styles';


import { isString } from 'antd/es/button';
import { isBoolean, isNumber } from 'lodash-es';
import React, { useMemo } from 'react';
import * as tmp from 'react-router';

import { FONTSIZE_MAP } from './constant';
import './index.less';
import { PageTitleProps } from './types';

// ignore waring `"export 'useNavigate' (imported as 'rc') was not found in 'react-router'`
const rc = tmp as any;

const TechPageTitle: React.FC<PageTitleProps> = (props) => {
  // react-router v5
  const history = rc.useHistory?.();
  // react-router v6
  const navigate = rc.useNavigate?.();

  const prefixCls = getPrefixCls('title');

  const {
    title,
    goBack,
    titleDesc,
    actionNode,
    style,
    clickEvent,
    type = 'page',
    titleType,
    onBackClick,
    hasBottomMargin = true,
    fontSize,
    children,
    ...restProps
  } = props;

  // 渲染标题
  const renderTitle = useMemo(() => {
    return title ?? children;
  }, [title, children]);

  // 标题类型
  const pageTitleType = useMemo(() => {
    return titleType ?? type;
  }, [titleType, type]);

  // 点击返回事件
  const handleBackClick = useMemo(() => {
    return clickEvent ?? onBackClick;
  }, [clickEvent, onBackClick]);

  const handleClick = () => {
    if (handleBackClick) {
      handleBackClick();
      return;
    }

    if (history) {
      history.go(-1);
      return;
    }

    if (navigate) {
      navigate(-1);
    }
  };

  const getBottomStyle = () => {
    if (!hasBottomMargin && hasBottomMargin !== 0) return '';

    if (isBoolean(hasBottomMargin)) {
      return hasBottomMargin ? '16px' : '0';
    }

    if (isString(hasBottomMargin) || isNumber(hasBottomMargin)) {
      return hasBottomMargin;
    }

    // 面对非预期输入时的错误处理逻辑
    console.error(
      'Invalid type for hasBottomMargin. Expected boolean, string, or number.',
    );
    return '';
  };

  const titleStyle = useMemo(() => {
    const marginBottom = getBottomStyle();

    return {
      ...(style ?? {}),
      marginBottom,
    };
  }, [hasBottomMargin, style]);

  // 渲染返回
  const renderBackIcon = useMemo(() => {
    if (pageTitleType !== 'page') return <></>;

    if (!goBack) return <></>;

    return (
      <div className={`${prefixCls}-left-bk`} onClick={handleClick}>
        <ArrowLeftIcon style={{ fontSize: '16px' }} />
      </div>
    );
  }, []);

  // 渲染form图标
  const renderFormIcon = useMemo(() => {
    if (pageTitleType !== 'form') {
      return <></>;
    }

    return <FormTitleIcon style={{ fontSize: '16px', marginRight: '8px' }} />;
  }, [pageTitleType]);

  // 标题的字体大小
  const titleFontSize = useMemo(() => {
    if (fontSize) {
      return {
        fontSize,
      };
    }

    return {
      fontSize: FONTSIZE_MAP[pageTitleType],
    };
  }, [fontSize, pageTitleType]);

console.log(1);

  return (
    <div
      className={`${prefixCls} ${prefixCls}-${pageTitleType}`}
      style={titleStyle}
      {...restProps}
    >
      <div className={`${prefixCls}-left`}>
        {renderBackIcon}
        {renderFormIcon}

        <div style={titleFontSize} className={`${prefixCls}-left-title`}>
          {renderTitle}
        </div>

        {titleDesc && titleDesc}
      </div>
      <div className={`${prefixCls}-right`}>{actionNode}</div>
    </div>
  );
};

export default TechPageTitle;
