import React from 'react';
import { Button } from 'antd';
import { history } from 'umi';

import { TihaiM, CtxMS } from '@/types/store';
import { useConcent, NoMap } from 'concent';

interface TabContainerProps {
  type: string;
}

// 私有state
const iState = () => ({
  detailInfo: {}
});

// 添加问题
const addQuestion = (type: string) => {
  history.push(`/tihai/question/${type}`);
}

type CtxPre = CtxMS<TabContainerProps, TihaiM, ReturnType<typeof iState>>;

const setup = (ctx: CtxPre) => {

  return {
    // columns,
    // getTableList: (pagination: PaginationProps) => getTableList(pagination)
  }
}

type Settings = ReturnType<typeof setup>;
type Ctx = CtxMS<TabContainerProps, TihaiM, ReturnType<typeof iState>, Settings>

export default () => {

  console.log('2222222222');

  const ctx = useConcent<{}, Ctx, NoMap>({
    module: 'tihai',
    // state: iState,
    // setup,
  });

  const {
    state: { dataList, activeTabKey },
  } = ctx;

  return (
    <>
      <Button onClick={() => addQuestion(activeTabKey)} type="primary">新增题目</Button>
    </>
  )
};
