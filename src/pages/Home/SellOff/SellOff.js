import classNames from 'classnames/bind';
import styles from './SellOff.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
import { MdNavigateNext } from 'react-icons/md';
import { sellOff } from '~/data';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const cx = classNames.bind(styles);

function SellOff() {

    return (
        <div className={cx('wrapper')}>
            Sell off

        </div>
    );
}

export default SellOff;
