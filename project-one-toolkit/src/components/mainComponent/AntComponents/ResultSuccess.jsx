import { Button, Space, Tooltip } from "antd";

const ResultSuccess = () => (
    <>
        {/* <Space wrap> */}
        <Tooltip title="prompt text" placement="bottom" color={'red'} open={'true'}>
            <Button>Red</Button>
        </Tooltip>
        {/* </Space> */}
    </>
);

export default ResultSuccess
