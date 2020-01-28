import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import Error from 'src/components/Error';
import Loading from 'src/components/Loading';
import PropTypes from 'prop-types';
import {loadCategoryAction} from './redux/actions';
import CategoryItemView from './CategoryItem.view';

class CategoryItemContainer extends PureComponent {
  componentDidMount() {
    const {match, loadCategory} = this.props;
    if (match.params && match.params.id) {
      loadCategory(+match.params.id);
    }
  }

  render() {
    const {pending, error, categoryInfo} = this.props;
    if (error) {
      return <Error />;
    }

    if (!categoryInfo || pending) {
      return <Loading />;
    }
    return categoryInfo && <CategoryItemView categoryInfo={categoryInfo} />;
  }
}

const mapStateToProps = ({category: {pending, error, categoryInfo}}) => ({
  pending,
  error,
  categoryInfo,
});

const mapDispatchToProps = {
  loadCategory: loadCategoryAction,
};

CategoryItemContainer.proppTypes = {
  pending: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, null]),
  categoryInfo: PropTypes.arrayOf(PropTypes.object),
  loadCategory: PropTypes.func,
};
CategoryItemContainer.defaultProps = {
  pending: false,
  error: null,
  categoryInfo: null,
  loadCategory: () => {},
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryItemContainer);
