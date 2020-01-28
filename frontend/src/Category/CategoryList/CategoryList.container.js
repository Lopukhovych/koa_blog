import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import Error from 'src/components/Error';
import Loading from 'src/components/Loading';
import PropTypes from 'prop-types';
import CategoryListView from './CategoryList.view';
import {loadCategoryListAction} from './redux/actions';

class CategoryListContainer extends PureComponent {
  componentDidMount() {
    const {loadCategoryList} = this.props;
    loadCategoryList();
  }

  render() {
    const {pending, error, categoryList } = this.props;
    if (error) {
      return <Error />;
    }

    if (!categoryList || pending) {
      return <Loading />;
    }

    return (
      <CategoryListView categoryList={categoryList} />
    );
  }
}

CategoryListContainer.propTypes = {
  pending: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, null]),
  categoryList: PropTypes.arrayOf(PropTypes.object),
  loadCategoryList: PropTypes.func,
};

CategoryListContainer.defaultProps = {
  pending: false,
  error: null,
  categoryList: null,
  loadCategoryList: () => {},
};

const mapStateToProps = ({categoryList: {pending, error, categoryList}}) => ({
  pending,
  error,
  categoryList,
});

const mapDispatchToProps = {
  loadCategoryList: loadCategoryListAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListContainer);
