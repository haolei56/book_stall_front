import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRedirect = () => {
    
  const navigate = useNavigate();

  useEffect(() => {
    // 自动跳转到后台登录页
    navigate('/admin/login');
  }, [navigate]);

  return (
    <div>
      {/* 可选：在跳转前显示的内容 */}
      <p>正在跳转到后台登录页...</p>
    </div>
  );
};

export default AdminRedirect;

// 默认导出:export default React;简单直观，适合导出一个模块的主要功能。如果模块中有多个功能，默认导出只能导出一个值，无法同时导出多个功能。
//类似于导入整个类

// 命名导出:export const useEffect = () => { /* ... */ };可以导出多个功能，适合功能丰富的模块.支持按需导入，减少不必要的代码加载。
//类似于导入类中的某个方法

//const navigate = useNavigate();
//navigate 是一个函数，它允许你在代码中控制路由跳转，而不是依赖于链接或按钮的点击事件。
//useNavigate 是一个 React Hook，返回一个函数，这个函数可以用来改变当前的 URL 地址。

//[navigate] 是 useEffect 的依赖项数组。
// 当 navigate 函数发生变化时，useEffect 会重新执行。
// 在大多数情况下，navigate 不会变化，但将其作为依赖项是一个安全的做法，避免潜在的闭包问题。

//跳转发生在以下情况下：
// 组件加载时：
// useEffect 在组件首次渲染后会立即执行。
// 因此，当 AdminRedirect 组件被加载时，navigate('/admin/login') 会被调用，页面会跳转到 /admin/login。
// 依赖项变化时：
// 如果依赖项 [navigate] 中的值发生变化（尽管在这个例子中不太可能），useEffect 也会重新执行，触发跳转。

//JSX 内部注释：{/* 注释内容 */}
//JSX 外部注释：// 注释内容 或 /* 注释内容 */