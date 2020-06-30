import { TihaiState } from '@/types/store';
import { IActionCtxBase as IAC } from 'concent';
import { PaginationProps } from 'antd/lib/pagination';

const poolList = () => {
  return new Promise<{ total: number; list: any[] }>(resolve => {
    setTimeout(() => {
      resolve({
        list: [
          {
            id: 1,
            name: 'aaa',
          },
          {
            id: 2,
            name: 'bbb',
          },
        ],
        total: 7,
      });
    }, 500);
  });
};

export function changeActiveTabKey(key: string) {
  return {
    activeTabKey: key,
  };
}

export function setModalVisible(visible: boolean) {
  return {
    modalVisible: visible,
  };
}

export function resetPagination() {
  return {
    pagination: {
      current: 1,
      pageSize: 10,
    },
  };
}

// 重置table状态，分页重置，数据重置
async function resetTableState() {
  return {
    pagination: {
      current: 1,
      pageSize: 10,
    },
    dataList: [],
  };
}

export async function getTableList(
  payload: PaginationProps & { key: string },
  moduleState: TihaiState,
) {
  const { current: pageNo, pageSize, key } = payload;
  const data = await poolList();
  return {
    pagination: {
      pageSize,
      current: pageNo,
      total: data.total,
    },
    dataList: data.list,
  };
}

export async function changeTabComplex(
  key: string,
  moduleState: TihaiState,
  actionCtx: IAC,
) {
  await actionCtx.dispatch(changeActiveTabKey, key);
  await actionCtx.dispatch(getTableList, { key, current: 1, pageSize: 10 });
  await actionCtx.dispatch(getTableList, { key, current: 2, pageSize: 10 });
}

export async function changeTab(
  key: string,
  moduleState: TihaiState,
  actionCtx: IAC,
) {
  await actionCtx.lazyDispatch(changeTabComplex, key);
}
