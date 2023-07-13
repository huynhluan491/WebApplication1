import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ProductSingleModal.module.scss';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CartIcon, FillStarIcon, HalfStarIcon, MinusIcon, PlusIcon } from '../Icons';
import { showToast } from '~/function';

const cx = classNames.bind(styles);

function ProductSingleModal({ product }) {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const addToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: { product: product, quantity: quantity } });
        setQuantity(1);
    };

    const IncreaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const DecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        } else {
            setQuantity(1);
        }
    };

    const handleButton = () => {
        addToCart();
        showToast();
        console.log('clicked');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('side-container')}>
                <div className={cx('left-container')}>
                    <div className={cx('product-img')}>
                        <img src={product?.image} alt="" />
                    </div>
                    <div className={cx('subImage-list')}>
                        <div className={cx('subImg-wrapper')}>
                            <NavLink to={''} className={(nav) => cx('subImg-item', { active: nav.isActive })}>
                                <img src={product?.image} alt="" />
                            </NavLink>
                            <span className={cx('product-color')}>Mặc định</span>
                        </div>
                        {product?.sub_photo?.map((item, index) => (
                            <div className={cx('subImg-wrapper')} key={index}>
                                <NavLink to={''} className={(nav) => cx('subImg-item', { active: nav.isActive })}>
                                    <img src={item?.img} alt="sub-img" />
                                </NavLink>
                                <span className={cx('product-color')}>{item?.color}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('right-container')}>
                    <div className={cx('product-general')}>
                        <h3 className={cx('product-name')}>{product?.name}</h3>

                        {!!product.count_evaluate && !!product.brand && (
                            <div className={cx('product-detail')}>
                                <span className={cx('product-status')}>
                                    Tình trạng:
                                    {product?.count_evaluate > 0 ? (
                                        <span className={cx('status-text')}> Còn hàng</span>
                                    ) : (
                                        <span className={cx('status-text')}> Hết hàng</span>
                                    )}
                                </span>

                                <span className={cx('line-space')}>|</span>

                                <span className={cx('product-brand')}>
                                    Thương hiệu: <span className={cx('brand-text')}>{product?.brand}</span>
                                </span>
                            </div>
                        )}

                        {/* Button quatity */}
                        <div className={cx('price-info')}>
                            <div className={cx('quatity-option')}>
                                <button className={cx('decrease-btn')} onClick={() => DecreaseQuantity()}>
                                    {quantity === 1 ? <MinusIcon className={cx('disabled')} /> : <MinusIcon />}
                                </button>
                                <p className={cx('quatity-text')}>{quantity}</p>
                                <button className={cx('increase-btn')} onClick={() => IncreaseQuantity()}>
                                    <PlusIcon />
                                </button>
                            </div>
                            <div className={cx('price-text')}>
                                <h2 className={cx('saled-price')}>
                                    {product?.price?.toLocaleString('it-IT', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </h2>
                                <p className={cx('old-price')}>
                                    {(product?.price * product?.old_price).toLocaleString('it-IT', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className={cx('product-rating')}>
                            <div className={cx('star-rating')}>
                                <FillStarIcon />
                                <FillStarIcon />
                                <FillStarIcon />
                                <HalfStarIcon />
                            </div>
                            <p className={cx('quatity-rating')}>{product?.count_evaluate} đánh giá</p>
                        </div>
                        <p className={cx('product-description')}>{product?.description}</p>
                        <div className={cx('action-btn')}>
                            <button onClick={() => handleButton()} className={cx('addToCart-btn')}>
                                <CartIcon />
                                <span className={cx('btn-text')}>Thêm vào giỏ hàng</span>
                            </button>
                            <ToastContainer hideProgressBar={true} />

                            <Link to="/">
                                <button className={cx('product-gift')}>
                                    <img
                                        className={cx('gift-icon')}
                                        src="https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/add.svg"
                                        alt="gift"
                                    />
                                    Quà tặng cá nhân với giá trị lên đến 600.000đ
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ProductSingleModal.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductSingleModal;
