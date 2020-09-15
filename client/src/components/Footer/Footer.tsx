import React from 'react';
import { Layout } from 'antd';
import { useTranslation } from 'react-i18next';

import './footer.css';

const { Footer } = Layout;

function MyFooter() {
    const { t } = useTranslation();

    return (
        <Footer className="footer">
            <p>{t('Created by')} <a target="_blank" rel="noopener noreferrer" href="https://badmastery.github.io/me">Badmaster</a></p>
            <p>{t('Powered by')} <a target="_blank" rel="noopener noreferrer" href="https://reactjs.org/">React</a>.</p>
        </Footer>
    );
}

export default MyFooter;
