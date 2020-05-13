import React, {Component} from 'react';
import {connect} from 'react-redux';
import Error from 'src/components/Error';
import {loadAboutUs} from './redux/actions';
import AboutUsView from './AboutUs.view';

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

class AboutUsContainer extends Component {
  componentDidMount() {
    const {loadAboutUs} = this.props;
    loadAboutUs();
  }

  render() {
    const {aboutUs, pending, error} = this.props;
    if (pending) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
    if (error) {
      return <Error />;
    }
    if (!aboutUs) return <div />;
    return (
      <AboutUsView
        settings={settings}
        slogan={aboutUs.slogan}
        generalInfo={aboutUs.generalInfo}
        team={aboutUs.team}
        vision={aboutUs.vision}
        commentList={aboutUs.commentList}
      />
    );
  }
}

const mapStateToProps = ({aboutUs: {pending, error, aboutUs}}) => ({
  aboutUs,
  pending,
  error,
});
const mapDispatchToProps = {
  loadAboutUs,
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutUsContainer);
