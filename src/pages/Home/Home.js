import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import React from 'react';
import ProductSingleModal from '~/components/ProductSingleModal';
import { singlePeatureProduct } from '~/data';
import SellOff from './SellOff/SellOff';
import HomeSlider from './Slider/Slider';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-layout')}>
                <SellOff></SellOff>
                <HomeSlider></HomeSlider>
            </div>
            <div className={cx('content-layout')}>
            </div>
        </div>
    );
}

export default Home;
