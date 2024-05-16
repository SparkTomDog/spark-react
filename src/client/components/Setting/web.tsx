import { useBaseStore } from "@c/stores";
import { Button, Col, InputNumber, Row, Slider, Tooltip } from "antd";
import { observer } from "mobx-react-lite";

const WebSetting = observer(() => {

    const { webStore } = useBaseStore()

    return (
        <>
            <Row>
                <Col span={8}>
                    侧边栏宽度
                </Col>
                <Col span={8}>
                    <Slider
                        min={200}
                        max={500}
                        step={100}
                        onChange={(value) => webStore.changeAsideWidth(value)}
                        value={webStore.asideWidth}
                    />
                </Col>
                <Col span={4}>
                    <InputNumber
                        min={200}
                        max={500}
                        style={{marginLeft: '10px', width: '100%'}}
                        step={100}
                        value={webStore.asideWidth}
                        onChange={(value: any) => webStore.changeAsideWidth(value as number)}
                    />
                </Col>
                <Col span={4} style={{ display: webStore.asideWidth == 200 ? 'none' : 'block' }}>
                    <Tooltip title="恢复默认">
                        <Button type="link" onClick={() => webStore.changeAsideWidth(200)}>default</Button>
                    </Tooltip>
                </Col>
            </Row>
        </>
    )
})

export default WebSetting