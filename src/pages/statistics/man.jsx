import MainTable from "components/MainTable";

const Man = props => {
    const sexList = [
        { label: "男", value: 1 },
        { label: "女", value: 2 }
    ]

    const getListData = payload => {
        return Promise.resolve({
            data: [
                { name: "yy", sex: 1, id: 1 },
                { name: "qq", sex: 2, id: 2 }
            ],
            total: 2
        })
    }
    const filterConfig = [
        {
            label: "姓名",
            name: "name",
            type: "input"
        },
        {
            label: "性别",
            name: "sex",
            type: "select",
            data: sexList
        }
    ]
    const columns = [
        {
            title: "姓名",
            dataIndex: "name"
        },
        {
            title: "性别",
            dataIndex: "sex",
            render: (_) => sexList.find(sex => sex.value === _)?.label ?? ''
        }
    ]
    return <MainTable
        filterConfig={filterConfig}
        onRequest={payload => getListData(payload)}
        tableConfig={{
            columns,
            rowKey: "id"
        }}
    />
}

export default Man;