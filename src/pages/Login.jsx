import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 简单的验证
    if (!username || !password) {
      setError('用户名和密码不能为空');
      return;
    }
    
    // 模拟登录成功
    // 在实际应用中，这里应该调用API进行身份验证
    if (username === 'admin' && password === 'admin123') {
      // 存储登录状态
      localStorage.setItem('isLoggedIn', 'true');
      // 跳转到用户信息管理页面
      navigate('/users');
    } else {
      setError('用户名或密码错误');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginFormContainer}>
        <h2>登录</h2>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="请输入用户名"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
            />
          </div>
          <button type="submit" className={styles.loginButton}>登录</button>
        </form>
        <p className={styles.loginHint}>提示：用户名 admin，密码 admin123</p>
      </div>
    </div>
  );
};

export default Login;