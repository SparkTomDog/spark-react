import moment from "moment"

/**
 * 获取当前格式化的时间字符串
 * @returns 
 */
const getDate = () => {
    return moment().format("YYYY-MM-DD HH:mm:ss")
}

export {
    getDate
}