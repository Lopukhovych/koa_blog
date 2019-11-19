const getRoleIdByTitle = (roleList, title) => roleList.filter((role) => role.title === title)[0].id;

const getUsersByRoleId = (userList, roleId) => userList.filter((user) => user.roleId === roleId);
const getUsersByStatus = (userList, status) => userList.filter((user) => user.status === status);

const getCategoryIdByTitle = (categoryList, title) => categoryList.filter((category) => category.title === title)[0].id;

const getPostsByStatus = (postList, status) => postList.filter((post) => post.status === status);

module.exports = {
  getRoleIdByTitle,
  getUsersByRoleId,
  getUsersByStatus,
  getCategoryIdByTitle,
  getPostsByStatus,
};
