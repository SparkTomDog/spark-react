import { PrismaClient } from '@prisma/client'
import { getDate } from './function.js'

export const dataInit = async () => {
    const prisma = new PrismaClient()
    const res = await prisma.dataModel.findMany({
        where: {
            deleteAt: null
        }
    })
    if(res.length === 0) {
        await prisma.dataModel.create({
            data: {
                label: "测试文档",
                content: JSON.stringify([
                    {
                        type: "paragraph",
                        content: "Welcome to this demo!",
                    }
                ]),
                createAt: getDate()
            }
        })
    }
}