import React, {Component} from 'react';

class PostItemContainer extends Component {
  render() {
    const {match} = this.props;
    console.log('match: ', match);
    console.log('id: ', match.params.id);
    return (
      <div>
        <p>
This is post with id:
          {match.params.id}
        </p>
      </div>
    );
  }
}

export default PostItemContainer;
