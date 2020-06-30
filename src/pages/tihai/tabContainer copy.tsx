import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { history } from 'umi';
import { PaginationProps } from 'antd/lib/pagination';
import { ColumnsType } from 'antd/lib/table';
import CommonTable from '@/components/common-table';
import { getTypeName } from '@/utils';
import moment from 'dayjs';
import { IQuestionItem } from '@/types';
import DetailModal from './detailModal';
import { TihaiM, CtxMS } from '@/types/store';
import { useConcent, NoMap } from 'concent';

interface TabContainerProps {
  type: string;
}

// 私有state
const iState = () => ({
  detailInfo: {} as IQuestionItem
});

// 添加问题
const addQuestion = (type: string) => {
  history.push(`/tihai/question/${type}`);
}

type CtxPre = CtxMS<TabContainerProps, TihaiM, ReturnType<typeof iState>>;

const setup = (ctx: CtxPre) => {

  const { getTableList } = ctx.mr;

  const { pagination: { current, pageSize }, activeTabKey } = ctx.state;

  ctx.effect(() => {
    getTableList({
      pageSize,
      current,
      key: activeTabKey,
    });
  }, []);

  const columns: ColumnsType<IQuestionItem> = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 60,
      fixed: 'left',
      render: (text: string, record, index: number) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 280,
      fixed: 'left',
      render(text, record) {
        return (
          <a
            onClick={() => {
              ctx.setState({
                modalVisible: true,
                detailInfo: record
              })
            }}
          >
            {text}
          </a>
        )
      }
    },
    {
      title: '题目类别',
      dataIndex: 'dict_name',
      align: 'center',
    },
    {
      title: '题目类型',
      dataIndex: 'type',
      render(text, record, index) {
        return getTypeName(text);
      }
    },
    {
      title: '题目等级',
      dataIndex: 'level',
      render(text) {
        let contentMapper = {
          1: '初级',
          2: '中级',
          3: '高级',
        }
        const key: keyof typeof contentMapper = text;
        return contentMapper[key];
      }
    },
    {
      title: '是否已审核',
      dataIndex: 'is_approve',
      render(text, record) {
        if (text) {
          return (
            <>已审核，审核人：{record.approver}</>
          )
        }
        return <>未审核</>
      }
    },
    {
      title: '添加人',
      dataIndex: 'nickname',
      width: 120,
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      align: 'center',
      width: 180,
      render(text) {
        return moment(text).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '操作',
      dataIndex: 'operator',
      align: 'center',
      fixed: 'right',
      width: 120,
      render(text, record) {
        return (
          <>
            {!record.is_approve && <Button className="fs12" size="small" type="primary">审核</Button>}
          </>
        )
      }
    }
  ]

  return {
    // columns,
    // getTableList: (pagination: PaginationProps) => getTableList(pagination)
  }
}

type Settings = ReturnType<typeof setup>;
type Ctx = CtxMS<TabContainerProps, TihaiM, ReturnType<typeof iState>, Settings>

export default () => {

  const ctx = useConcent<{}, Ctx, NoMap>({
    module: 'tihai',
    // state: iState,
    // setup,
  });

  const {
    state: { dataList, activeTabKey },
  } = ctx;

  console.log('dataList: ', activeTabKey, dataList);

  return (
    <>
      <Button onClick={() => addQuestion(activeTabKey)} type="primary">新增题目</Button>
    </>
  )
};
