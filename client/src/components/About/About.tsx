import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import { GithubOutlined, EnvironmentFilled } from '@ant-design/icons';

import './about.css';

function About() {
    const [workYear, setWorkYear] = useState(0);

    useEffect(() => {
        const year = new Date().getFullYear();
        setWorkYear((year - 2017));
    }, []);

    return (
        <div className="about-box">
            <div className="about-avatar">
                <Avatar
                    src={require('../../assets/mr.jpeg')}
                    size={160}
                    alt="Mr."
                />
            </div>
            <h2 className="about-name">Mr.</h2>
            <div className="about-desc">
                <p>
                    <EnvironmentFilled key="desc-icon" />
                    <span key="desc-adress">beijing / China</span>
                </p>
                <p>逗比和文艺(伪)的渣渣程序员, 喜欢唱、跳 Rap 和篮球。</p>
            </div>
            <div className="about-content">
                <p>毕业于某二本院校计算机系，{workYear}年前后端开发经验，熟练掌握 JavaScript、TypeScript、Node.js、React、Electron、MongoDB 等语言或技术，具备 Web 全栈独立开发能力。</p>
                <p>爱好上网、游戏、技术研究，完美主义者，细节控。</p>
            </div>
            <div className="about-links">
                <a href="https://github.com/BadmasterY" target="_blank" rel="noopener noreferrer"><GithubOutlined className="link-github" /></a>
            </div>
        </div>
    );
}

export default About;
