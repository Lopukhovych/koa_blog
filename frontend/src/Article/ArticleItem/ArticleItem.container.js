import React, {PureComponent} from 'react';

class ArticleItemContainer extends PureComponent {
  render() {
    const {match} = this.props;
    return (
      <div>
        <p>
This is article with id:
          {match.params.id}
        </p>
      </div>
    );
  }
}

export default ArticleItemContainer;
