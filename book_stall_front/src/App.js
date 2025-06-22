import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Index from './components/index';
import Login from './components/login'; // Import the Login component

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 根路径重定向到首页 */}
        <Route path="/" element={<Navigate to="/index" replace />} />
        
        {/* 首页路由组 */}
        <Route path="/index" element={<Index />}>
          {/* 嵌套路由 */}
          <Route path="login" element={<Login />} />
          {/* <Route path="register" element={<Register />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="detail/:id" element={<DetailPage />} /> */}
        </Route>
        
        {/* 管理后台路由组 */}
        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
        </Route> */}
        
        {/* 未匹配路由处理 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

//App.jsx 是整个应用的入口，负责定义应用的主要结构和逻辑。它通常包含应用的路由配置、全局状态管理逻辑，以及其他顶层组件（如导航栏、页脚等）。是一个 React 组件，通常作为整个应用的根组件。
// 职责：定义应用的 UI 和功能。组织和渲染子组件。处理应用的业务逻辑。
