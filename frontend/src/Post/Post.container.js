import React, {Component} from 'react';
import { Switch, Route} from 'react-router-dom';
import PostView from './Post.view';
import loadPosts from './apiService';
import PostItemContainer from './PostItem';

class PostContainer extends Component {
  componentDidMount() {
    loadPosts().then((data) => {
      console.log('data: ', data);
    });
    // console.log('a11111: ', a);
  }

  render() {
    const {match} = this.props;
    return (
      <>
        <Switch>
          <Route path={`${match.path}/:id`} component={PostItemContainer} />
          <Route exact path={match.path}>
            <PostView article="article" />
            {/* <h3>Please select a topic.</h3> */}
          </Route>
        </Switch>
      </>
    );
  }
}

export default PostContainer;
