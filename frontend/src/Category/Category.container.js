import React, {PureComponent} from 'react';
import {Route, Switch} from 'react-router';
import CategoryView from './Category.view';
import CategoryItemContainer from './CategoryItem';

class CategoryContainer extends PureComponent {
  render() {
    const {match} = this.props;
    return (
      <Switch>
        <Route path={`${match.path}/:id`} component={CategoryItemContainer} />
        <Route exact path={match.path}>
          <CategoryView title="CategoryView" />
        </Route>
      </Switch>
    );
  }
}

export default CategoryContainer;
