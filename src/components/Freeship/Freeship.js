import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Freeship.module.scss';
import { CloseIcon } from '../Icons';

const cx = classNames.bind(styles);

function FreeShip() {
    const [showNotification, setShowNotification] = useState(true);

    const handleCloseNotification = () => {
        setShowNotification(!showNotification);
    };

    return (
        showNotification && (
            <div className={cx('wrapper')}>
                <p className={cx('content')}>Over 2.990.000 VNĐ Free Ship toàn quốc!!!</p>
                <button className={cx('close-btn')} onClick={handleCloseNotification}>
                    <CloseIcon />
                </button>
            </div>
        )
    );
}

export default FreeShip;
