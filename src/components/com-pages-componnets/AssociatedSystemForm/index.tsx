import { PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, FormInstance, Input } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";

import AddSystem from "../AddSystem";
import ConfirmAccount from "../ConfirmAccount";

import { createCode, TechConfirm, TechDetail, TechDetailItem } from "@szhz/tech-pc";
import { checkOldLegalAccount, checkOldLegalAccountUnit } from "@szhz/tech-pc/service/register";
import "./index.less";

export interface AssociatedSystemFormProps {
  form: FormInstance;
  type?: "legal" | "person";
}

const AssociatedSystemForm: any = forwardRef(({ form, type }: AssociatedSystemFormProps, ref) => {

  const groups = Form.useWatch('groups', form)
  const [openKeys, setOpenKeys] = useState<string[]>([])

  const infoItems: TechDetailItem[] = [
    {
      label: '账号名',
      key: 'accountName',
    },
    {
      label: '姓名',
      key: 'userName',
    },
    {
      label: '联系方式',
      key: 'mobile',
    },
    {
      label: '所在单位名称',
      key: 'unitName',
    },
    {
      label: '统一社会信用代码/组织机构代码',
      key: 'institutionCode',
    },
  ];

  const deleteItem = (handleRemove: any, disabled?: boolean) => {
    return <TechConfirm
      title="确认删除吗"
      description={null}
      confirm={handleRemove}
    >
      <Button style={{ padding: 0, height: 24 }} type="link" disabled={disabled} onClick={e => e.stopPropagation()}>删除</Button>
    </TechConfirm>
  }

  const handleConfirmAccount = (state: string | undefined, gIndex: number, index: number) => {
    const values = [...groups]
    values[gIndex]['members'][index].confirm = state
    form.setFieldValue('groups', values)
  }

  const checkHistoryName = async (rule: any, value: any, system: any) => {
    if (!value) {
      return Promise.resolve()
    }
    const res = await checkOldLegalAccount({ accountName: value, bizSystem: system })

    if (res) {
      return Promise.reject(new Error(res))
    } else {
      return Promise.resolve()
    }
  }
  const checkUnitName = async (rule: any, value: any, unitInfoField: any, system: any, accountName: any) => {
    if (!value || !accountName) {
      return Promise.resolve()
    }
    const res = await checkOldLegalAccountUnit({ unitName: value, accountName, bizSystem: system })

    if (!res) {
      return Promise.reject(new Error('单位不匹配：请核对账号所在单位'))
    } else {
      // 校验成功，会返回单位信息，需要存储起来后面提交
      form.setFieldValue(unitInfoField, res)
      return Promise.resolve()
    }
  }

  const HistoryAccountForm = (memberField: any, groupField: any) => <Form.Item
    {...memberField}
    label="历史账号名"
    name={[memberField.name, "history"]}
    rules={[
      { required: true, message: "请输入历史账号名" },
      ({ getFieldValue }) => {
        const system = getFieldValue(['groups', groupField.name, "id"])
        return {
          validator: (_, value) => checkHistoryName(_, value, system),
        }
      },
    ]}
  >
    <Input placeholder={`输入“${form.getFieldValue(['groups', [groupField.name], 'name'])}"的个人账号`} />
  </Form.Item>

  const AccountUnitForm = (memberField: any, groupField: any) => <Form.Item
    {...memberField}
    label="账号单位"
    name={[memberField.name, "unit"]}
    rules={[
      { required: true, message: "请选择账号单位" },
      ({ getFieldValue }) => {
        const history = getFieldValue(['groups', groupField.name, 'members', memberField.name, "history"])
        const system = getFieldValue(['groups', groupField.name, "id"])
        const unitInfoField = ['groups', groupField.name, 'members', memberField.name, "uniInfo"]
        return {
          validator: (_, value) => checkUnitName(_, value, unitInfoField, system, history),
        }
      },
    ]}
  >
    <Input maxLength={50} placeholder="请输入账号所在单位" />
  </Form.Item>

  useImperativeHandle(ref, () => ({
    openCollapse: (keys: string[]) => {
      setOpenKeys([...openKeys, ...keys])
    },
  }));


  return <div className={'associated-system-form-rapper'}>
    <Form.List name="groups">
      {(groupFields, { remove: removeGroup }) => (
        <>
          {/* <Button
            disabled={groups?.length >= 2}
            type="primary"
            style={{ marginBottom: 10 }}
            onClick={() => addGroup({ name: '系统2', isNew: true, members: [] })}
          >
            添加关联系统
          </Button> */}
          <AddSystem type={type} value={groups} onOk={(res: any) => {
            const data = res?.map((i: any) => {
              return {
                ...i,
                collapseKey: createCode(),
                isNew: i.isNew ?? true,
                members: i.members ? i.members : [{ isNew: true }]
              }
            })
            form.setFieldValue('groups', data)

            const newOpenKeys = data.filter((i: any) => i?.isNew)?.map((i: any) => i?.collapseKey) || []

            setOpenKeys([...openKeys, ...newOpenKeys])
          }}></AddSystem>
          <Collapse activeKey={openKeys} onChange={setOpenKeys} expandIconPosition="end" items={
            groupFields.map((groupField, gIndex) => {
              return {
                key: form.getFieldValue(['groups', groupField.name, 'collapseKey']),
                label: <span className={'groupName'}>{form.getFieldValue(['groups', [groupField.name], 'name'])}<span style={{ color: 'red', fontSize: 13 }}>（请输入您在“{form.getFieldValue(['groups', [groupField.name], 'name'])}”的历史帐号信息，数据关联成功后可正常使用系统）</span></span>,
                extra: (
                  form.getFieldValue(['groups', [groupField.name], 'isNew']) ? deleteItem(() => removeGroup(groupField.name), groupFields?.length === 1) : <></>
                ),
                children: (
                  <Form.List name={[groupField.name, "members"]}>
                    {(memberFields, { add: addMember, remove: removeMember }) => (
                      <div style={{ paddingLeft: 20 }}>
                        {memberFields.map((memberField, index) => (
                          <div className={'accountItem'} key={memberField.key} >
                            <div className={'accountTitle'}>
                              {/* <span className={accountName}>{form.getFieldValue(['groups', [groupField.name], 'members', [memberField.name], 'name'])}</span> */}
                              <span className={'accountName'}>关联账号{index + 1}</span>
                              <div className={'rightBtn'}>
                                {form.getFieldValue(['groups', [groupField.name], 'members', [memberField.name], 'isNew']) ? deleteItem(() => {
                                  if (memberFields.length === 1) {
                                    const oldValue = form.getFieldValue(['groups', [groupField.name], 'members', [memberField.name]])
                                    form.setFieldValue(['groups', groupField.name, 'members', memberField.name], { ...oldValue, history: undefined, unit: undefined })
                                  } else {
                                    removeMember(memberField.name)
                                  }
                                }) : <></>}
                              </div>
                            </div>
                            {form.getFieldValue(['groups', [groupField.name], 'members', [memberField.name], 'isNew']) ? <>
                              {HistoryAccountForm(memberField, groupField)}
                              {AccountUnitForm(memberField, groupField)}
                            </> : <div style={{ position: 'relative' }}>
                              <TechDetail
                                title=""
                                labelStyle={{ minWidth: 112, maxWidth: 112 }}
                                dataSource={form.getFieldValue(['groups', [groupField.name], 'members', [memberField.name]])}
                                items={infoItems}
                                column={1}
                              ></TechDetail>
                              <div style={{ position: 'absolute', right: 10, top: 0 }}>
                                {/* @ts-ignore */}
                                <ConfirmAccount form={form} name={['groups', [groupField.name], 'members', [memberField.name], 'confirm']} onConfirm={(s) => handleConfirmAccount(s, gIndex, index)} />
                              </div>
                            </div>}
                          </div>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => addMember({ name: '关联账号x', isNew: true, })}
                          icon={<PlusOutlined />}
                          style={{ marginTop: 10, width: '100%' }}
                        >
                          添加关联账号
                        </Button>
                      </div>
                    )}
                  </Form.List>
                )
              }
            })
          }
          >

          </Collapse>
        </>
      )}
    </Form.List>
  </div>
})

export default AssociatedSystemForm
