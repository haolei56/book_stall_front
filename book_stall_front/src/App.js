import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminRedirect from './components/AdminRedirect';
import Index from './components/index';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminRedirect />} />
        <Route path="/main" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

//App.jsx 是整个应用的入口，负责定义应用的主要结构和逻辑。它通常包含应用的路由配置、全局状态管理逻辑，以及其他顶层组件（如导航栏、页脚等）。是一个 React 组件，通常作为整个应用的根组件。
// 职责：定义应用的 UI 和功能。组织和渲染子组件。处理应用的业务逻辑。
