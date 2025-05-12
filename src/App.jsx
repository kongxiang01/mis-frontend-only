import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/layout/Layout';
import Users from './pages/Users';

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
