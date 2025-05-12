import React, { useState, useEffect } from 'react';
import styles from './Users.module.css';
import userService from '../services/userService';

const Users = () => {
  // 用户数据状态
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // 选中用户状态
  const [selectedUsers, setSelectedUsers] = useState([]);
  
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

  // 初始化数据
  useEffect(() => {
    // 模拟 API 请求延迟
    setLoading(true);
    setTimeout(() => {
      const fetchedUsers = userService.getUsers();
      setUsers(fetchedUsers);
      setFilteredUsers(fetchedUsers);
      setLoading(false);
    }, 500);
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
    // 重置选中状态
    setSelectedUsers([]);
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
    setLoading(true);
    
    setTimeout(() => {
      if (isEditing) {
        // 更新现有用户
        userService.updateUser(currentUser);
        setUsers(userService.getUsers());
      } else {
        // 添加新用户
        userService.addUser(currentUser);
        setUsers(userService.getUsers());
      }
      
      // 关闭模态框
      setIsModalOpen(false);
      setLoading(false);
    }, 300);
  };

  // 删除用户
  const handleDeleteUser = (id) => {
    // 查找要删除的用户，获取其名字
    const userToDelete = users.find(user => user.id === id);
    if (!userToDelete) return;
    
    if (window.confirm(`确定要删除用户 "${userToDelete.name}" 吗？此操作不可恢复。`)) {
      setLoading(true);
      setTimeout(() => {
        userService.deleteUser(id);
        setUsers(userService.getUsers());
        setLoading(false);
      }, 300);
    }
  };

  // 切换用户状态
  const handleToggleStatus = (id) => {
    setLoading(true);
    setTimeout(() => {
      const userToUpdate = users.find(user => user.id === id);
      if (userToUpdate) {
        const updatedUser = {
          ...userToUpdate,
          status: userToUpdate.status === 'active' ? 'inactive' : 'active'
        };
        userService.updateUser(updatedUser);
        setUsers(userService.getUsers());
      }
      setLoading(false);
    }, 300);
  };
  
  // 处理选择单个用户
  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };
  
  // 处理全选/取消全选
  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      // 如果已全选，则取消全选
      setSelectedUsers([]);
    } else {
      // 否则全选
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };
  
  // 批量删除用户
  const handleBatchDelete = () => {
    if (selectedUsers.length === 0) {
      alert('请先选择要删除的用户');
      return;
    }
    
    if (window.confirm(`确定要删除选中的 ${selectedUsers.length} 个用户吗？此操作不可恢复。`)) {
      setLoading(true);
      setTimeout(() => {
        // 逐个删除选中的用户
        selectedUsers.forEach(id => {
          userService.deleteUser(id);
        });
        
        // 更新用户列表
        setUsers(userService.getUsers());
        // 清空选中状态
        setSelectedUsers([]);
        setLoading(false);
      }, 500);
    }
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
      
      {/* 添加批量操作区域 */}
      {selectedUsers.length > 0 && (
        <div className={styles.batchActions}>
          <span>已选择 {selectedUsers.length} 项</span>
          <button 
            className={styles.batchDeleteButton} 
            onClick={handleBatchDelete}
          >
            批量删除
          </button>
        </div>
      )}

      <div className={styles.userTable}>
        {loading ? (
          <div className={styles.loading}>加载中...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th className={styles.checkboxCell}>
                  <input 
                    type="checkbox" 
                    checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                    onChange={handleSelectAll}
                  />
                </th>
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
                    <td className={styles.checkboxCell}>
                      <input 
                        type="checkbox" 
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                      />
                    </td>
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
                  <td colSpan="8" className={styles.noData}>没有找到匹配的用户</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
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
              {/* 表单内容保持不变 */}
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
                  disabled={loading}
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