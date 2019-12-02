import React from 'react';
import { Route, Switch } from 'react-router';
import ArticleItemContainer from 'src/Article/ArticleItem';
import ArticleListWrapperContainer from 'src/Article/ArticleListWrapper';
import ArticleNotFound from 'src/Article/ArticleNotFound.view';

const Article = ({ match }) => (
  <Switch>
    <Route exact path={match.path} component={ArticleListWrapperContainer} />
    <Route path={`${match.path}/popular`} component={ArticleListWrapperContainer} />
    <Route path={`${match.path}/not-found`} component={ArticleNotFound} />
    <Route path={`${match.path}/:id`} component={ArticleItemContainer} />
  </Switch>
);

export default Article;
