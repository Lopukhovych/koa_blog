const {pageTitles} = require('../src/constants');

module.exports = {
  up: async (queryInterface) => {
    const teamMembers = await queryInterface.sequelize
      .query(` 
        SELECT users.id, "userInfo", email
        FROM "Users" users
        INNER JOIN "Roles" roles ON users."roleId" = roles.id
        WHERE status = 'active' and roles.title in ('moderator', 'admin')`, {raw: true})
      .then((data) => data[0]
        .map(({id, email, userInfo}) => ({id, name: userInfo.name ? userInfo.name : email})));
    const generalInfoList = [
      {
        title: pageTitles.aboutUs,
        createdAt: new Date(),
        updatedAt: new Date(),
        info: JSON.stringify({
          slogan: 'Make your life fascinating. Make your knowledge deeper. Make every day alive',
          generalInfo: `koa_blog is a online magazine dedicated to get info about daily life and different spheres
    of human development. Every month we select the most important news  and prepare our own stories.
     The basis of the media all this time is materials about what is  happening in the world Internet:
      deals and launches, success and failure stories, instructions, reviews and investigations.`,
          team: [...teamMembers],
          vision: `
    Main purpose of this portal is to make people easy get info, socialize and  be in trends.
    We also publish really important world news and mainstreams. We stand for truthfully
    information, but we also appreciate the freedom of disseminating information and publish personal
    opinions.`,
          commentList: [
            {
              id: 1,
              content: `Ei prima graecis consulatu vix, per cu corpora qualisque voluptaria. Bonorum
                                        moderatius in per, ius cu albucius voluptatum. Ne ius torquatos dissentiunt.
                                        Brute illum utroque eu quo. Cu tota mediocritatem vis, aliquip cotidieque eu
                                        ius, cu lorem suscipit eleifend sit.`,
              authorName: 'Vasya Three',
              role: 'author',
            },
            {
              id: 2,
              content: `Ei prima graecis consulatu vix, per cu corpora qualisque voluptaria. Bonorum
                                        moderatius in per, ius cu albucius voluptatum. Ne ius torquatos dissentiunt.
                                        Brute illum utroque eu quo. Cu tota mediocritatem vis, aliquip cotidieque eu
                                        ius, cu lorem suscipit eleifend sit.`,
              authorName: 'Vasya2 Three',
              role: 'user',
            },
            {
              id: 3,
              content: `Ei prima graecis consulatu vix, per cu corpora qualisque voluptaria. Bonorum
                                        moderatius in per, ius cu albucius voluptatum. Ne ius torquatos dissentiunt.
                                        Brute illum utroque eu quo. Cu tota mediocritatem vis, aliquip cotidieque eu
                                        ius, cu lorem suscipit eleifend sit.`,
              authorName: 'Vasya Three',
              role: 'author',
            },
            {
              id: 4,
              content: `Ei prima graecis consulatu vix, per cu corpora qualisque voluptaria. Bonorum
                                        moderatius in per, ius cu albucius voluptatum. Ne ius torquatos dissentiunt.
                                        Brute illum utroque eu quo. Cu tota mediocritatem vis, aliquip cotidieque eu
                                        ius, cu lorem suscipit eleifend sit.`,
              authorName: 'Vasya2 Three',
              role: 'user',
            },
          ],
        }),
      },
    ];
    await queryInterface.bulkInsert('GeneralInfo', [
      ...generalInfoList,
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('GeneralInfo', null, {});
  },
};
