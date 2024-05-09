import { updateDataApi } from '@c/api/dataApi';
import Aside from '@c/pages/Contriner/Aside/index'
import { TabDataType } from "@t/index"
import { Tabs } from "antd"
import { useState } from "react"
import NoEditData from '../NoEditData';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

function Contriner() {

    const [tabs, setTabs] = useState<TabDataType[]>([])
    const [activeKey, setActiveKey] = useState("");

    const pushTabs = (data: TabDataType) => {
        const res = tabs.filter(item => {
            return item.id == data.id
        })
        if(res.length < 1) {
            setTabs([...tabs, data])
            setActiveKey(data.key)
        } else {
            setActiveKey(data.key)
        }
    }

    const removeTabs = (targetKey: TargetKey) => {
        const newTabs = tabs.filter(item => {
            return item.id !== targetKey
        })
        setTabs(newTabs)
    }

    const onEdit = async (targetKey: TargetKey, action: 'add' | 'remove') => {
        if (action === 'remove') {
            const data = JSON.parse(localStorage.getItem(targetKey as string) as string)
            if(data) {
                const update = {
                    ...data,
                    content: JSON.stringify(data.content)
                }
                const res = await updateDataApi(update)
                if(res.data.code == 200) {
                    localStorage.removeItem(targetKey as string)
                }
            }
            removeTabs(targetKey);
        }
    };

    const createNewTab = (data: TabDataType) => {
        pushTabs(data)
    }

    return (
        <div id="Contriner">
            <div id="ContrinerHeader">
                Header
            </div>
            <div id="ContrinerMain">
                <div id="ContrinerMainAside" style={{ width: "300px" }}>
                    <Aside getTabdata={createNewTab} />
                </div>
                <div id="ContrinerMainEditBox">
                    {tabs.length < 1
                        ?
                        <NoEditData />
                        :
                        <Tabs
                            type="editable-card"
                            hideAdd
                            activeKey={activeKey}
                            items={tabs}
                            onEdit={onEdit}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Contriner