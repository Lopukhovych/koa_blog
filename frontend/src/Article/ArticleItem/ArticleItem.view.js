/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import CommentFormContainer from './CommentForm';

const articleStyles = css({
  h2: {
    margin: '28px auto 32px',
    textAlign: 'center',
    fontSize: '2.3rem',
  },
  '& img': {
    display: 'block',
    height: '400px',
    width: '80%',
    objectFit: 'contain',
    margin: '0 auto 24px',
  },
  '& .contentWrapper': {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '10px 24px',
    position: 'relative',
  },
});

const mainContentStyles = css({
  flex: '4 1 76%',
});

const asideContentStyles = css({
  flex: '1 4 24%',
  paddingLeft: '12px',
  borderLeft: '1px solid #007bff',
  marginLeft: '20px',
  button: {
    margin: '4px 0',
    fontSize: '14px',
  },
  position: 'sticky',
  top: '16px',
});

const publishedDateStyles = css({
  padding: '4px 0',
  display: 'flex',
  alignItems: 'center',
  color: '#9E9E9E',
  fontSize: '13px',
  span: {
    marginRight: '4px',
  },
});

const contentComments = css({
  margin: '12px 0',
  h4: {
    marginBottom: '16px',
  },
  '& .comment': {
    borderLeft: '1px solid #007bff',
    maxWidth: '670px',
    boxSizing: 'border-box',
    padding: '0 0 0 8px',
    margin: '10px 8px',
    fontSize: '15px',
    color: '#616161',
  },
  '& .comment-info': {
    display: 'flex',
    color: '#9E9E9E',
    fontSize: '13px',
  },
});

const noCommentsStyle = css({
  margin: '-10px 8px 2px',
  color: '#9E9E9E',
  fontSize: '14px',
});

const getArticleContent = (content) => {
  const innerHtml = { __html: content };
  return <div dangerouslySetInnerHTML={innerHtml} />;
};

const getComements = (commentList) => commentList.map((comment) => (
  <div key={comment.id} className="comment">
    <p className="comment-info">
      <Link to={`/user/${comment['author.id']}`}>{comment['author.email']}</Link>
        &nbsp;&nbsp;
      <span>{new Date(comment.createdAt).toLocaleString()}</span>
    </p>
    <p>{comment.comment}</p>
  </div>
));

const notAuthorizedCommentBlockStyles = css({
  margin: '8px',
  color: '#757575',
});

const notAuthorizedCommentBlock = (
  <div css={notAuthorizedCommentBlockStyles}>
    <p>
      Only authorized users can leave comments.
      {' '}
      <Link to="/auth">Log in</Link>
    </p>
  </div>
);

const ArticleItemView = ({ article, authorized, commentList }) => (
  <Card css={articleStyles}>
    <h2>{article.title}</h2>
    <img src={article.imageUrl} alt="Main" />
    <div className="contentWrapper">
      <div css={mainContentStyles}>
        <div css={publishedDateStyles}>
          <p>
            <span>
                Published:&nbsp;
              {article.publishedDate && new Date(article.publishedDate).toDateString()}
                ;
            </span>
            <span>
                Views:&nbsp;
              {article.viewNumber}
                ;
            </span>
            <span>
                Category:&nbsp;
              <Link to={`/category/${article.category && article.category.id}`}>
                {article.category && article.category.title}
              </Link>
                ;
            </span>
            {article.author && (
              <span>
                Author:&nbsp;
                <Link to={`/author/${article.author && article.author.id}`}>
                  {article.author && article.author.name ? article.author.name : article.author.email}
                </Link>
              </span>
            )}
          </p>
        </div>
        {getArticleContent(article.content)}
        <hr />
        <div css={contentComments}>
          <h4>Comments</h4>
          {commentList && commentList.length ? getComements(commentList) : <p css={noCommentsStyle}>No comments yet</p>}
          {authorized ? <CommentFormContainer articleId={article.id} /> : notAuthorizedCommentBlock}
        </div>
      </div>
      <div css={asideContentStyles}>
        <h5>Get more</h5>
        <p>
          <Link to={`/author/${article.author && article.author.id}`}>About author</Link>
        </p>
        <div>
          <Button variant="outline-info">Subscribe on author</Button>
          <Button variant="outline-info">Subscribe on category</Button>
        </div>
      </div>
    </div>
  </Card>
);

ArticleItemView.defaultProps = {
  commentList: [],
};

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
  }).isRequired,
  commentList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      comment: PropTypes.string,
      createdAt: PropTypes.string,
      'author.id': PropTypes.number,
      'author.email': PropTypes.string,
      postId: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    }),
  ),
  authorized: PropTypes.bool.isRequired,
};

export default ArticleItemView;
