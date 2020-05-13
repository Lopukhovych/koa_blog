const {findGeneralInfoByTitle, findTeamMembersByIds} = require('src/resources/generalInfo.resource');
const {pageTitles} = require('src/constants');

async function getAboutUsInfo() {
  try {
    const {info} = await findGeneralInfoByTitle(pageTitles.aboutUs);
    if (!info) {
      throw new Error();
    }
    return JSON.parse(info);
  } catch (error) {
    console.error('Error_service getAboutUsInfo:', error);
    throw new Error('Cannot get about us information');
  }
}

async function getTeamInfo(teamIds) {
  try {
    const team = await findTeamMembersByIds(teamIds);
    return team
      .map(({id, email, userInfo}) => ({id, name: userInfo.name ? userInfo.name : email}));
  } catch (error) {
    console.error('Error_service getTeamInfo:', error);
    throw new Error('Cannot get information about our team');
  }
}

async function getContactUsInfo() {
  try {
    const {info} = await findGeneralInfoByTitle(pageTitles.contactUs);
    if (!info) {
      throw new Error();
    }
    return JSON.parse(info);
  } catch (error) {
    console.error('Error_service getContactUsInfo:', error);
    throw new Error('Cannot get contact us information');
  }
}

async function proceedContactUsMessage(name, email, message) {
  try {
    if (!email || !message) {
      throw new Error();
    }
    console.log('send message to support team:');
  } catch (error) {
    console.error('Error_service proceedContactUsMessage:', error);
    throw new Error('Invalid contact data, please fill required data and try again');
  }
}

module.exports = {
  getAboutUsInfo,
  getTeamInfo,
  getContactUsInfo,
  proceedContactUsMessage,
};
