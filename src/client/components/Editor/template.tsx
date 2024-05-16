import { useBaseStore } from "@c/stores";
import { observer } from "mobx-react-lite";
import "./index.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBarsStaggered, faGear, faGears, faMagnifyingGlass, faMagnifyingGlassArrowRight, faPenToSquare, faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { BaseDataType } from "@t/index";
import Editor from ".";
import NotEditDocument from "./NotEditDocument";
import { Tooltip } from "antd";

const EditorTemplate = observer(() => {

    window.onkeydown = (e) => {
        if(e.altKey && e.key == "b") {
            webStore.toggleAsideShow(!webStore.asideShow)
        }
    }

    const { dataStore, webStore } = useBaseStore()

    const changeEditData = (data: BaseDataType) => {
        dataStore.changeTab(data)
    }

    return (
        <div id="ContrinerMain">
            <ul id="ContrinerMainHeader">
                <Tooltip title="Alt + B" color="#ccc">
                    <li className="action_btn" onClick={() => webStore.toggleAsideShow()}>
                        <FontAwesomeIcon icon={webStore.asideShow ? faBarsStaggered : faBars} />
                    </li>
                </Tooltip>
                <li className="action_btn" onClick={() => webStore.toggleSettingShow()}>
                    <FontAwesomeIcon icon={webStore.settingShow ? faGears : faGear} />
                </li>
                <li className="action_btn" onClick={() => webStore.toggleSearchShow()}>
                    <FontAwesomeIcon icon={webStore.searchShow ? faMagnifyingGlassArrowRight : faMagnifyingGlass} />
                </li>
                <li className="action_btn" onClick={() => webStore.toggleTrashShow()}>
                    <FontAwesomeIcon icon={faTrash} />
                </li>
                <li className="action_btn" onClick={async () => {
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
                    <FontAwesomeIcon icon={faPlus} />
                </li>
                {dataStore.tabs.map(item => {
                    return <li className={ item.id === dataStore.currentData?.id ? "tab tab_focus" : "tab" } key={item.id}>
                        <span className="tab_label" onClick={() => changeEditData(item)}>
                            { item.label!.length > 8 ? item.label?.substring(0, 8) + "..." : item.label }
                        </span>
                        <span className="tab_action action_btn" onClick={() => dataStore.removeTabs(item)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </span>
                    </li>
                })}
            </ul>
            <span>
                {dataStore.tabs.length === 0 ? <NotEditDocument /> : <Editor />}
            </span>
        </div>
    )
})

export default EditorTemplate