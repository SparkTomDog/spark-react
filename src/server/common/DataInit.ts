import { PrismaClient } from '@prisma/client'

export const dataInit = async () => {
    const prisma = new PrismaClient()
    const res = await prisma.dataModel.findMany({
        where: {
            type: "folder"
        }
    })
    if (res.length < 1) {
        await prisma.dataModel.create({
            data: {
                label: "未分类",
                type: "folder",
                documents: {
                    create: [
                        {
                            label: "测试文档",
                            type: "file"
                        }
                    ]
                }
            }
        })
    }
}