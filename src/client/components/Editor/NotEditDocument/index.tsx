import { useBaseStore } from "@c/stores";
import { faFileMedical, faGear, faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react-lite";

const NotEditDocument = observer(() => {

    const { dataStore, webStore } = useBaseStore()
    
    return (
        <div id="NotEditDocument">
            <ul>
                <li onClick={async () => {
                    await dataStore.createData({
                        label: "未命名",
                        content: JSON.stringify([
                            {
                                type: "paragraph",
                                content: "未命名文档",
                            }
                        ]),
                    })
                }}>
                    <span className="label">
                        <span className="action_btn icon">
                            <FontAwesomeIcon icon={faFileMedical} />
                        </span>添加文档
                    </span>
                </li>
                <li onClick={() => {
                    webStore.toggleSearchShow()
                }}>
                    <span className="label">
                        <span className="action_btn icon">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </span>搜索文档
                    </span>
                </li>
                <li onClick={() => {
                    webStore.toggleSettingShow()
                }}>
                    <span className="label">
                        <span className="action_btn icon">
                            <FontAwesomeIcon icon={faGear} />
                        </span>打开设置
                    </span>
                </li>
                <li onClick={() => {
                    webStore.toggleTrashShow()
                }}>
                    <span className="label">
                        <span className="action_btn icon">
                            <FontAwesomeIcon icon={faTrash} />
                        </span>回收站
                    </span>
                </li>
            </ul>
        </div>
    )
})

export default NotEditDocument