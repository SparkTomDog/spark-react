import { observer } from "mobx-react-lite"
import { Modal, Tabs, TabsProps } from 'antd';
import { useBaseStore } from "@c/stores";
import WebSetting from "./web";
import EditorSetting from "./editor";

const SettingBox = observer(() => {

    const { webStore } = useBaseStore()

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '常规',
            children: <WebSetting />,
        },
        {
            key: '2',
            label: '编辑器',
            children: <EditorSetting />,
        }
    ];

    return (
        <Modal
            title="设置"
            width={800}
            open={webStore.settingShow}
            footer={false}
            onCancel={() => webStore.toggleSettingShow(false)}
        >
            <Tabs defaultActiveKey="1" tabPosition="left" items={items} />
        </Modal>
    )
})

export default SettingBox