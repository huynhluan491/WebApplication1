import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '~/components/Button';
import { showToast } from '~/function';

const cx = classNames.bind(styles);

function ProductItem({ data }) {
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: { product: data, quantity: 1 } });
    };

    const handleButton = () => { //thông báo khi thêm sản phẩm vào giỏ hàng
        addToCart();
        showToast();
    };

    return (
        <div className={cx('wrap-product')}>
        </div>
    );
}

ProductItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ProductItem;
