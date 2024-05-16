import SearchBox from '@c/components/Search'
import SettingBox from '@c/components/Setting'
import AsidePage from '@c/pages/Contriner/Aside/index'
import EditorTemplate from '@c/components/Editor/template'
import TrashBox from '@c/components/Trash'

function Contriner() {
    return (
        <div id="Contriner">
            <AsidePage />
            <EditorTemplate />
            <SettingBox />
            <SearchBox />
            <TrashBox />
        </div>
    )
}

export default Contriner