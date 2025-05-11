// 模拟用户管理 API 服务
const userService = {
  // 获取所有用户
  getUsers: () => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
    // 默认用户数据
    const defaultUsers = [
      { id: '1', name: '张三', email: 'zhangsan@example.com', phone: '13800138001', department: '研发部', role: '开发工程师', status: 'active' },
      { id: '2', name: '李四', email: 'lisi@example.com', phone: '13800138002', department: '市场部', role: '市场专员', status: 'active' },
      { id: '3', name: '王五', email: 'wangwu@example.com', phone: '13800138003', department: '人事部', role: 'HR专员', status: 'inactive' },
      { id: '4', name: '赵六', email: 'zhaoliu@example.com', phone: '13800138004', department: '财务部', role: '会计', status: 'active' },
      { id: '5', name: '钱七', email: 'qianqi@example.com', phone: '13800138005', department: '研发部', role: '产品经理', status: 'active' },
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
    return defaultUsers;
  },

  // 保存用户数据到 localStorage
  saveUsers: (users) => {
    localStorage.setItem('users', JSON.stringify(users));
    return users;
  },

  // 添加新用户
  addUser: (user) => {
    const users = userService.getUsers();
    const newUser = {
      ...user,
      id: Date.now().toString()
    };
    const updatedUsers = [...users, newUser];
    userService.saveUsers(updatedUsers);
    return newUser;
  },

  // 更新现有用户
  updateUser: (updatedUser) => {
    const users = userService.getUsers();
    const updatedUsers = users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    );
    userService.saveUsers(updatedUsers);
    return updatedUser;
  },

  // 删除用户
  deleteUser: (id) => {
    const users = userService.getUsers();
    const updatedUsers = users.filter(user => user.id !== id);
    userService.saveUsers(updatedUsers);
    return id;
  },

  // 清除所有用户数据
  clearAllUsers: () => {
    localStorage.removeItem('users');
    return true;
  }
};

export default userService;