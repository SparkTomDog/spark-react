import { useBaseStore } from "@c/stores";
import { Modal, Popconfirm, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import "./index.scss"
import { useEffect, useState } from "react";
import { BaseDataType } from "@t/index";
import { getDeleteDocumentApi, removeDocumentApi, updateDocumentApi } from "@c/api/dataApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faXmark } from "@fortawesome/free-solid-svg-icons";

const TrashBox = observer(() => {
    const { webStore, dataStore } = useBaseStore()

    const [ data, setData ] = useState<BaseDataType[]>([])

    const reloadDocument = async(item: BaseDataType) => {
        await updateDocumentApi({
            ...item,
            deleteAt: null
        })
        await dataStore.getTreeData()
        const res = await getDeleteDocumentApi()
        setData(res.data.data)
    }

    const removeDocument = async (item: BaseDataType) => {
        await removeDocumentApi(item.id as string)
        const res = await getDeleteDocumentApi()
        setData(res.data.data)
    }

    useEffect(() => {
        getDeleteDocumentApi().then(res => {
            setData(res.data.data)
        })

        return (() => {
            setData([])
        })
    }, [])

    return (
        <Modal
            title="回收站"
            width={800}
            open={webStore.trashShow}
            footer={false}
            onCancel={() => webStore.toggleTrashShow(false)}
        >
            <ul id="TrashBox">
                {data.map(item => {
                    return <li key={item.id}>
                        <span className="li_label">{ item.label }</span>
                        <Tooltip title="还原" color="green" placement="left">
                            <span className="li_reload action_btn" onClick={() => reloadDocument(item)}>
                                <FontAwesomeIcon icon={faRotate} />
                            </span>
                        </Tooltip>
                        <Popconfirm
                            title="删除文档"
                            description={`是否删除文档${item.label}?, 此删除无法回溯!`}
                            onConfirm={() => removeDocument(item)}
                            okText="彻底删除"
                            okType="danger"
                            showCancel={false}
                        >
                            <Tooltip title="彻底删除" color="red" placement="right">
                                <span className="li_remove action_btn">
                                    <FontAwesomeIcon icon={faXmark} />
                                </span>
                            </Tooltip>
                        </Popconfirm>
                    </li>
                })}
            </ul>
        </Modal>
    )
})

export default TrashBox