import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Layout from './components/layout/Layout';
import Users from './pages/Users'; // 导入新的 Users 组件

// 临时页面组件，后续会替换为实际组件
const Info = () => <h2>信息管理页面</h2>;
const Visualization = () => <h2>数据可视化页面</h2>;
const Settings = () => <h2>系统设置页面</h2>;

// 受保护的路由组件
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  // 如果未登录，重定向到登录页面
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// 封装受保护的布局路由
const ProtectedLayoutRoute = ({ element }) => (
  <ProtectedRoute>
    <Layout>
      {element}
    </Layout>
  </ProtectedRoute>
);

function App() {
  return (
    <BrowserRouter>
      <div className='app-container'>
        <Routes>
          {/* 将根路径重定向到登录页面 */}
          <Route path='/' element={<Navigate to="/login" replace />} />
          <Route path='/login' element={<Login/>} />
          
          {/* 使用简化后的受保护布局路由 */}
          <Route path='/users' element={<ProtectedLayoutRoute element={<Users />} />} />
          <Route path='/info' element={<ProtectedLayoutRoute element={<Info />} />} />
          <Route path='/visualization' element={<ProtectedLayoutRoute element={<Visualization />} />} />
          <Route path='/settings' element={<ProtectedLayoutRoute element={<Settings />} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
