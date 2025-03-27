import React from 'react';

import icon from './icon.png';
import './index.less';

export default ({
  status,
  type
}: any) => {
  return (
    <div className={'register-match-desc'}>
      {
        type === 'person' ?
          status === 'old'
            ? <div>
              <div className={'register-match-desc-title'}><img src={icon} />关联历史账号说明</div>
              <div className={'register-match-desc-container'}>
                <div className={'register-match-desc-item'}>
                  <div className={'register-match-desc-num'}>1</div>
                  <div className={'register-match-desc-text'}>本系统的用户信息源自江苏政务服务网统一身份认证平台。如需更新或修改证件类型、证件号码、真实姓名、手机号，请前往江苏政务服务网统一身份认证平台进行操作。</div>
                </div>
                <div className={'register-match-desc-item'}>
                  <div className={'register-match-desc-num'}>2</div>
                  <div className={'register-match-desc-text'}>如果您在旧系统中拥有多个账户，请将每个账户逐一添加，个人账号仅限添加个人历史账号。</div>
                </div>
                <div className={'register-match-desc-item'}>
                  <div className={'register-match-desc-num'}>3</div>
                  <div className={'register-match-desc-text'}>为确保历史系统数据的准确性，请务必如实绑定旧账号。</div>
                </div>
              </div>
            </div>
            : status === 'new'
              ? <div>
                <div className={'register-match-desc-title'}><img src={icon} />新用户说明</div>
                <div className={'register-match-desc-container'}>
                  <div className={'register-match-desc-item'}>
                    <div className={'register-match-desc-num'}>1</div>
                    <div className={'register-match-desc-text'}>本系统的用户信息源自江苏政务服务网统一身份认证平台。如需更新或修改证件类型、证件号码、真实姓名、手机号，请前往江苏政务服务网统一身份认证平台进行操作。</div>
                  </div>
                  <div className={'register-match-desc-item'}>
                    <div className={'register-match-desc-num'}>2</div>
                    <div className={'register-match-desc-text'}>若存在双聘情况，请分别添加各所属单位。</div>
                  </div>
                </div>
              </div>
              : null
          : type === 'legal' ?
            status === 'old'
              ? <div>
                <div className={'register-match-desc-title'}><img src={icon} />关联历史账号说明</div>
                <div className={'register-match-desc-container'}>
                  <div className={'register-match-desc-item'}>
                    <div className={'register-match-desc-num'}>1</div>
                    <div className={'register-match-desc-text'}>本系统的单位信息和法人代表信息源自江苏政务服务网统一身份认证平台。如需更新或修改单位基本信息中的单位名称、单位类型、统一社会信用代码，法人代表信息中的姓名、性别、身份证件号联系方式字段，请前往江苏政务服务网统一身份认证平台进行操作。</div>
                  </div>
                  <div className={'register-match-desc-item'}>
                    <div className={'register-match-desc-num'}>2</div>
                    <div className={'register-match-desc-text'}>如果您在旧系统中当前企业下拥有多个单位管理员账号，请逐一添加每个账号。</div>
                  </div>
                  <div className={'register-match-desc-item'}>
                    <div className={'register-match-desc-num'}>3</div>
                    <div className={'register-match-desc-text'}>法人账户仅限添加单位管理员账户。</div>
                  </div>
                  <div className={'register-match-desc-item'}>
                    <div className={'register-match-desc-num'}>4</div>
                    <div className={'register-match-desc-text'}>为确保历史系统数据的准确性，请务必如实绑定旧账号。</div>
                  </div>
                </div>
              </div>
              : status === 'new'
                ? <div>
                  <div className={'register-match-desc-title'}><img src={icon} />新用户说明</div>
                  <div className={'register-match-desc-container'} style={{ paddingLeft: 12 }}>
                    <div className={'register-match-desc-item'}>
                      <div className={'register-match-desc-text'}>本系统的单位信息和法人代表信息源自江苏政务服务网统一身份认证平台。如需更新或修改单位基本信息中的单位名称、单位类型、统一社会信用代码，法人代表信息中的姓名、性别、身份证件号联系方式字段，请前往江苏政务服务网统一身份认证平台进行操作。</div>
                    </div>
                  </div>
                </div>
                : null
            : null
      }
    </div>
  )
};
