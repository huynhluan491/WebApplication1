import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Grid.module.scss';

const cx = classNames.bind(styles);

function ProductsGrid({ children }) {
    return <div className={cx('products-grid')}>{children}</div>;
}

ProductsGrid.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProductsGrid;
