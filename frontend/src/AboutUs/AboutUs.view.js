/** @jsx jsx */

import {css, jsx} from '@emotion/core';
import {Container, Row} from 'react-bootstrap';
import Slider from 'react-slick';

const aboutUsStyles = css({
  maxWidth: '96vw',
  width: '96%',
  '& > section': {
    margin: '1.8rem 8px',
    padding: '0 16px',
    '& > h2': {
      padding: '8px 34px 24px',
      fontSize: '34px',
    },
    '& > p': {
      lineHeight: '26px',
      fontSize: '18px',
      textIndent: '1.6em',
      width: '90%',
    },
  },
});

const sloganStyles = css({
  padding: '8rem 10rem',
  '& h2': {
    letterSpacing: '0.3px',
    color: '#157be8',
    fontSize: '46px',
    lineHeight: '56px',
    textAlign: 'center',
  },
});

const commentStyles = css({
  '& .comment': {
    fontSize: '16px',
  },
  '& .author': {
    fontSize: '14px',
    color: '#757575',
    textAlign: 'right',
    marginTop: '4px',
    paddingRight: '16px',
  },
});

const teamListStyles = css({
  '& li': {
    fontSize: '16px',
  },
});

const sliderBlockStyles = css({
  '& .slick-dots': {
    bottom: '-40px',
  },
});


const transformCommentList = (commentList) => commentList.map((comment) => (
  <div css={commentStyles} className="col-12" key={comment.id}>
    <p className="comment">{comment.content}</p>
    <p className="author">{comment.authorName}</p>
  </div>
));

const transformTeam = (team) => team.map((member) => (
  <li key={member.id}>
    {member.imageURL && <img src={member.imageURL} alt="" />}
    <span>{member.name}</span>
  </li>
));

const AboutUsView = ({
  slogan,
  generalInfo,
  team,
  vision,
  commentList,
  settings,
}) => {
  const transformedCommentList = transformCommentList(commentList);
  const transformedTeam = transformTeam(team);
  return (
    <Container fluid css={aboutUsStyles}>
      <Row css={sloganStyles}>
        <h2>{slogan}</h2>
      </Row>
      <section className="col-md-12">
        <h2 className="text-uppercase">About Us</h2>
        <p>{generalInfo}</p>
      </section>
      <section className="col-md-12">
        <h2 className="text-uppercase">Our team</h2>
        <ul css={teamListStyles}>
          {transformedTeam}
        </ul>
      </section>
      <section>
        <h2 className="text-uppercase">Our vision</h2>
        <p>{vision}</p>
      </section>
      <section className="col-md-12">
        <h2>Comments</h2>
        <Slider css={sliderBlockStyles} {...settings}>
          {transformedCommentList}
        </Slider>
      </section>
    </Container>
  );
};

export default AboutUsView;
