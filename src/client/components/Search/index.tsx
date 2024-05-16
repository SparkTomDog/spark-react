import { useBaseStore } from "@c/stores";
import { BaseDataType } from "@t/index";
import { Input, Modal } from "antd";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import "./index.scss"
import { searchDocumentApi } from "@c/api/dataApi";

const SearchBox = observer(() => {
    const { webStore, dataStore } = useBaseStore()
    const [ searchText, setSearchText ] = useState<string>("")
    const [ searchValue, setSearchValue ] = useState<BaseDataType[]>([])

    const search = async () => {
        const res = await searchDocumentApi(searchText)
        setSearchValue(res.data.data)
    }

    const editData = (data: BaseDataType) => {
        webStore.toggleSearchShow(false)
        dataStore.pushTabs(data)
        // console.log(data)
    }

    return (
        <Modal
            title="搜索"
            width={800}
            open={webStore.searchShow}
            footer={false}
            onCancel={() => webStore.toggleSearchShow(false)}
        >
            <Input placeholder="在此搜索..." value={searchText} onChange={(e) => setSearchText(e.target.value)} onPressEnter={() => search()} />
            <ul className="search_value">
                {searchValue.map(item => {
                    return <li key={item.id} onClick={() => editData(item)}>测试文档</li>
                })}
            </ul>
        </Modal>
    )
})

export default SearchBox