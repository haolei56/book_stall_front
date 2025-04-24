// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // 全局样式

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//index.js 是 React 的入口文件，负责将 React 应用挂载到 HTML 的 DOM 节点上。它是整个应用的启动点，通常只包含应用的初始化逻辑。
// 职责：引入 App.jsx 并将其渲染到 DOM 中。配置全局设置（如全局样式、状态管理工具等）。通常不包含业务逻辑。