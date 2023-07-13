import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '~/components/Icons';
import { useEffect } from 'react';
import googlepay from '~/assets/images/google-pay.png';
import american from '~/assets/images/american-express.png';
import masterCard from '~/assets/images/master-card.png';
import meta from '~/assets/images/meta.png';
import momo from '~/assets/images/MoMo_Logo.png';
import paypal from '~/assets/images/paypal.png';
import viettelpay from '~/assets/images/viettelpay.png';
import vnpay from '~/assets/images/vnpay.png';
import zaloPay from '~/assets/images/ZaloPay_Logo.png';

const cx = classNames.bind(styles);

const payments = [googlepay, american, masterCard, meta, momo, paypal, viettelpay, vnpay, zaloPay];

const socialIcon = [
    { icon: <FacebookIcon />, bgColor: 'blue' },
    { icon: <TwitterIcon />, bgColor: '#37b2ae' },
    { icon: <InstagramIcon />, bgColor: 'black' },
    { icon: <YoutubeIcon />, bgColor: 'red' },
];

const Footer = () => {
    return (
        <div className={cx('footer-container')}>
            <div className={cx('content-wrapper')}>
                <div className={cx('content-layout')}>
                    <div className={cx('news-content')}>
                        <h2 className={cx('title')}>
                            Bảng Tin
                            <div className={cx('line-space')}></div>
                        </h2>
                        <span className={cx('description')}>
                            Đăng ký để trở thành người đầu tiên biết về các ưu đãi độc quyền và những sản phẩm mới nhất
                            của chúng tôi.
                        </span>
                        <form className={cx('form-container')}>
                            <div className={cx('form-input')}>
                                <input
                                    type="email"
                                    name="email"
                                    className={cx('email-input')}
                                    placeholder="E-mail"
                                />
                            </div>
                            <button className={cx('send-btn')}>Gửi</button>
                        </form>
                        <div className={cx('social-logo')}>
                            {socialIcon.map((item, index) => (
                                <div key={index} className={cx('icon')} style={{ backgroundColor: item.bgColor }}>
                                    {item.icon}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('company-info')}>
                        <h2 className={cx('title')}>
                            Công Ty
                            <div className={cx('line-space')}></div>
                        </h2>
                        <span className={cx('description')}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book
                        </span>
                    </div>

                    <div className={cx('resource-info')}>
                        <h2 className={cx('title')}>
                            Tài nguyên
                            <div className={cx('line-space')}></div>
                        </h2>
                        <ul className={cx('policy-list')}>
                            <li>Các điều khoản và điều kiện</li>
                            <li>Chính sách bảo mật</li>
                            <li>Liên hệ với chúng tôi</li>
                            <li>Theo dõi đơn hàng</li>
                            <li>Điều khoản dịch vụ</li>
                            <li>Chính sách hoàn tiền</li>
                        </ul>
                    </div>
                </div>

                <div className={cx('payment-available')}>
                    <h2 className={cx('payment-title')}>Thanh Toán:</h2>
                    <div className={cx('payment-unit')}>
                        {payments.map((item, index) => (
                            <div key={index} className={cx('payment-logo')}>
                                <img src={item} alt={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
