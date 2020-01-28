import fetch from 'src/utils/api';

export const loadCategoryList = () => fetch('/category');
