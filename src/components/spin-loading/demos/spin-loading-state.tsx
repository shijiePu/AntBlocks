/**
 * title: 手动控制loading
 * description: spinning 控制loading状态
 */

import { TechSpinLoading } from '@szhz/tech-pc';
import { Alert, Switch } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const toggle = (checked: boolean) => {
    setLoading(checked);
  };

  return (
    <div>
      <TechSpinLoading spinning={loading} tip="加载中">
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
      </TechSpinLoading>
      <div style={{ marginTop: 16 }}>
        Loading state：
        <Switch checked={loading} onChange={toggle} />
      </div>
    </div>
  );
};

export default App;
