/** @jsx jsx */
import {css, jsx} from '@emotion/core';

import Slider from 'react-slick';
import {Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const homeSliderWrapperStyles = css({
  marginBottom: '12px',
});

const sectionTitleStyles = css({
  position: 'relative',
  marginBottom: '12px',
});

const sectionTitleHeaderStyles = css({
  position: 'relative',
  display: 'inline-block',
  fontSize: '16px',
  margin: '0',
  textTransform: 'uppercase',
  '&:hover': {
    textDecoration: 'none',
  },
});

const sliderArticleStyles = css({
  position: 'relative',
  marginBottom: '8px',
  '& .article-body': {
    position: 'relative',
    margin: '-50px 0px 0px 3%',
    padding: '3% 5%',
    background: '#fff',
    zIndex: '10',
  },
  '& .article-img': {
    display: 'block',
    overflow: 'hidden',
    '& > img': {
      width: '100%',
      '-webkit-transition': '1.6s -webkit-transform',
      transition: '1.6s transform',
    },
    '&:hover > img ': {
      transform: 'scale(1.2)',
    },
  },
  '& .article-title': {
    fontSize: '16px',
  },
  '& .article-category': {
    marginBottom: '4px',
    fontSize: '14px',
    ' a': {
      fontWeight: '700',
      fontSize: '12px',
      textTransform: 'uppercase',
      '&:after': {
        content: "', '",
        display: 'inline-block',
      },
      '&:last-child:after': {
        display: 'none',
      },
    },
  },
  '& .article-meta': {
    marginBottom: '4px',
    paddingLeft: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    li: {
      display: 'inline-block',
      color: '#97989b',
      fontSize: '12px',
      textTransform: 'uppercase',
      '&:after': {
        content: "'•'",
        display: 'inline-block',
        paddingLeft: '5px',
        paddingRight: '5px',
      },
      '&:last-child:after': {
        display: 'none',
      },
      '& a': {
        color: '#97989b',
        fontWeight: '700',
      },
    },
  },
});

const HomeSliderView = ({categoryList, settings}) => {
  const selectCategoryList = categoryList.map((article) => (
    <div className="col-12" key={article.id}>
      <div css={sectionTitleStyles}>
        <h2 css={sectionTitleHeaderStyles}>
          <Link to={`/category/${article.categoryList[0].link}`}>
            {article.categoryList[0].name}
          </Link>
        </h2>
      </div>
      <div css={sliderArticleStyles}>
        <Link className="article-img" to={`/article/${article.id}`}>
          <img src={article.imgLink} alt="" />
        </Link>
        <div className="article-body">
          <div className="article-category">
            {article.categoryList.map((category) => (
              <Link key={category.link} to={`/category/${category.link}`}>{category.name}</Link>
            ))}
          </div>
          <h3 className="article-title">
            <Link to={`/article/${article.id}`}>{article.title}</Link>
          </h3>
          <ul className="article-meta">
            <li><Link to={`/author/${article.author.id}`}>{article.author.name}</Link></li>
            <li>{article.date.toDateString()}</li>
          </ul>
        </div>
      </div>
    </div>
  ));
  return (
    <Container fluid css={homeSliderWrapperStyles}>
      <h2>Categories</h2>
      <Slider {...settings}>
        {selectCategoryList}
      </Slider>
    </Container>
  );
};

export default HomeSliderView;
