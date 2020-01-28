import fetch from 'src/utils/api';

export const loadCategoryList = (id) => fetch(`/category/${id}`);
