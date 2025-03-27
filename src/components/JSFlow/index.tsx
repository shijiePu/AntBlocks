// @ts-ignore
import { Flow } from '@szhz/component';
import { useRequest } from 'ahooks';
import { Spin } from 'antd';
import { find, get, keys } from 'lodash-es';
// @ts-ignore
import Pubsub from 'pubsub-js';
import React, {
  CSSProperties,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import CommomAppvoral from './approvalModal';
import {
  getCheckFlag,
  getTaskAttachment,
  processOrderApprovalByget
} from './approvalModal/service';

import { createCode, TechFile } from '@szhz/tech-pc';
import './index.less';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default function JSFlow(props: {
  hideApproval?: false | undefined;
  processInstanceId: any;
  handleEditCallback?: (() => void) | undefined;
  refushOtherDetailInfo?: (() => void) | undefined;
  reviewStatus?: string;
  isExport?: any;
  customerApprovalFormConfig?: any;
  customerWidth?: any;
  checkPassPromise?: any;
  bottomStyle?: CSSProperties;
  needFile?: boolean;
  hideAction?: boolean;
  passCustomerApprovalFormConfig?: any;
  btnLoading?: any;
  formSourcePage?: string
  isAuth?: boolean;  //是否是主管部门审批 - 审批特殊处理
  projectId?: string;
}) {
  const fatherEl: MutableRefObject<any> = useRef(null);
  const {
    handleEditCallback,
    btnLoading,
    hideApproval = false,
    processInstanceId,
    refushOtherDetailInfo,
    customerApprovalFormConfig,
    customerWidth,
    checkPassPromise,
    bottomStyle,
    needFile,
    hideAction,
    passCustomerApprovalFormConfig,
    formSourcePage, // 专业机构受理额外判断处理 JSXMPM-3224
    isAuth, //主管部门审批 - 审批特殊处理
    projectId
  } = props;

  const [taskId, setTaskId] = useState('');
  const [checkFlag, setCheckFlag] = useState(true) as any;
  const [showFlow, setShowFlow] = useState(true);
  // 当前的属性节点
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentNode, setCurrentNode] = useState<any>({});
  const [autoWidth, setAutoWidth] = useState<string>('calc(100vw - 260px)');
  const [fileData, setFileData] = useState<any>({});
  const [d, setD] = useState([]); // 流程数据

  const [delayVisible, setDelayVisible] = useState(false);

  // 获取审批附件
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, run: getData } = useRequest(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (param: any) => {
      if (!processInstanceId) return {};
      const data = await getTaskAttachment({
        processInstanceId: processInstanceId,
      });
      setFileData(data);
    },
    { refreshDeps: [processInstanceId], manual: true },
  );

  //刷新当前页面
  const refusePage = async () => {
    //刷新当前页面除了流程以外的信息
    if (!!processInstanceId) {
      setShowFlow(false); //强制更新组件的状态
      await waitTime(2500);
      let flagibj = await getCheckFlag({ processInstanceId });
      setShowFlow(true);
      setCheckFlag(flagibj?.checkFlag);
      // 获取最新页面附件信息
      // getData({});
      refushOtherDetailInfo?.();
    }
  };

  // 调流程接口，判断当前节点，如果是第一个几点，不展示【退回】按钮
  useEffect(() => {
    processOrderApprovalByget({ processInstanceId }).then((res: any) => { setD(res) });
  }, [])

  useEffect(() => {
    refusePage();
    //监听容器变化
    Pubsub.subscribe('aside-menu-status-change', (_: any, res: any) => {
      const width = !!res ? `calc(100vw - 140px)` : `calc(100vw - 260px)`;
      setAutoWidth(width);
    });
  }, []);

  /* 其获当前的taskId
   * @param currentNode
   * @returns
   */
  const handleTaskId = (
    currentNode: any | null,
    currentUserId: string | null,
  ) => {
    if (!currentNode || !currentUserId) {
      setTaskId('');
      return;
    }

    const currentUserTask = find(currentNode?.tasks ?? [], {
      assigneeId: currentUserId,
    });

    const taskId = get(currentUserTask, 'taskId', null);

    setTaskId(taskId ?? '');
  };

  /**
   * 获取当前审批节点
   * @param activities
   * @returns
   */
  const dispatchActiveNode = (activities: any[]): any | null => {
    let currentNode: null | Record<string, string> = null;

    activities?.forEach((item) => {
      const activityState = get(item, 'activityState', '');

      if (activityState === 'WAITING') {
        currentNode = item;
      }
    });

    if (!keys(currentNode)?.length) {
      return null;
    }

    return currentNode;
  };

  //获取当前节点信息
  const handleFlowInfo = ({ activities = [], currentUserId }: any) => {
    const currentNode = dispatchActiveNode(activities);
    // 设置当前节点的相关信息岛全局
    setCurrentNode(currentNode);

    handleTaskId(currentNode, currentUserId);
  };

  const renderNode = useMemo(() => {
    if (!showFlow || !delayVisible) return <div style={{ height: '100%', width: '100%', textAlign: 'center' }}><Spin /></div>
    return (<Flow
      noShowCounterText
      statusMapConfig={{
        WAITING: { text: '审核中', color: '#2D7AF7' },
        COMPLETED: { text: '已完成', color: 'rgba(45,122,247,1)' },
        AUTO_COMPLETED: { text: '自动完成', color: 'rgba(45,122,247,1)' },
        NOT_START: { text: '等待审批', color: 'rgba(8,16,30,0.35)' },
        UNACCEPT: { text: '未受理', color: 'rgba(8,16,30,0.35)' },
        ROLL_BACK: { text: '回退', color: 'rgba(8, 16, 30, 0.35)' },
        AGREE: { text: '已通过', color: '#00C85F' },
        DISAGREE: { text: '已拒绝', color: '#FF5269' },
        SKIP: { text: '跳过', color: 'rgba(45,122,247,1)' },
        COMPLETED_RECALL: { text: '发起人撤回', color: 'rgba(8, 16, 30, 0.35)' },
        // 逾期文案状态
        DELAYED_PROGRESS: { text: '进度滞后', color: '#FF5269' },
        OVERDUE_WARNING: { text: '逾期预警', color: 'rgba(255,161,10,1)' },
        RECALL: { text: '已撤回', color: 'rgba(8, 16, 30, 0.35)' },
        INVALID: { text: '已作废', color: 'rgba(8, 16, 30, 0.35)' },
      }}
      // processInstanceId={processInstanceId}
      processInstanceId={`/api-flow/process/instance/detail-with-future-rollback-nodes?processInstanceId=${processInstanceId}`}
      // processInstanceId={`/szjs-api/gateway/program/process-order/get-process-detail?processInstanceId=${processInstanceId}`}
      buttonMode="process"
      buttonModify={() => {
        return {};
      }}
      onFetchedFlowInfo={handleFlowInfo as any}
      onTaskRender={(activity: any, task: any) => {
        if (!fileData?.[task?.taskId]) return null;
        return (
          <>
            {(fileData?.[task?.taskId] || []).map((item: any) => (
              <TechFile.List
                key={createCode(6)}
                fileList={[
                  { fileName: item?.fileName, fileUrl: item?.fileUrl },
                ]}
              />
            ))}
          </>
        );
      }}
      meta={{
        activity: {
          name: true,
          swordBearer: false,
          button: true,
          status: true,
          forewarning: true,
          toggle: true,
        },
        task: {
          name: false,
          status: false,
          time: true,
          info: true,
        },
        // 是否展示操作按钮
        processBtn: true,
        // 是否展示开始结束节点
        isShowStartAndEndNode: false,
      }}
    />)
  }, [processInstanceId, showFlow, fileData, delayVisible])

  useEffect(() => {
    // 使用 setTimeout 在 2 秒后
    const timer = setTimeout(() => {
      setDelayVisible(true);
    }, 3000);

    // 清除定时器，防止内存泄漏
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className={'lib-com-flow'} ref={fatherEl}>
        {!hideApproval && (
          <div
            style={{
              background: '#fff',
              padding: 24,
              minHeight: 100,
            }}
          >
            {renderNode}
          </div>
        )}

        {
          !!checkFlag && !hideApproval && !hideAction && (<>
            <div style={{ height: '16px' }}></div>
            <div style={{ height: '84px' }}></div>
          </>)
        }

        {!!checkFlag && !hideApproval && !hideAction && delayVisible ? (
          <div
            className={'bottom'}
            style={{
              // width: customerWidth || autoWidth,
              ...(bottomStyle ?? {}),
            }}
          >
            <>
              <CommomAppvoral
                disabled={!checkFlag}
                processInstanceId={processInstanceId}
                isAuth={isAuth}
                projectId={projectId}
                approve={false}
                buttonProps={{
                  type: 'default',
                }}
                text="不通过"
                taskIds={[taskId]}
                needOpinion
                needFile={needFile}
                callback={(res) => {
                  if (!!res) {
                    refusePage();
                    handleEditCallback && handleEditCallback();
                  }
                }}
                callbackCheck={(flag) => {
                  setCheckFlag(flag);
                }}
                customerApprovalFormConfig={customerApprovalFormConfig}
              />
              {/* {
                // @ts-ignore
                d?.activities?.[1]?.activityState !== 'WAITING' &&
                <>
                  <div style={{ marginRight: '18px' }}></div>
                  <CommonRollback
                    taskId={taskId}
                    callback={(res: any) => {
                      if (!!res) {
                        refusePage();
                      }
                    }}
                  />
                </>
              } */}
              <div style={{ marginRight: '18px' }}></div>
              <CommomAppvoral
                buttonProps={{
                  loading: btnLoading
                }}
                checkPassPromise={checkPassPromise}
                disabled={!checkFlag}
                processInstanceId={processInstanceId}
                isAuth={isAuth}
                projectId={projectId}
                text="通过"
                approve
                taskIds={[taskId]}
                needOpinion
                needFile={needFile}
                callback={(res) => {
                  if (!!res) {
                    refusePage();
                    handleEditCallback && handleEditCallback();
                  }
                }}
                callbackCheck={(flag) => {
                  setCheckFlag(flag);
                }}
                customerApprovalFormConfig={passCustomerApprovalFormConfig || customerApprovalFormConfig}
              />
            </>
          </div>
        ) : null}
      </div>
    </>
  );
}
