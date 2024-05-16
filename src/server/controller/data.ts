import { HttpResponse } from "@s/common/HttpResponse.js"
import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import { getDate } from "@s/common/function.js";

class DataController {

    private prisma = new PrismaClient()

    createData = async(req: Request, res: Response) => {
        const data = req.body
        console.log(data)
        try {
            data.createAt = getDate()
            const re = await this.prisma.dataModel.create({
                data
            })

            HttpResponse(res, "文档创建成功", re)
        } catch (error) {
            console.log(error)
            HttpResponse(res, "error", error, 400)
        }
    }
    getData = async(req: Request, res: Response) => {
        try {
            const list = await this.prisma.dataModel.findMany({
                where: {
                    deleteAt: null
                }
            })

            HttpResponse(res, "获取文档列表成功", list)
        } catch (error) {
            HttpResponse(res, "error", error, 400)
        }
    }
    getDelData = async(req: Request, res: Response) => {
        try {
            const list = await this.prisma.dataModel.findMany({
                where: {
                    deleteAt: {
                        not: null
                    }
                }
            })

            HttpResponse(res, "获取文档回收站成功", list)
        } catch (error) {
            HttpResponse(res, "error", error, 400)
        }
    }
    updateData = async(req: Request, res: Response) => {
        const data = req.body
        try {
            data.updateAt = getDate()
            const re = await this.prisma.dataModel.update({
                where: {
                    id: data.id
                },
                data
            })

            HttpResponse(res, "修改成功", re)
        } catch (error) {
            HttpResponse(res, "error", error, 400)
        }
    }
    deleteData = async(req: Request, res: Response) => {
        const { id } = req.body
        try {
            const re = await this.prisma.dataModel.update({
                where: {
                    id
                },
                data: {
                    deleteAt: getDate()
                }
            })

            HttpResponse(res, "文档删除成功", re)
        } catch (error) {
            HttpResponse(res, "error", error, 400)
        }
    }
    removeData = async(req: Request, res: Response) => {
        const { id } = req.body
        try {
            const re = await this.prisma.dataModel.delete({
                where: {
                    id
                }
            })

            HttpResponse(res, "文档移除成功", re)
        } catch (error) {
            HttpResponse(res, "error", error, 400)
        }
    }
    searchData = async(req: Request, res: Response) => {
        const { searchText } = req.body
        try {
            const re = await this.prisma.dataModel.findMany({
                where: {
                    OR: [
                        {
                            label: {
                                contains: searchText
                            }
                        },
                        {
                            content: {
                                contains: searchText
                            }
                        }
                    ]
                }
            })

            HttpResponse(res, "搜索成功", re)
        } catch (error) {
            console.log(error)
            HttpResponse(res, "error", error, 400)
        }
    }
}

export {
    DataController
}