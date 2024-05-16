import { useBaseStore } from "@c/stores";
import { faFile, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BaseDataType } from "@t/index";
import { Popconfirm } from "antd";
import { observer } from "mobx-react-lite";

const DocumentList = observer(() => {

    const { dataStore } = useBaseStore()

    const listClick = (item: BaseDataType) => {
        dataStore.pushTabs(item)
    }
    
    const deleteDocument = async (item: BaseDataType) => {
        await dataStore.deleteDcoument(item)
    }

    return (
        <div id="DocumentList">
            {dataStore.treeData.map(item => {
                return (
                    <span className="document_list_item" key={item.id}>
                        <span className="document_list_item_icon action_btn">
                            <FontAwesomeIcon icon={faFile} />
                        </span>
                        <span className="document_list_item_label" onClick={() => listClick(item)}>
                            {item.label}
                        </span>
                        <Popconfirm
                            title="删除文档"
                            description={`是否删除文档${item.label}?`}
                            onConfirm={() => deleteDocument(item)}
                            okText="删除"
                            okType="danger"
                            showCancel={false}
                        >
                            <span className="document_list_item_remove action_btn">
                                <FontAwesomeIcon icon={faXmark} />
                            </span>
                        </Popconfirm>
                    </span>
                )
            })}
        </div>
    )
})

export default DocumentList