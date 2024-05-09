import express from "express";
import ViteExpress from "vite-express";
import cors from 'cors'
import dataRouter from '@s/router/data.js'
import { dataInit } from "./common/DataInit.js";

const app = express();
const port = 3000

app.use(express.json())
app.use(cors())
app.use("/api/data", dataRouter)

ViteExpress.listen(app, port, async () => {
    await dataInit()
    console.log(`服务已启动 http://localhost:${port}`)
});
