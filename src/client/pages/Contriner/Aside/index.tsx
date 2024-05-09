import { FileOutlined, FolderOutlined, FrownFilled, FrownOutlined } from "@ant-design/icons";
import { getDatasInfoApi, getTreeDatasApi } from "@c/api/dataApi";
import Editor from "@c/components/Editor";
import { TabDataType } from "@t/index";
import { Tree, TreeDataNode } from "antd";
import { useEffect, useState } from "react";

const getTreeData = async () => {
    const res = await getTreeDatasApi()
    return res.data.data
}

const { DirectoryTree } = Tree;

const fieldNames = {
    key: "id",
    title: "label",
    children: "documents"
}

const contextMenu = ({event, node}: { event: any, node: any }) => {
    console.log(event)
    console.log(node)
}

function Aside({ getTabdata }: { getTabdata: any }) {

    const [treeData, setTreeData] = useState<TreeDataNode[]>([])

    const changeIcon = ((props: any) => {
        if(props.data.type == "folder") {
            return <FolderOutlined />
        }
        return <FileOutlined />
    })

    const selectTreeData = async (selectedKeys: any, e:{selected: boolean, selectedNodes: any, node: any, event: any}) => {
        if(e.node.type == "file") {
            const res = await getDatasInfoApi(e.selectedNodes[0].id)
            const data: TabDataType = {
                ...e.selectedNodes[0],
                key: e.selectedNodes[0].id,
                children: <Editor currData={res.data.data} />
            }

            getTabdata(data)
        }
    }
    
    useEffect(() => {
        (async () => setTreeData(await getTreeData()))()
    }, [])

    return (
        <div id="Aside">
            <div id="TreeData">
                <DirectoryTree
                    multiple
                    defaultExpandAll
                    key="id"
                    showLine={true}
                    icon={changeIcon}
                    fieldNames={fieldNames}
                    treeData={treeData}
                    onSelect={selectTreeData}
                    onRightClick={contextMenu}
                />
            </div>
        </div>
    )
}

export default Aside