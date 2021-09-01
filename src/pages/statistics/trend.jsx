import { useDidCache, useDidRecover } from "react-router-cache-route";

import { Form, Card } from "antd";
import MainFormItems from "components/MainFormItems";

const Trend = props => {
    const [form] = Form.useForm();
    const sexList = [
        { label: "男", value: 1 },
        { label: "女", value: 2 }
    ]
    const likeList = [
        { label: "足球", value: 1 },
        { label: "篮球", value: 2 },
        { label: "乒乓球", value: 3 }
    ]

    const baseItems = [
        {
            label: "姓名",
            name: "shopName",
            type: "input",
            required: true
        },
        {
            label: "性别",
            name: "sex",
            type: "radio",
            required: true,
            data: sexList
        },
        {
            label: "爱好",
            name: "like",
            type: "select",
            required: true,
            data: likeList
        },
        {
            label: "头像",
            name: "head",
            type: "upload",
            required: true
        },
    ]

    useDidCache(() => {
        // 离开页面
        console.log('被缓存')
    })

    useDidRecover(() => {
        // 进入已缓存的页面
        console.log('被恢复')
    })

    return <Form layout="vertical" form={form} scrollToFirstError={true} onFinish={values => {
        
    }}>
        <Card title="基本信息">
            <MainFormItems layout="vertical" items={baseItems} />
        </Card>
    </Form>
}

export default Trend;