import React from 'react';
import { Typography, Button } from 'antd';
import { ApiOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './notfound.css';

const { Paragraph, Title, Text } = Typography;

function NotFound() {
    const history = useHistory();
    const { t } = useTranslation();

    function run() {
        history.push('/');
    }

    return (
        <div className="notfound">
            <Typography className="notfound-box">
                <Title className="title" data-text="404" level={2}>404</Title>
                <Paragraph>{t('Lost page in the universe.')}<ApiOutlined /></Paragraph>
                <Paragraph>{t('It may have been captured by')} <Text strong>{t('E.T.')}</Text> {t('or killed by a passing')} <Text strong>{t('Thanos')}</Text>.</Paragraph>
                <Button className="ghost-btn" type="dashed" ghost block onClick={run}>{t('Run')}!</Button>
            </Typography>
        </div>
    );
}

export default NotFound;
