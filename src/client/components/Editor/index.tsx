import { BaseDataType } from "@t/index"
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@c/components/Editor/index.scss"
import { Breadcrumb, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const saveDocument = async (data: BaseDataType) => {
    localStorage.setItem(data.id as string, JSON.stringify(data))
}

function Editor({ currData }: { currData: BaseDataType }) {

    let data: BaseDataType = currData

    const editor = useCreateBlockNote({
        initialContent: JSON.parse(data.content)
    });

    const changeLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
        data.label = e.target.value
    }

    return (
        <div id={data.id} className="editor">
            <div className="editor_header">
                <div className="editor_header_breadcrumb">
                    <Breadcrumb
                        separator=">"
                        items={[
                            {
                                href: '/',
                                title: <HomeOutlined />,
                            },
                            {
                                title: data.parent.label,
                            },
                            {
                                title: data.label,
                            },
                        ]}
                    />
                </div>
                <div className="editor_header_label">
                    <input placeholder="在此键入标题" defaultValue={data.label} onChange={changeLabel} />
                </div>
            </div>
            <div className="editor_main">
                <BlockNoteView
                    editor={editor}
                    onChange={() => {
                        data.content = editor.document
                        saveDocument(data)
                    }}
                />
            </div>
        </div>
    )
}

export default Editor