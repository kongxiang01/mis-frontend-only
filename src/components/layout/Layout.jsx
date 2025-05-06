import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const menuItems = [
    { path: '/users', label: '用户管理', icon: '👥' },
    { path: '/info', label: '信息管理', icon: '📋' },
    { path: '/visualization', label: '数据可视化', icon: '📈' },
    { path: '/settings', label: '系统设置', icon: '⚙️' }
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
                {!collapsed && <span className={styles.menuLabel}>{item.label}</span>}
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