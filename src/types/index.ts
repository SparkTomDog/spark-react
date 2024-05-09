interface BaseDataType {
    id?: string
    label: string
    content?: any
    [x: string]: any
}

interface TabDataType extends BaseDataType {
    key: string
    children: any
}

export type {
    BaseDataType,
    TabDataType
}