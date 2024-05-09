import { Response } from "express";

/**
 * 规范化返回数据
 * @param res express.Response
 * @param msg 返回的消息 必填
 * @param data 返回的数据 default {}
 * @param code 返回的状态码 default 200
 */
const HttpResponse = (res: Response, msg: string, data: any = {}, code: number = 200) => {
    res.send({
        code,
        msg,
        data
    })
}

export {
    HttpResponse
}