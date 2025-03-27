import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { TechForm } from '@szhz/tech-pc';
import { Button, Drawer, Form, Modal } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

import { addMember, updateMemberInfo } from '@szhz/tech-pc/service/member-manage';
import { debounce } from 'lodash-es';

import './drawer.less';

const ChangeDep = ({ id, record, run, disabled }: any) => {
  const [vis, setVis] = useState(false); // Drawer显隐状态
  const [loading, setLoading] = useState(false); // 提交按钮loading

  const [form] = Form.useForm();

  // 提交
  const handleSubmit = debounce(async () => {
    const api = id ? updateMemberInfo : addMember;
    const res = await form.validateFields()
    try {
      setLoading(true)
      await api({ ...res, id, roleCode: res?.roleCode?.join(',') })
      setVis(false);
      run()
    } catch (error) {
      // 如果需要处理特定的错误，可以在这里添加错误处理逻辑
    } finally {
      setLoading(false); // 请求完成后总是将loading设置为false
    }
  }, 300)

  useEffect(() => {
    // 详情回填表单
    if (vis && id) {
      form.setFieldsValue({ ...record, roleCode: record?.roleCode?.split(',') })
    }
  }, [vis, id])

  const groupItems: any = useMemo(() => {
    return [
      {
        title: '',
        columns: 1,
        items: [
          {
            label: '姓名',
            name: 'name',
            required: true,
            fieldProps: {
              maxLength: 50,
              disabled: !!id,
              style: {
                width: '50%'
              }
            }
          },
          {
            label: <><span>手机号</span>&nbsp;&nbsp;&nbsp;&nbsp;<ExclamationCircleTwoTone />&nbsp;<a onClick={() => {
              Modal.confirm({
                width: 600,
                title: '搜索不到成员怎么办？',
                // okText: '知道了',
                closable: true,
                // cancelText: '',
                footer: null,
                content: <>
                  <div>
                    <p>1、联系公司成员注册苏服码并登录科技计划系统。</p>
                    苏服码个人注册地址： <a target='_blank' href="https://www.jszwfw.gov.cn/jsjis/front/register/perregister.do">https://www.jszwfw.gov.cn/jsjis/front/register/perregister.do</a></div>
                  <p></p>
                  <div>2、公司成员在登录科技计划系统之后，可提交单位绑定申请。该申请需由目标企业管理员进行审核，审核通过后完成绑定。公司管理员也可在成员管理界面中，依据用户的姓名和手机号码信息进行搜索并添加。 </div>
                </>,
              })
            }}>搜索不到成员怎么办？</a></>,
            name: 'mobile',
            required: '请输入手机号',
            regKey: 'phone',
            fieldProps: {
              disabled: !!id,
              style: {
                width: '50%'
              }
            }
          },
          // @ts-ignore
        ].concat((!record?.roleCode?.includes('super_admin') && id) ? [
          {
            label: '角色',
            name: 'roleCode',
            // @ts-ignore
            type: 'select',
            // required: true,
            fieldProps: {
              mode: 'multiple',
              dictKey: 'memberRoleSelect',
              style: {
                width: '50%'
              }
            }
          }
          // @ts-ignore
        ] : []).concat(id ? [
          {
            label: '所在部门',
            name: 'dept',
            // required: true,
            fieldProps: {
              maxLength: 20,
              style: {
                width: '50%'
              }
            }
          },
          {
            label: '具体职务',
            name: 'position',
            // required: true,
            fieldProps: {
              maxLength: 20,
              style: {
                width: '50%'
              }
            }
          },
        ] : []),
      },
    ]
  }, []);

  return (
    <>
      {
        id ?
          <Button onClick={() => { setVis(true) }} type='link' disabled={disabled} style={{ paddingLeft: 0 }}>编辑</Button>
          :
          <Button onClick={() => { setVis(true) }} type='primary'>添加成员</Button>
      }
      <Drawer
        rootClassName="lib-mermber-manage-add-user"
        width={800}
        title={id ? '编辑' : '添加成员'}
        open={vis}
        onClose={() => { setVis(false); form.resetFields() }}
        footer={[
          <Button type="primary" onClick={handleSubmit} loading={loading}>提交</Button>
        ]}
      >
        <TechForm.Group form={form} groupItems={groupItems}></TechForm.Group>
      </Drawer>
    </>
  )

}


export default ChangeDep;
