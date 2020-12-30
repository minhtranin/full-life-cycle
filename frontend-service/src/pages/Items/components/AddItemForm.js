import React from 'react';
import { Steps, Row, Col, Button } from 'antd';
// import { formatMessage } from 'umi-plugin-react/locale';
// import style from './style.less';


const StepsProcessBar = ({ handleAdd }) => {
  return <>
    <Row type="flex" justify="center">
        <Button type="primary" block onClick={handleAdd}>
            Add Item
        </Button>
    </Row>
  </>;
};
export default StepsProcessBar;
