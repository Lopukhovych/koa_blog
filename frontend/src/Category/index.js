import {Route, Switch} from 'react-router';
import React from 'react';
import CategoryItemContainer from './CategoryItem';
import CategoryListContainer from './CategoryList/CategoryList.container';
import CategoryNotFoundView from './CategoryNotFound.view';

const Category = ({match}) => (
  <Switch>
    <Route exact path={match.path} component={CategoryListContainer} />
    <Route exact path={`${match.path}/not-found`} component={CategoryNotFoundView} />
    <Route path={`${match.path}/:id`} component={CategoryItemContainer} />
  </Switch>
);

export default Category;
