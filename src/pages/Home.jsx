import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1>信息管理系统</h1>
      <div className={styles.homeContent}>
        <p>欢迎使用我们的信息管理系统，这是一个用于管理和分析数据的平台。</p>
        <div className={styles.homeButtons}>
          <Link to="/login" className={styles.homeButton}>登录</Link>
          <Link to="/dashboard" className={styles.homeButton}>仪表盘</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;