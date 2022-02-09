---
title: '实现使用远程数据源的 Ant Design Table 自定义筛选'
date: '2022-01-02 23:37:50'
tags:
- React.js
- Ant Design
---
Ant Design Table组件支持自定义筛选菜单，官网给出的 [Demo](https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel) 只能对当前页的数据进行过滤，而实际开发中往往都是远程数据源，因此需要改造下。

1. 首先是 Table ，为方便阅读多余代码已清除：

    ```jsx
    <Table pagination={
        Object.assign(pagination, {
           onChange: async (pageIndex: number, pageSize?: number) => {
               fetchData({pageIndex, pageSize});
           }
       })
    }
    columns={columns} dataSource={data}/>
    ```

1. 其中一列(`Column`)定义：

    ```jsx
    {
        title: '姓名',
        dataIndex: 'name',
        filterDropDown: function({setSelectedKeys, selectedKeys, confirm, clearFilters}: any) {
            return <div>
                <Input onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}/>
                <Button onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}>
                    搜索
                </Button>
            </div>;
        }
    }
    ```

3. 查询数据函数`fetchData`定义：

    ```typescript
    async function fetchData(pager?: Pager) {
        let gridData = await getGridData({
            url: props.url,
            pager: pager,
            searchForm: searchForm
        });
        setData(gridData.data);
        setPagination(gridData.pagination);
    }
    ```

    可以看到查询数据时会向服务端发送一个`searchForm`对象，`searchForm`对象保存的是当前全部过滤条件：

    ```typescript
    const [searchForm, setSearchForm] = useState<{ [key: string]: string }>({});
    ```

1. 搜索按钮点击后，`selectedKeys`、`confirm`、`dataIndex`被传到事件处理函数`handleSearch`，`handleSearch`定义：

    ```typescript
    function handleSearch(selectedKeys: any[], confirm: Function, dataIndex: string) {
        setSearchForm(prev => {
            let current = Object.assign({}, prev);
            current[dataIndex] = selectedKeys[0];
            return current;
        });
        setFilterCallback(() => confirm);
    }
    ```

    以上函数的逻辑是：
    
    1. 将过滤条件保存到`searchForm`中。
    
    1. 将`confirm`函数保存到`filterCallback`中，`filterCallback`定义如下：
    
        ```typescript
        const [filterCallback, setFilterCallback] = useState<Function | null>(null);
        ```
    
    1. 触发`filterCallback`的监听并调用（即`confirm`函数）：
    
        ```typescript
        // useUpdateEffect 用法请参考 react-use
        useUpdateEffect(() => {
            if (filterCallback) {
                filterCallback();
            }
        }, [filterCallback])
        ```
        
        使用 `State` 保存`confirm`函数的原因是同一个`useEffect`中的 state 值是固定的，如果在`setSearchForm`后直接调用`confirm`，会导致`onChange`函数中`fetchData`函数拿到的是修改前的`searchForm`。
        
    1. `confirm`函数执行后，触发`onChange`函数，进而调用`fetchData`向服务端发起请求并更新列表的数据。


