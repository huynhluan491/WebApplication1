import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Button from '../../../components/Button';
import { ArrowDownDrop, BackNavigate, CartIcon, MenuIcon, SearchIcon } from '../../../components/Icons';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Search from '~/components/Search/Search';
const cx = classNames.bind(styles);

const navItems = [
    { title: 'Trang chủ', to: config.routes.home },
    { title: 'Tất cả sản phẩm', to: config.routes.allproducts },
    { title: 'Điện thoại', to: config.routes.phone },
    { title: 'Laptop', to: config.routes.laptop },
    { title: 'Tablet', to: config.routes.tablet },
    { title: 'Smart watch', to: config.routes.smartclock },
    { title: 'Thiết bị mạng', to: config.routes.networkdevice },
    { title: 'Bàn phím', to: config.routes.keyboard },
    { title: 'Loa', to: config.routes.speaker },
];

const squadNavBox = [
    {
        title: 'Đăng nhập',
        bg: 'https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/squad_nav-b-1.svg?v=7085441301639138361642089753',
        icon: 'https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/squad_nav-i-1.svg?v=90862635490878400821642089756',
        route: '/allproduct',
    },
    {
        title: 'Tất cá sản phẩm',
        bg: 'https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/squad_nav-b-2.svg?v=133712779800174120111642089754',
        icon: 'https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/squad_nav-i-2.svg?v=98400868773840410521642089756',
        route: '/allproduct',
    },
    {
        title: 'Bộ quà tặng',
        bg: 'https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/squad_nav-b-3.svg?v=49745472689912652341642089755',
        icon: 'https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/squad_nav-i-3.svg?v=128027689402168929141642089756',
        route: '/gift',
    },
    {
        title: 'Liên hệ với chúng tôi',
        bg: 'https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/squad_nav-b-4.svg?v=59541841797976743711642089755',
        icon: 'https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/squad_nav-i-4.svg?v=27299259263485495581642089757',
        route: '/contact',
    },
];

function Header() {
    const { products, totalQuantities } = useSelector((state) => state.CartReducer);
    const [showNavigation, setShowNavigation] = useState(true);
    const [showMenuIcon, setShowMenuIcon] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showCate, setShowCate] = useState(false);
    const [searchToggle, setSearchToggle] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 900px)');

        const handleMediaQueryChange = () => {
            if (mediaQuery.matches) {
                setShowNavigation(false);
                setShowMenuIcon(true);
            } else {
                setShowNavigation(true);
                setShowMenuIcon(false);
            }
        };

        handleMediaQueryChange();

        mediaQuery.addEventListener('change', handleMediaQueryChange);

        return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }, []);

    const handleMenuBack = () => {
        setShowMenu(false);
        setShowCate(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <button onClick={() => navigate(-1)}>
                    <BackNavigate />
                </button>
                {showMenuIcon && (
                    <Button whiteNoborder mediumTango onClick={() => setShowMenu(!showMenu)}>
                        <MenuIcon />
                    </Button>
                )}
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="" />
                </Link>
                <div className={cx('right-header')}>
                    <div className={cx('services-container')}>
                        <Button
                            className={cx('search-icon')}
                            whiteNoborder
                            mediumTango
                            onClick={() => setSearchToggle(true)}
                        >
                            <SearchIcon />
                        </Button>
                        <Link to={config.routes.productcart}>
                            <Button className={cx('cart-icon')} whiteNoborder mediumTango>
                                <CartIcon />
                                <p className={cx('cart-quantity')}>{totalQuantities}</p>
                            </Button>
                        </Link>
                    </div>
                    <Link to={config.routes.login} onClick={() => window.scrollTo(0, 0)}>
                        <div className={cx('user-login')}>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className={cx('content')}>Đăng nhập</div>
                        </div>
                    </Link>
                </div>
            </div>
            {searchToggle && <Search setSearchToggle={setSearchToggle} />}
            {showMenu && (
                <div className={cx('sidebar_menu-container')}>
                    <Button whiteNoborder onClick={() => handleMenuBack()}>
                        <BackNavigate />
                    </Button>
                    <ul className={cx('cate-list')}>
                        <li className={cx('cate-item')} onClick={() => setShowCate(!showCate)}>
                            <p className={cx('title')}>Danh mục</p>
                            <ArrowDownDrop />
                        </li>
                        {showCate &&
                            navItems.map((item, index) => (
                                <Link key={index} to={item.to} onClick={() => setShowMenu(false)}>
                                    <li className={cx('sub-cate-item')}>
                                        <p className={cx('title')}>{item.title}</p>
                                    </li>
                                </Link>
                            ))}
                        <li className={cx('cate-item')}>
                            <p className={cx('title')}>Phần thưởng</p>
                        </li>
                        <li className={cx('cate-item')}>
                            <p className={cx('title')}>Blog</p>
                        </li>
                    </ul>
                    <div className={cx('box-list')}>
                        {squadNavBox.map((item, index) => (
                            <Link className={cx('box-item')} key={index} to={item.to}>
                                <img className={cx('box-bg')} src={item.bg} alt={item.bg} />
                                <p className={cx('box-title')}>{item.title}</p>
                                <img className={cx('box-icon')} src={item.icon} alt={item.icon} />
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            {showNavigation && (
                <div className={cx('navigation-container')}>
                    <nav className={cx('nav-item-list')}>
                        {navItems.map((item, index) => (
                            <NavLink
                                key={index}
                                className={(nav) => cx('nav-item', { active: nav.isActive })}
                                to={item.to}
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                <span>{item.title}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    );
}

export default Header;
