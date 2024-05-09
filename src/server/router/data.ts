import { DataController } from '@s/controller/data.js'
import { Router } from 'express'

const router = Router()
const controller = new DataController()

router.post("/tree", controller.getTreeData)
router.post("/info", controller.getDataInfo)
router.post("/create", controller.createData)
router.post("/update", controller.updateData)
router.post("/delete", controller.deleteData)
router.post("/category-info", controller.getCategoryInfo)

export default router