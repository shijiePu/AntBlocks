import { useRequest } from 'ahooks';
import React, { FC, useState } from 'react';
import RichEditor from './commom-rich-editor';

import { TechFile } from '@szhz/tech-pc';
import { queryDetail } from '@szhz/tech-pc/service/register';
import './index.less';

const Detail: FC<{ state: any }> = ({ state }) => {
  const { id, project, searchWord } = state || {};

  console.log('id', id,);

  const [pageId, setPageId] = useState(id);

  const { data = {} } = useRequest(
    async () => {
      const res = await queryDetail({
        id: pageId,
        title: searchWord,
        associatedSystem: project
      });
      return res || {};
    },
    {
      refreshDeps: [pageId, searchWord, project],
    },
  );

  console.log('data', data);

  return (
    <div className={'help-center-detail'}>
      <div className={'page'}>
        <div className={'title'}>{(data as any)?.title}</div>
        <div className={'desc'}>
          发布日期：{(data as any)?.publishTime}&nbsp;&nbsp;浏览次数：{(data as any)?.readCount}
        </div>
        <div className={'line'}></div>

        <div
          className={'content'}
          // dangerouslySetInnerHTML={{ __html: (data as any)?.content }}
          // dangerouslySetInnerHTML={{ __html: "<p style=\"text-align: center;\"><span style=\"color: rgb(51, 51, 153);\"><strong>今年将加力实施城中村和危旧房改造在新增100万套的基础上继续扩大规模</strong></span></p><p style=\"text-indent: 2em; text-align: start;\">城市更新关系城市面貌和居住品质的提升，是扩大内需的重要抓手。我国城市发展已进入城市更新重要时期，由大规模增量建设转为存量提质改造和增量结构调整并重。1月3日召开的国务院常务会议研究推进城市更新工作，提出要加快推进城镇老旧小区、街区、厂区和城中村等改造。要加强用地、资金等要素保障，盘活利用存量低效用地，统筹用好财政、金融资源，完善市场化融资模式，吸引社会资本参与城市更新。</p><p style=\"text-indent: 2em; text-align: start;\">因安全隐患多、居住环境差，居民改造意愿迫切，城中村改造成为城市更新的重要内容。住房城乡建设部、财政部2024年联合印发通知提出，地级城市资金能平衡、征收补偿方案成熟的项目，均可纳入政策支持范围。</p><p style=\"text-indent: 2em; text-align: start;\">2024年，城中村改造扩围至300多个城市，实施城中村改造项目1790个。2025年，为持续用力推动房地产市场止跌回稳，住房城乡建设部将加力实施城中村和危旧房改造，推进货币化安置，计划在新增100万套城中村改造和危旧房改造的基础上继续扩大改造规模。</p><p style=\"text-indent: 2em; text-align: start;\">上海交通大学住房与城乡建设研究中心主任陈杰认为，有力有序有效推进城中村改造，长远看可为城市增进民生福祉、实现经济发展、维护社会安全打下牢固基础；在当下，也可直接起到稳定居民预期、激发消费潜力、填补投资缺口的多重作用。数据显示，仅在35个大城市，需要改造的城中村就有170万套。本次城中村改造政策支持范围扩大后，有望带动更大需求。</p><p style=\"text-indent: 2em; text-align: start;\">国海证券首席经济学家夏磊说，以新增实施100万套城中村改造和危旧房改造估计，货币化安置将拉动2亿平方米商品房去化。合理调整城中村区域土地规划条件后，也能更好地适应市场需求，拉动原址建设约5000亿元的建安投资。</p><p style=\"text-indent: 2em; text-align: start;\">城中村改造是一项复杂艰巨的系统工程，需要大量资金投入。住房城乡建设部相关司局负责人介绍，符合条件的城中村改造项目均可获得政策支持，包括纳入地方政府专项债券支持范围，由开发性、政策性金融机构提供城中村改造专项借款，适用有关税费优惠政策，鼓励商业银行按照市场化、法治化原则提供城中村改造贷款等，确保项目顺利推进。</p><p style=\"text-indent: 2em; text-align: start;\">浙江工业大学中国住房和房地产研究院院长虞晓芬说，这次通知要求各地严格落实“一项目两方案”，即每个项目都要制定完备的征收补偿方案、资金平衡方案等，确保项目条件成熟再启动实施，避免新增地方政府债务风险，确保征收工作顺利推进、切实维护群众合法权益。</p><p style=\"text-indent: 2em; text-align: start;\">住房城乡建设部相关司局负责人表示，各地要结合当地房地产市场形势，统筹考虑商品房的存量和增量，稳妥推进城中村改造货币化安置。这能够更好地满足群众自主选择房型、区位等需求，缩短群众在外过渡时间，让居民尽早住上新房。（记者 丁怡婷）</p><p style=\"text-indent: 2em; text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p><p style=\"text-indent: 2em; text-align: center;\"><img src=\"/ossfile/szhz-process-manage/js-program-dev/2025-01-09/dqki189q51877177869986922496.png?Expires=2051749055&amp;OSSAccessKeyId=LTAI5t9pt5163LEzFHzsLRY6&amp;Signature=iFhRGDFO4%2FiIi189aGuBS2pcW5c%3D\" alt=\"image\" data-href=\"\" style=\"width: 797.00px;height: 789.89px;\"></p><p style=\"text-indent: 2em; text-align: start;\"><br></p><p style=\"text-indent: 2em; text-align: start;\"><br></p><p style=\"text-indent: 2em; text-align: start;\"><br></p><p style=\"text-indent: 2em; text-align: start;\"><br></p><p style=\"text-indent: 2em; text-align: start;\"><br></p><p style=\"text-indent: 2em; text-align: start;\"><br></p>" }}
        >
          <RichEditor readonly value={(data as any)?.content} height="auto"/>
        </div>

        {
          (data as any)?.attachmentList && (data as any)?.attachmentList.length > 0 && (
            <div className={'fileList'}>
              附件：
              <TechFile.List nameLimit={Number.MAX_SAFE_INTEGER} fileList={(data as any)?.attachmentList ?? []}></TechFile.List>
            </div>
          )
        }

        <div className={'line'} style={{ marginTop: '20px', marginBottom: '32px' }}></div>

        {(data as any)?.beforeTitle && (
          <div
            onClick={() => setPageId((data as any)?.beforeId)}
            className={'brfore'}
          >
            上一篇：{(data as any)?.beforeTitle}
          </div>
        )}

        {(data as any)?.afterTitle && (
          <div
            onClick={() => setPageId((data as any)?.afterId)}
            className={'brfore'}
          >
            下一篇：{(data as any)?.afterTitle}
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail
