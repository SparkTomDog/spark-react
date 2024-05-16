import { BaseDataType } from "@t/index"
import { instance } from "./http"

const createDocumentApi = async(data: BaseDataType) => {
    return await instance.post("/data/create", data)
}

const getDocumentApi = async() => {
    return await instance.post("/data/get")
}

const getDeleteDocumentApi = async() => {
    return await instance.post("/data/recycle")
}

const updateDocumentApi = async(data: BaseDataType) => {
    return await instance.post("/data/update", data)
}

const deleteDocumentApi = async(id: string) => {
    return await instance.post("/data/delete", {id})
}

const removeDocumentApi = async(id: string) => {
    return await instance.post("/data/remove", {id})
}

const searchDocumentApi = async(searchText: string) => {
    return await instance.post("/data/search", { searchText })
}

export {
    createDocumentApi,
    getDocumentApi,
    updateDocumentApi,
    deleteDocumentApi,
    searchDocumentApi,
    removeDocumentApi,
    getDeleteDocumentApi
}