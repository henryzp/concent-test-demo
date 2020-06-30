import React from 'react';
import { Card } from 'antd';
import TabContainer from './tabContainer';
import './model';

import { useConcent, NoMap } from 'concent';
import { CtxM, TihaiM } from '@/types/store';

type CtxPre = CtxM<{}, TihaiM>;

const setup = (ctx: CtxPre) => {
  return {
    changeTab: (key: string) => ctx.mr.changeTab(key),
  };
};

type Settings = ReturnType<typeof setup>;
type Ctx = CtxM<{}, TihaiM, Settings>;

export default () => {

  console.log('1111111111111');

  const ctx = useConcent<{}, Ctx, NoMap>({
    module: 'tihai',
    setup,
  });

  const {
    state: { activeTabKey, tabList },
    settings: { changeTab },
  } = ctx;

  return (
    <div>
      {activeTabKey !== '-1' && (
        <Card
          tabList={tabList}
          activeTabKey={activeTabKey}
          onTabChange={key => {
            changeTab(key);
          }}
        >
          <TabContainer />
        </Card>
      )}
    </div>
  );
};
