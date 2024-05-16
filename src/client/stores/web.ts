import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store';

class WebStore {
    asideShow: boolean = true;
    settingShow: boolean = false;
    searchShow: boolean = false;
    asideWidth: number = 300;
    trashShow: boolean = false

    constructor() {
        makeAutoObservable(this, {}, {
            autoBind: true
        })

        // 持久化存储
        makePersistable(this, {
            // 存储的key
            name: "web",
            // 需要持久化的字段
            properties: ["asideShow", "asideWidth", "settingShow", "searchShow", "trashShow"],
            // 持久化的位置
            storage: window.localStorage
        })
    }

    /**
     * 切换侧边栏显示action
     * @param type 
     */
    toggleAsideShow(type: boolean = !this.asideShow) {
        this.asideShow = type
    }

    /**
     * 切换设置弹窗的显示或者隐藏
     * @param type 
     */
    toggleSettingShow(type: boolean = !this.settingShow) {
        this.settingShow = type
    }

    /**
     * 切换搜索弹窗的显示或者隐藏
     * @param type 
     */
    toggleSearchShow(type: boolean = !this.searchShow) {
        this.searchShow = type
    }

    /**
     * 切换侧边栏宽度
     * @param newWidth 
     */
    changeAsideWidth(newWidth: number) {
        this.asideWidth = newWidth
    }

    /**
     * 切换回收站弹窗的显示或者隐藏
     * @param type 
     */
    toggleTrashShow(type: boolean = !this.trashShow) {
        this.trashShow = type
    }

}

export default WebStore