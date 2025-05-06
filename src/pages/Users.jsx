import React, { useState, useEffect } from 'react';
import styles from './Users.module.css';

const Users = () => {
  // 用户数据状态
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 表单状态
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    status: 'active'
  });

  // 初始化模拟数据
  useEffect(() => {
    const mockUsers = [
      { id: '1', name: '张三', email: 'zhangsan@example.com', phone: '13800138001', department: '研发部', role: '开发工程师', status: 'active' },
      { id: '2', name: '李四', email: 'lisi@example.com', phone: '13800138002', department: '市场部', role: '市场专员', status: 'active' },
      { id: '3', name: '王五', email: 'wangwu@example.com', phone: '13800138003', department: '人事部', role: 'HR专员', status: 'inactive' },
      { id: '4', name: '赵六', email: 'zhaoliu@example.com', phone: '13800138004', department: '财务部', role: '会计', status: 'active' },
      { id: '5', name: '钱七', email: 'qianqi@example.com', phone: '13800138005', department: '研发部', role: '产品经理', status: 'active' },
    ];
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  // 搜索功能
  useEffect(() => {
    const results = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  // 处理搜索输入
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // 打开添加用户模态框
  const handleAddUser = () => {
    setIsEditing(false);
    setCurrentUser({
      id: '',
      name: '',
      email: '',
      phone: '',
      department: '',
      role: '',
      status: 'active'
    });
    setIsModalOpen(true);
  };

  // 打开编辑用户模态框
  const handleEditUser = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  // 处理表单输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value
    });
  };

  // 提交表单
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // 更新现有用户
      setUsers(users.map(user => 
        user.id === currentUser.id ? currentUser : user
      ));
    } else {
      // 添加新用户
      const newUser = {
        ...currentUser,
        id: Date.now().toString()
      };
      setUsers([...users, newUser]);
    }
    
    // 关闭模态框
    setIsModalOpen(false);
  };

  // 删除用户
  const handleDeleteUser = (id) => {
    if (window.confirm('确定要删除这个用户吗？')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // 切换用户状态
  const handleToggleStatus = (id) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return {
          ...user,
          status: user.status === 'active' ? 'inactive' : 'active'
        };
      }
      return user;
    }));
  };

  return (
    <div className={styles.usersPage}>
      <div className={styles.pageHeader}>
        <h1>用户信息管理</h1>
        <div className={styles.headerActions}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="搜索用户..."
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>
          <button className={styles.addButton} onClick={handleAddUser}>
            添加用户
          </button>
        </div>
      </div>

      <div className={styles.userTable}>
        <table>
          <thead>
            <tr>
              <th>姓名</th>
              <th>邮箱</th>
              <th>电话</th>
              <th>部门</th>
              <th>职位</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id} className={user.status === 'inactive' ? styles.inactiveRow : ''}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.department}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[user.status]}`}>
                      {user.status === 'active' ? '在职' : '离职'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button 
                        className={styles.editButton} 
                        onClick={() => handleEditUser(user)}
                      >
                        编辑
                      </button>
                      <button 
                        className={styles.statusButton} 
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.status === 'active' ? '设为离职' : '设为在职'}
                      </button>
                      <button 
                        className={styles.deleteButton} 
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className={styles.noData}>没有找到匹配的用户</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{isEditing ? '编辑用户' : '添加用户'}</h2>
              <button 
                className={styles.closeButton} 
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className={styles.userForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">姓名</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentUser.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">邮箱</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={currentUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">电话</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={currentUser.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="department">部门</label>
                <select
                  id="department"
                  name="department"
                  value={currentUser.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">选择部门</option>
                  <option value="研发部">研发部</option>
                  <option value="市场部">市场部</option>
                  <option value="人事部">人事部</option>
                  <option value="财务部">财务部</option>
                  <option value="行政部">行政部</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="role">职位</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={currentUser.role}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="status">状态</label>
                <select
                  id="status"
                  name="status"
                  value={currentUser.status}
                  onChange={handleInputChange}
                >
                  <option value="active">在职</option>
                  <option value="inactive">离职</option>
                </select>
              </div>
              <div className={styles.formActions}>
                <button 
                  type="button" 
                  className={styles.cancelButton}
                  onClick={() => setIsModalOpen(false)}
                >
                  取消
                </button>
                <button 
                  type="submit" 
                  className={styles.submitButton}
                >
                  {isEditing ? '保存' : '添加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;