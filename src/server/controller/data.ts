import { HttpResponse } from "@s/common/HttpResponse.js"
import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'

class DataController {

    private prisma = new PrismaClient()

    createData = async(req: Request, res: Response) => {
        const data = req.body
        try {
            const re = await this.prisma.dataModel.create({
                data
            })

            HttpResponse(res, "创建成功", re)
        } catch (error) {
            HttpResponse(res, "error", error, 400)
        }
    }

    getTreeData = async(req: Request, res: Response) => {
        try {
            const data = await this.prisma.dataModel.findMany({
                where: {
                    type: "folder"
                },
                include: {
                    documents: true
                }
            })

            HttpResponse(res, "获取成功", data)
        } catch (error) {
            HttpResponse(res, "error", error, 400)
        }
    }

    getCategoryInfo = async(req: Request, res: Response) => {
        const { id } = req.body
        try {
            const data = await this.prisma.dataModel.findFirst({
                where: {
                    type: "folder",
                    id
                },
                include: {
                    documents: true
                }
            })

            HttpResponse(res, "获取成功", data)
        } catch (error) {
            HttpResponse(res, "error", error, 400)
        }
    }

    getDataInfo = async(req: Request, res: Response) => {
        const { id } = req.body
        try {
            const data = await this.prisma.dataModel.findFirst({
                where: {
                    id
                },
                include: {
                    parent: true
                }
            })

            HttpResponse(res, "获取成功", data)
        } catch (error) {
            HttpResponse(res, "error", error, 400)
        }
    }

    updateData = async(req: Request, res: Response) => {
        const document = req.body
        try {
            const re = await this.prisma.dataModel.update({
                where: {
                    id: document.id
                },
                data: {
                    label: document.label,
                    content: document.content
                }
            })

            HttpResponse(res, "更新成功", re)
        } catch (error) {
            HttpResponse(res, "error", error, 400)
        }
    }

    deleteData = async(req: Request, res: Response) => {
        const { id } = req.body
        try {
            const data = await this.prisma.dataModel.delete({
                where: {
                    id
                }
            })
            HttpResponse(res, "删除成功", data)
        } catch (error) {
            HttpResponse(res, "error", error, 400)
        }
    }
}

export {
    DataController
}