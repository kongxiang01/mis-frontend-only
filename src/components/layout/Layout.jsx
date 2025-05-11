import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // 在 Layout.jsx 中修改 handleLogout 函数
  const handleLogout = () => {
    if (window.confirm('是否同时清除本地存储的用户数据？')) {
      localStorage.removeItem('users');
    }
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const menuItems = [
    { path: '/users', label: '用户管理', icon: '👥' },
  ];

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <span className={styles.logo}>信息管理系统</span>
          <button 
            className={styles.collapseBtn} 
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? '≫' : '≪'}
          </button>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.userInfo}>
            <span className={styles.userAvatar}>👤</span>
            管理员
          </span>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            退出登录
          </button>
        </div>
      </header>
      
      <div className={styles.mainContainer}>
        <aside className={`${styles.sider} ${collapsed ? styles.collapsed : ''}`}>
          <nav className={styles.menu}>
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`${styles.menuItem} ${location.pathname === item.path ? styles.active : ''}`}
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                <span className={styles.menuLabel}>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>
        
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;