import React, {PureComponent} from 'react';
import {Route, Switch} from 'react-router';
import loadPosts from 'src/Article/apiService';
import ArticleView from './Article.view';
import ArticleItemContainer from './ArticleItem';

class ArticleContainer extends PureComponent {
  componentDidMount() {
    loadPosts().then((data) => {
      console.log('data: ', data);
    });
  }

  render() {
    const {match} = this.props;
    return (
      <Switch>
        <Route path={`${match.path}/:id`} component={ArticleItemContainer} />
        <Route exact path={match.path}>
          <ArticleView title="ArticleView" />
        </Route>
      </Switch>

    );
  }
}

export default ArticleContainer;
