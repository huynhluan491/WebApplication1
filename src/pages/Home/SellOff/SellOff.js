import classNames from 'classnames/bind';
import styles from './SellOff.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
import { MdNavigateNext } from 'react-icons/md';
import { sellOff } from '~/data';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const cx = classNames.bind(styles);

function SellOff() {
    const [slideIndex, setSlideIndex] = useState(0);

    const decreaseIndex = () => {
        setSlideIndex((prev) => prev - 1);
        if (slideIndex <= 0) {
            setSlideIndex(sellOff.length - 1);
        }
    };

    const increaseIndex = () => {
        setSlideIndex((prev) => prev + 1);
        if (slideIndex >= sellOff.length - 1) {
            setSlideIndex(0);
        }
    };

    return (
        <div className={cx('content-container')}>
            <div className={cx('product-content-wrapper')}>
                <div className={cx('product-detail')}>
                    <p className={cx('product-type')}>{sellOff[slideIndex]?.category}</p>
                    <h3 className={cx('product-name')}>{sellOff[slideIndex]?.name}</h3>
                    <p className={cx('product-stock')}>in Stock</p>
                    <p className={cx('product-description')}>{sellOff[slideIndex]?.description}</p>
                    <Link
                        to={`/product/${sellOff[slideIndex]?.name}`}
                        className={cx('buy-btn')}
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        <button>Mua ngay</button>
                    </Link>
                </div>
                <div className={cx('product-image')}>
                    <img src={sellOff[slideIndex]?.image} />
                </div>
            </div>
            <div className={cx('content-controller')}>
                <div className={cx('button-container')}>
                    <button className={cx('prev-btn')} onClick={decreaseIndex}>
                        <IoIosArrowBack color="white" size={24} />
                    </button>
                    <button className={cx('next-btn')} onClick={increaseIndex}>
                        <MdNavigateNext color="white" size={24} />
                    </button>
                </div>
                <div className={cx('product-status')}>
                    <div className={cx('slide-index')}>
                        <span>Next Slide</span>
                        <span>0{slideIndex + 1}</span>
                    </div>
                    <h1 className={cx('slide-name')}>{sellOff[slideIndex]?.name}</h1>
                </div>
            </div>
        </div>
    );
}

export default SellOff;