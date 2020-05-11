async function proceedAuthorInfo(obj) {
  if (obj['author.userInfo'] && obj['author.userInfo'].name) {
    obj['author.name'] = obj['author.userInfo'].name;
    obj['author.picture'] = obj['author.userInfo'].picture;
    delete obj['author.userInfo'];
  }
}

module.exports = {
  proceedAuthorInfo,
};
