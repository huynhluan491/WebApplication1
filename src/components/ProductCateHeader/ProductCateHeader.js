import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ProductCateHeader.module.scss';

const cx = classNames.bind(styles);

function ProductCate({ headerTitle, headerCate }) {
    return (
        <div className={cx('product-topic')}>
            <span className={cx('topic-header')}>{headerTitle}</span>
            <span className={cx('topic-title')}>{headerCate}</span>
        </div>
    );
}

ProductCate.propTypes = {
    headerTitle: PropTypes.string,
    headerCate: PropTypes.string,
};

export default ProductCate;
