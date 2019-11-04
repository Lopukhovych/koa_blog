import hotpost1 from 'src/MockedData/popularnews/hot-post-1.jpg';
import hotpost2 from 'src/MockedData/popularnews/hot-post-2.jpg';
import hotpost3 from 'src/MockedData/popularnews/hot-post-3.jpg';

export const categoryList = [
  {
    imgLink: hotpost1,
    categoryList: [
      {name: 'Lifestyle', link: 'lifestyle', id: 1},
      {name: 'Fashion', link: 'fashion', id: 2},
    ],
    id: 1,
    title: 'Mel ut impetus suscipit tincidunt. Cum id ullum laboramus persequeris.',
    author: {name: 'John Doe3', id: 3},
    date: new Date('2018-04-20'),
  }, {
    imgLink: hotpost2,
    categoryList: [
      {name: 'Fashion', link: 'fashion', id: 2},
    ],
    id: 2,
    title: 'Mel ut impetus suscipit tincidunt. Cum id ullum laboramus persequeris.',
    author: {name: 'John Doe3', id: 3},
    date: new Date('2018-04-20'),
  }, {
    imgLink: hotpost3,
    categoryList: [
      {name: 'Travel', link: 'travel', id: 3},
      {name: 'Fashion', link: 'fashion', id: 2},
    ],
    id: 9,
    title: 'Mel ut impetus suscipit tincidunt. Cum id ullum laboramus persequeris.',
    author: {name: 'John Doe3', id: 3},
    date: new Date('2018-04-20'),
  }, {
    imgLink: hotpost1,
    categoryList: [
      {name: 'Lifestyle', link: 'lifestyle', id: 1},
      {name: 'Fashion', link: 'fashion', id: 2},
    ],
    id: 5,
    title: 'Mel ut impetus suscipit tincidunt. Cum id ullum laboramus persequeris.',
    author: {name: 'John Doe3', id: 3},
    date: new Date('2018-04-20'),
  },
];
