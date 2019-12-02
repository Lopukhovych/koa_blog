import React from 'react';
import PropTypes from 'prop-types';

const ArticleItemView = ({article}) => (
  <div>
    <h2>
      {article.title}
    </h2>
  </div>
);

ArticleItemView.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    imageUrl: PropTypes.string,
    publishedDate: PropTypes.string,
    status: PropTypes.string,
    viewNumber: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    author: PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
    }),
    category: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
    commentList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        comment: PropTypes.string,
        createdAt: PropTypes.string,
        'author.id': PropTypes.number,
        'author.email': PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default ArticleItemView;
