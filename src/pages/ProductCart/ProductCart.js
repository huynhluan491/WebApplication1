import classNames from 'classnames/bind';
import styles from './ProductCart.module.scss';
import { MinusIcon, PlusIcon, PreviousIcon, ProductRemove } from '~/components/Icons';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function ProductCart() {
    const { products, totalPrice, totalQuantities } = useSelector((state) => state.CartReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const increase = (productId) => {
        dispatch({ type: 'INCREASE', payload: productId });
    };

    const decrease = (productId) => {
        dispatch({ type: 'DECREASE', payload: productId });
    };

    const removeProduct = (productId) => {
        dispatch({ type: 'DELETE', payload: productId });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('cart-container')}>
                <div className={cx('cart-header')}>
                    <button className={cx('back-btn')} onClick={() => navigate(-1)}>
                        <PreviousIcon />
                        <p className={cx('btn-mean')}>Trở về</p>
                    </button>
                    <h3 className={cx('your-cart')}>Giỏ hàng của bạn</h3>
                </div>
                <div className={cx('gift-text')}>Quà tặng cá nhân với giá trị lên đến 600.000đ</div>
                {products.length > 0 ? (
                    <div className={cx('product-wrapper')}>
                        {products.map((item) => (
                            <div key={item.id} className={cx('product-item')}>
                                <div className={cx('product-img')}>
                                    <img src={item.image} alt="" />
                                </div>
                                <div className={cx('product-detail')}>
                                    {item?.old_price > 0 ? (
                                        <span className={cx('sale-popup')}>Giảm {item?.old_price * 10}%</span>
                                    ) : null}
                                    <div className={cx('product-header')}>
                                        <span className={cx('product-name')}>{item.name}</span>
                                        <button onClick={() => removeProduct(item.id)}>
                                            <ProductRemove className={cx('remove-icon')} />
                                        </button>
                                    </div>
                                    <div className={cx('product-quantity')}>
                                        <div className={cx('quatity-controller')}>
                                            <button onClick={() => decrease(item.id)}>
                                                <MinusIcon />
                                            </button>
                                            <p className={cx('quatity-text')}>{item.quantity}</p>
                                            <button onClick={() => increase(item.id)}>
                                                <PlusIcon />
                                            </button>
                                        </div>
                                        <div className={cx('product-price')}>
                                            <span className={cx('price')}>
                                                {(item?.price * item.quantity).toLocaleString('it-IT', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </span>
                                            <span className={cx('org-price')}>
                                                {(item?.price * item?.old_price).toLocaleString('it-IT', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={cx('cart-empty')}>
                        <div className={cx('empty-img')}>
                            <img src={require('~/assets/images/cartempty.png')} alt="" />
                        </div>
                        <div className={cx('cart-empty-footer')}>
                            <h3 className={cx('empty-notification')}>
                                <strong>Ôi!!!</strong>
                                Bạn chưa thêm sản phẩm nào.
                            </h3>
                            <Link to={config.routes.allproducts}>
                                <Button seeAll onClick={() => window.scrollTo(0, 0)} className={cx('see-product-btn')}>
                                    Xem sản phẩm
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductCart;
