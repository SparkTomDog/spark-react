import { createContext, useContext } from "react";
import WebStore from "./web";
import DataStore from "./data";

class BaseStore {
    webStore: WebStore;
    dataStore: DataStore;

    constructor() {
        this.webStore = new WebStore()
        this.dataStore = new DataStore()
    }
}

const baseStore = new BaseStore()

/**
 * 定义状态上下文
 */
const BaseStoreContext = createContext(baseStore)

/**
 * 封装状态上下文组件
 * @param param0 
 * @returns 
 */
const BaseStoreProvider = ({ children }: { children: any }) => {
    return (
        <BaseStoreContext.Provider value={baseStore}>
            { children }
        </BaseStoreContext.Provider>
    )
}

/**
 * 封装获取上下文状态数据的方法
 */
const useBaseStore = () => {
    return useContext(BaseStoreContext)
}

export {
    BaseStoreProvider,
    useBaseStore
}