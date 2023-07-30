import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import { FreeShipNotification } from '~/components/Freeship';
import Header from '../components/Header';
import Footer from '../components/Footer';
//test
const cx = classNames.bind(styles);

function MainLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('fixed-top')}>
                <FreeShipNotification />
                <div className={cx('header-container')}>
                    <Header />
                </div>
            </div>
            <div className={cx('content')}>{children}</div>
            <Footer />
        </div>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;
