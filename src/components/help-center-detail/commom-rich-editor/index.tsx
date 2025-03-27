import {
  Boot,
  DomEditor,
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import formulaModule from '@wangeditor/plugin-formula';
import { Form, message } from 'antd';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { isEditorEmpty } from './help';
import './index.less';
import { upload } from './service';

// 注册。要在创建编辑器之前注册，且只能注册一次，不可重复注册。
Boot.registerModule(formulaModule);

interface RichEditorProps {
  form?: any;
  name?: string;
  label?: string;
  isFormItem?: boolean;
  readonly?: boolean;
  value?: any;
  height?: any;
  limitNum?: number;
  required?: boolean;
  disabled?: boolean;
  propsStyle?: any;
  tips?: string;
}

const RichEditor: FC<RichEditorProps> = ({
  form,
  label,
  name,
  isFormItem,
  value,
  readonly,
  height = 500,
  limitNum = 30000,
  required = true,
  disabled = false,
  propsStyle = {},
  tips
}) => {
  // 创建style标签并设置CSS内容
  // const style = document.createElement('style');
  // style.innerHTML = `.w-e-text-container p { font-size: 21.5px;font-family:'SimSun' }`

  // 将style标签添加到head中
  // document.head.appendChild(style);
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [count, setCount] = useState(0);
  const formValue = form?.getFieldsValue() || {};
  const [imgHtml, setImgHtml] = useState('');
  // 编辑器内容
  // @ts-ignore
  const [html, setHtml] = useState((formValue && formValue[name]) || '');
  //
  const [isEmptyValid, setEmptyValid] = useState(false);

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    // @ts-ignore
    setHtml(formValue[name]);
  }, [formValue]);

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    insertKeys: {
      index: 0,
      keys: [
        // 'insertFormula', // “插入公式”菜单
        // 'editFormula', // “编辑公式”菜单
      ],
    },
    excludeKeys: [
      // 'uploadImage',
      'insertFormula',
      'editFormula',
      'insertImage',
      'video',
      'insertVideo',
      'uploadVideo',
      'emotion',
      'insertLink',
      'codeBlock',
      'code',
      // 'fontSize',
      // 'fontFamily',
      // 'image',
      // 'editImage',
      // 'group-image',
      'group-video',
      'fullScreen',
    ],
  };

  // 模拟文件选择器
  function openFilePicker() {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*'; // 限制只能选择图片类型
      input.onchange = () => {
        // @ts-ignore
        const file = input.files[0];
        if (file) {
          // 定义允许的 MIME 类型
          const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/bmp',
          ];
          const maxSize = 10 * 1024 * 1024; // 10MB
          // 检查文件类型是否符合要求
          if (!allowedTypes.includes(file.type)) {
            message.error(`文件 ${file.name} 不是有效的图片类型`);
            resolve(null); // 解决 Promise，但不传递文件
            return;
          }
          // 检查文件大小是否超过限制
          if (file.size > maxSize) {
            message.error(`文件 ${file.name} 太大了，最大支持 10MB 的图片`);
            resolve(null); // 解决 Promise，但不传递文件
            return;
          }
          resolve(file);
        } else {
          resolve(null);
        }
      };
      input.click();
    });
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    // @ts-ignore
    const toolbar = DomEditor.getToolbar(editor);
    const curToolbarConfig = toolbar?.getConfig();
    // console.log('123', toolbar?.getConfig());
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  // 编辑器配置
  let editorConfig: Partial<IEditorConfig> = {
    // customPaste(editor, event) {
    //   const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
    //   console.log('text',text);

    //   // 同步
    //   editor.insertText(text);
    //   // 阻止默认的粘贴行为
    //   event.preventDefault();
    // return false
    // },
    placeholder: '请输入内容...',
    // onMaxLength(editor) {
    //   alert('Trigger maxlength callback')
    // },
    // html: `<p>MaxLength: ${limitNum}</p><p><br></p>`,
    // maxLength: limitNum,
    MENU_CONF: {
      uploadImage: {
        fieldName: 'file',
        // 单个文件的最大体积限制，默认为 2M
        maxFileSize: 10 * 1024 * 1024, // 10M
        // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
        allowedFileTypes: ['image/jpg', 'image/jpeg', 'image/png'],
        // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
        // meta: {
        //   token: localStorage.getItem('token'),
        // },
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        server: '/szjs-api/gateway/program/attachment/upload',
        // 自定义插入图片
        customInsert: (res: any, insertFn: any) => {
          // TS 语法
          // customInsert(res, insertFn) {                  // JS 语法
          // res 即服务端的返回结果
          // 从 res 中找到 url alt href ，然后插入图片
          insertFn(res?.data?.fileUrl, res?.data?.fileName, res?.data?.fileUrl);
        },
        // customUpload: handleImageUpload, // 自定义上传方法
        customBrowseAndUpload: async (insertFn: any) => {
          const file = await openFilePicker(); // 用户选择文件
          if (!file) return; // 如果没有选择有效的图片文件，则退出
          const formData = new FormData();
          // @ts-ignore
          formData.append('file', file);
          const res = await upload(formData);
          const imgUrl = res?.fileUrl;
          const imgHtml = `<div><img src="${imgUrl}" alt="image" style="width: 300px; height: 300px"/><div>`;
          setImgHtml(imgHtml);
        },
        // 自定义插入图片
        // customInsert: (res: any, insertFn) => {
        //   const imgUrl = res?.data?.fileUrl;
        //   const imgHtml = `<div><img src="${imgUrl}" alt="image" style="width: 300px; height: 300px"/><div>`;
        //   setImgHtml(imgHtml);
        // },
      },
      fontFamily: {
        fontFamilyList: [
          '宋体',
          '黑体',
          '仿宋',
          '楷体',
          '华文仿宋',
          '华文楷体',
          '微软雅黑',
          'Arial',
        ],
      },
    },
    hoverbarKeys: {
      image: {
        // 清空 image 元素的 hoverbar
        menuKeys: [],
      },
    },
  };

  useEffect(() => {
    if (!!imgHtml && !!editor) {
      editor.dangerouslyInsertHtml(imgHtml);
    }
  }, [imgHtml]);

  const handleEditorChange = async (editor: any) => {
    // console.log('');

    const value = editor?.getHtml(); //要传入后端的值

    const plainText = editor
      ?.getText()
      ?.replace(/\s+/g, '')
      ?.replace(/''/g, '')
      ?.trim(); // 获取纯文本
    const [trimmedHtml, msg] = await isEditorEmpty(value, plainText, limitNum);
    if (plainText) {
      setEmptyValid(false);
    }
    if (!count && !trimmedHtml) {
      setCount(count + 1);
      return;
    }
    setCount(count + 1);
    setHtml(trimmedHtml);
    console.log(999999);

    form?.setFieldsValue({
      // @ts-ignore
      [name]: trimmedHtml,
      [`${name}TextCount`]: (
        editor?.getText()?.replace(/\s+/g, '')?.trim() || ''
      ).length,
    });
  };

  const validate = useMemo(() => {
    return async (rules: any, value: any) => {
      if (!rules.required) {
        return Promise.resolve();
      }
      const plainText = editor?.getText()?.replace(/\s+/g, '')?.trim() || ''; // 去除 HTML 标签
      if (!plainText) {
        message.error(`存在未填信息！`);
        setEmptyValid(true);
        return Promise.reject('请填写');
      }
      setEmptyValid(false);
      if (limitNum && plainText.length > limitNum) {
        message.error(`${tips || label}，超出${limitNum}字数限制`);
        return Promise.reject(``);
      }
      return Promise.resolve();
    };
  }, [limitNum, editor, editor?.getText()]);

  const rules = [{ required, validator: validate }];

  if (readonly) {
    return (
      <Editor
        defaultConfig={{ readOnly: true }}
        value={value}
        style={{ height, overflowY: 'hidden', marginTop: '-16px' }}
      />
    );
  }

  const editorContent = (
    <div
      style={{
        border: `1px solid ${isEmptyValid ? 'red' : '#ccc'}`,
        zIndex: 100,
        fontFamily: '宋体',
      }}
    >
      <span
        style={{
          width: '100%',
          textAlign: 'right',
          color: 'red',
          fontSize: 16,
          paddingLeft: 8,
          fontWeight: 'bold',
        }}
      >
        {` 注意：有需上传图片情况请逐个上传或粘贴，有插入公式、表格需求的建议转换为图片再进行粘贴/插入`}
      </span>
      <Toolbar
        //@ts-ignore
        id="toolbar"
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: '1px solid #ccc' }}
      />
      <Editor
        defaultConfig={{ ...editorConfig, readOnly: disabled }}
        value={html}
        onCreated={setEditor}
        onChange={handleEditorChange}
        mode="default"
        style={{ height, overflowY: 'hidden' }}
      />
    </div>
  );

  return (
    <>
      {isFormItem ? (
        <>
          <Form.Item label={label} name={name} rules={rules}>
            {editorContent}
          </Form.Item>
          <Form.Item noStyle name={`${name}TextCount`}></Form.Item>
        </>
      ) : (
        <Form form={form} layout="vertical">
          {' '}
          <Form.Item label={label} name={name} rules={rules}>
            {editorContent}
          </Form.Item>
          <Form.Item name={`${name}TextCount`}></Form.Item>
        </Form>
      )}
      {/* <Editor
        defaultConfig={{ readOnly: true }}
        value={html}
        style={{ height: '500px', overflowY: 'hidden' }}
      /> */}
    </>
  );
};

export default RichEditor;
