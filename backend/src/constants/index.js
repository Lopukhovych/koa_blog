const userStatus = {
  pending: 'pending',
  active: 'active',
  disable: 'disable',
};

const articleStatus = {
  created: 'created',
  inReview: 'in review',
  toRefactor: 'to refactor',
  published: 'published',
  deleted: 'deleted',
};

const userRoles = {
  user: 'user',
  author: 'author',
  moderator: 'moderator',
  admin: 'admin',
};

const pageTitles = {
  aboutUs: 'aboutUs',
  contactUs: 'contactUs',
};


module.exports = {
  userStatus,
  userRoles,
  articleStatus,
  pageTitles,
};
