import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

function HomeSlider() {
    return (
        <div className={cx('wrapper')}>
            Slider
        </div>
    );
}

export default HomeSlider;
