import DocumentList from '@c/components/DocumentList'
import { useBaseStore } from '@c/stores'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

const Aside = observer(() => {

    const { webStore, dataStore } = useBaseStore()

    useEffect(() => {
        dataStore.getTreeData()
    }, [])

    return (
        <div id="ContrinerAside" style={{ width: `${webStore.asideWidth}px`, display: webStore.asideShow ? 'block' : 'none' }}>
            <DocumentList />
        </div>
    )
})

export default Aside