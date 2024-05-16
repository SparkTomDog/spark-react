import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useEffect, useMemo, useState } from "react";
import { BaseDataType } from "@t/index";
import { observer } from "mobx-react-lite";
import { useBaseStore } from "@c/stores";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";

const Editor = observer(() => {

    const { dataStore } = useBaseStore()
    const [editData, setEditData] = useState<BaseDataType | null>(dataStore.currentData)
    const [initialContent, setInitialContent] = useState<PartialBlock[] | undefined>([
        {
            type: "paragraph",
            content: "Welcome to this demo!",
        }
    ]);
    const editor = useMemo(() => {
        return BlockNoteEditor.create({ initialContent });
    }, [initialContent])

    useEffect(() => {
        setEditData(dataStore.currentData)
        setInitialContent(dataStore.currentData!.content)
    }, [dataStore.currentData])

    if (editData?.id) {
        return <div className="editor">
            <div className="editor_preview">
                <div className="editor_preview_label">
                    <input type="text" placeholder="在此键入标题" value={editData?.label} onChange={(e) => dataStore.updateEditDataLabel(e)} />
                </div>
                <div className="editor_preview_item">
                    <BlockNoteView editor={editor} onChange={() => {
                        dataStore.updateEditDataContent(editor.document)
                    }} />
                </div>
            </div>
        </div>
    } else {
        <div></div>
    }
})

export default Editor