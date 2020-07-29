import React from 'react';
import { Layout } from 'antd';
import { useTranslation } from 'react-i18next';

import './footer.css';

const { Footer } = Layout

function SystemFooter() {
    const { t } = useTranslation();

    return (
        <Footer className="system-footer">
            <p>{t('Created by')} <a target="_blank" rel="noopener noreferrer" href="https://badmastery.github.io/me">Badmaster</a></p>
            <p>{t('Created')} {new Date().getFullYear()}</p>
        </Footer>
    )
}

export default SystemFooter;