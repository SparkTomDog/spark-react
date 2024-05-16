import { getDocumentApi, updateDocumentApi, createDocumentApi, deleteDocumentApi } from '@c/api/dataApi';
import { BaseDataType } from '@t/index';
import { action, makeAutoObservable, observable } from 'mobx'
import { makePersistable } from 'mobx-persist-store';
import { ChangeEvent } from 'react';

class DataStore {

    @observable treeData: BaseDataType[] = []
    @observable currentData: BaseDataType | null = {}
    @observable tabs: BaseDataType[] = []

    @action async getTreeData() {
        const res = await getDocumentApi()
        this.treeData = res.data.data
    }

    @action async createData(data: BaseDataType) {
        const res = await createDocumentApi(data)
        await this.getTreeData()
        if (res.data.code === 200) {
            this.pushTabs(res.data.data)
        }
    }

    @action updateEditDataLabel = (e: ChangeEvent<HTMLInputElement>) => {
        this.currentData!.label = e.target.value
    }

    @action updateEditDataContent = (content: any) => {
        this.currentData!.content = content
    }

    @action async changeTab(data: BaseDataType) {
        if (data.id !== this.currentData?.id) {
            await this.updateCurrentData()
            this.currentData = { ...data, content: JSON.parse(data.content) }
        }
    }

    @action pushTabs(data: BaseDataType) {
        const res = this.tabs.filter(item => {
            return item.id === data.id
        })
        if (res.length === 0) {
            this.tabs.push(data)
            const dd = this.tabs.filter(item => {
                return item.id === data.id
            })
            this.currentData = { ...dd[0], content: JSON.parse(dd[0].content) }
        } else {
            this.currentData = { ...res[0], content: JSON.parse(res[0].content) }
        }
    }

    @action removeTabs(data: BaseDataType) {
        this.updateCurrentData()
        const index = this.tabs.findIndex(value => value.id === data.id)
        if (index === 0) {
            if (this.tabs.length === 1) {
                this.currentData = { ...this.tabs[index], content: JSON.parse(this.tabs[index].content) }
            } else {
                this.currentData = { ...this.tabs[index + 1], content: JSON.parse(this.tabs[index + 1].content) }
            }
        } else {
            this.currentData = { ...this.tabs[index - 1], content: JSON.parse(this.tabs[index - 1].content) }
        }
        const res = this.tabs.filter(item => {
            return item.id !== data.id
        })
        this.tabs = res
    }

    @action async updateCurrentData() {
        await updateDocumentApi({
            ...this.currentData,
            content: JSON.stringify(this.currentData?.content)
        }).then(async () => {
            await this.getTreeData()
        })
    }

    @action async deleteDcoument(item: BaseDataType) {
        await deleteDocumentApi(item.id as string)
        await this.getTreeData()
    }

    constructor() {
        makeAutoObservable(this, {}, {
            autoBind: true
        })

        // 持久化存储
        makePersistable(this, {
            // 存储的key
            name: "data",
            // 需要持久化的字段
            properties: ["treeData", "currentData", "tabs"],
            // 持久化的位置
            storage: window.localStorage
        })
    }

}

export default DataStore