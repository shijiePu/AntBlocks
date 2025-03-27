import { getDepList } from "@szhz/tech-pc/service/unit-info";
import { TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';


const { TreeNode } = TreeSelect;

const MyTreeSelect = ({ value, onChange, form, field }: any) => {
  const [depOptions, setDepOptions] = useState([]); // 部门下拉选项

  useEffect(() => {
    const transformTree = (node: any) => {
      return {
        title: node.orgName,
        value: node.orgCode,
        children: node.children?.map(transformTree), // 递归处理子节点
      };
    };
    getDepList({}).then((res: any) => {
      setDepOptions(res?.map(transformTree))
    })
  }, [])

  // 渲染树节点
  const renderTreeNodes = (data: any) =>
    data.map((item: any) => {
      if (item?.children?.length) {
        // 非叶子节点，禁用选择
        return (
          <TreeNode title={item.title} value={item.value} key={item.value} disabled>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      // 叶子节点，允许选择
      return <TreeNode title={item.title} value={item.value} key={item.value} />;
    });

  // 前端检索函数
  const filterTreeNode = (inputValue: any, treeNode: any) => {
    // 根据标题匹配
    return treeNode.title.toLowerCase().includes(inputValue.toLowerCase());
  };

  return (
    <TreeSelect
      style={{ width: '100%' }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="请选择主管部门"
      allowClear
      treeDefaultExpandAll // 默认展开所有节点
      onChange={(v, option) => { form.setFieldValue(field, option[0]); onChange(v) }}
      filterTreeNode={filterTreeNode} // 支持前端检索
      showSearch // 开启搜索功能
    >
      {renderTreeNodes(depOptions)}
    </TreeSelect>
  );
};

export default MyTreeSelect;
