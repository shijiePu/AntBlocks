
import { Button, Collapse, Form, FormInstance, Input, Radio } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";

import "./index.less";
import UnitSelect from "./unitSelect";

import { createCode, TechConfirm } from "@szhz/tech-pc";

export interface BindUnitFormProps {
  form: FormInstance;
}

const BindUnitForm: any = forwardRef(({ form }: BindUnitFormProps, ref) => {
  const units = Form.useWatch(['units'], form)
  const [openKeys, setOpenKeys] = useState<string[]>([])

  const deleteItem = (handleRemove: any) => {
    return <TechConfirm
      title="确认删除吗"
      description={null}
      confirm={handleRemove}
    >
      <a style={{ width: 35, display: 'block' }} onClick={e => e.stopPropagation()}>删除</a>
    </TechConfirm>
  }

  useImperativeHandle(ref, () => ({
    openCollapse: (keys: string[]) => {
      setOpenKeys([...openKeys, ...keys])
    },
  }));

  return <div className={'bind-unit-form'}>
    <Form.List name="units">
      {(unitFields, { add: addGroup, remove: removeGroup }) => {
        return (
          <>
            <Collapse activeKey={openKeys} onChange={setOpenKeys} expandIconPosition="end" items={
              unitFields.map((unitField, index) => {
                return {
                  key: form.getFieldValue(['units', unitField.name, 'collapseKey']),
                  label: <span className={'unitName'}>绑定单位{index + 1}</span>,
                  extra: (
                    <div className={'rightBtn'}>
                      {/* 默认单位 */}
                      <span>默认单位</span>
                      <Form.Item
                        {...unitField}
                        label=""
                        labelCol={{ span: 0 }}
                        valuePropName="checked"
                        name={[unitField.name, "isDefault"]}
                      >
                        <Radio onClick={e => e.stopPropagation()}></Radio>
                      </Form.Item>
                      {(form.getFieldValue(['units', [unitField.name], 'isNew'])) ? deleteItem(() => {
                        if (unitFields.length === 1) {
                          const oldValue = form.getFieldValue(['units', [unitField.name]])
                          form.setFieldValue(['units', unitField.name], { ...oldValue, dept: undefined, unit: undefined, position: undefined })
                        } else {
                          removeGroup(unitField.name)
                        }
                      }) : <></>}
                    </div>
                  ),
                  children: (
                    <>
                      <Form.Item
                        {...unitField}
                        label="单位名称"
                        name={[unitField.name, "unit"]}
                        rules={[
                          { required: true, message: '请选择单位名称' }
                        ]}
                      >
                        <UnitSelect />
                      </Form.Item>
                      <Form.Item
                        {...unitField}
                        label="所在部门"
                        name={[unitField.name, "dept"]}
                      >
                        <Input maxLength={20} placeholder="请输入所在部门" />
                      </Form.Item>
                      <Form.Item
                        {...unitField}
                        label="具体职务"
                        name={[unitField.name, "position"]}
                      >
                        <Input maxLength={20} placeholder="请输入具体职务" />
                      </Form.Item>
                    </>
                  )
                }
              })
            }
            >

            </Collapse>
            <Button
              style={{ width: '100%', marginTop: 10 }}
              // disabled={units?.length >= 2}
              type="dashed"
              onClick={() => {
                const code = createCode()
                addGroup({ collapseKey: code, isNew: true, isDefault: unitFields.length === 0 })
                setOpenKeys([...openKeys, code])
              }}
            >
              添加单位
            </Button>
          </>
        )
      }}
    </Form.List>
  </div>
})

export default BindUnitForm
