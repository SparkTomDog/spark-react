import { BaseDataType } from "@t/index"
import { instance } from "./http"

const getTreeDatasApi = async() => {
    return await instance.post("/data/tree")
}

const getDatasInfoApi = async(id: string) => {
    return await instance.post("/data/info", { id })
}

const createDataApi = async(data: BaseDataType) => {
    return await instance.post("/data/create", data)
}

const updateDataApi = async(data: BaseDataType) => {
    return await instance.post("/data/update", data)
}

const deleteDataApi = async(id: string) => {
    return await instance.post("/data/delete", { id })
}

const getCategoryInfoApi = async(id: string) => {
    return await instance.post("/data/category-info", { id })
}

export {
    getTreeDatasApi,
    getDatasInfoApi,
    createDataApi,
    updateDataApi,
    deleteDataApi,
    getCategoryInfoApi,
}