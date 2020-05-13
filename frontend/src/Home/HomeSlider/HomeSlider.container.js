import React, {PureComponent} from 'react';
import {categoryList} from 'src/MockedData/categoryslider/category.slider';
import HomeSliderView from './HomeSlider.view';


const settings = {
  className: 'slider variable-width',
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};


class HomeSliderContainer extends PureComponent {
  render() {
    return (
      <HomeSliderView
        settings={settings}
        categoryList={categoryList}
      />
    );
  }
}

export default HomeSliderContainer;
