import React, {PureComponent} from 'react';

class AuthorItemContainer extends PureComponent {
  render() {
    const {match} = this.props;
    return (
      <div>
        <p>
This is author page with id :
          { match.params.id}
        </p>
      </div>
    );
  }
}

export default AuthorItemContainer;
