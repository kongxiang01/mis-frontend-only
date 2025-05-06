import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // 检查用户是否已登录
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  // 模拟数据
  const stats = [
    { title: '用户总数', value: '1,234', icon: '👥' },
    { title: '今日活跃', value: '567', icon: '📈' },
    { title: '待处理事项', value: '42', icon: '📋' },
    { title: '系统消息', value: '8', icon: '📩' }
  ];

  return (
    <div className={styles.dashboardPage}>
      <h1>仪表盘</h1>
      
      <div className={styles.dashboardStats}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statInfo}>
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.dashboardRecent}>
        <h2>最近活动</h2>
        <div className={styles.recentList}>
          <div className={styles.recentItem}>
            <div className={styles.recentIcon}>📝</div>
            <div className={styles.recentContent}>
              <h4>系统更新</h4>
              <p>系统已更新到最新版本 v1.2.0</p>
              <span className={styles.recentTime}>2小时前</span>
            </div>
          </div>
          <div className={styles.recentItem}>
            <div className={styles.recentIcon}>👤</div>
            <div className={styles.recentContent}>
              <h4>新用户注册</h4>
              <p>张三已成功注册账号</p>
              <span className={styles.recentTime}>昨天</span>
            </div>
          </div>
          <div className={styles.recentItem}>
            <div className={styles.recentIcon}>🔔</div>
            <div className={styles.recentContent}>
              <h4>待办提醒</h4>
              <p>您有3个任务需要今天完成</p>
              <span className={styles.recentTime}>昨天</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;