interface ITab {
  key: string;
  tab: string;
}

async function dictTypeList() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: 8,
          name: '前端',
        },
        {
          id: 9,
          name: '后端',
        },
      ]);
    }, 500);
  });
}

export default async () => {
  const list = await dictTypeList({});
  const result: ITab[] = [];
  list.forEach(item => {
    result.push({
      key: item.id + '',
      tab: item.name,
    });
  });
  return {
    tabList: result,
    activeTabKey: result[0].key,
  };
};
